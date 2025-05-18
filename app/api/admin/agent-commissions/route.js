import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(request) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Verify admin access
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data: adminUser } = await supabase
      .from("users")
      .select("role")
      .eq("id", session?.user?.id)
      .single();

    if (!adminUser || adminUser.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get("agentId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    let query = supabase
      .from("commissions")
      .select(`
        *,
        users:agent_id (
          full_name,
          email
        )
      `)
      .eq("status", "completed");

    if (agentId) {
      query = query.eq("agent_id", agentId);
    }
    if (startDate) {
      query = query.gte("created_at", startDate);
    }
    if (endDate) {
      query = query.lte("created_at", endDate);
    }

    const { data: commissions, error } = await query;

    if (error) throw error;

    // Calculate totals and format response
    const formattedData = commissions.reduce((acc, commission) => {
      const agentId = commission.agent_id;
      if (!acc[agentId]) {
        acc[agentId] = {
          agent: commission.users,
          totalCommission: 0,
          transactions: []
        };
      }
      
      acc[agentId].totalCommission += commission.amount;
      acc[agentId].transactions.push({
        id: commission.id,
        amount: commission.amount,
        type: commission.type,
        created_at: commission.created_at,
        booking_reference: commission.booking_reference
      });
      
      return acc;
    }, {});

    return NextResponse.json({ 
      commissions: Object.values(formattedData)
    });
  } catch (error) {
    console.error("Fetch commissions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch commission data" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { agentId, amount, type, bookingReference } = await request.json();
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Verify admin access
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data: adminUser } = await supabase
      .from("users")
      .select("role")
      .eq("id", session?.user?.id)
      .single();

    if (!adminUser || adminUser.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    // Record new commission
    const { error: insertError } = await supabase
      .from("commissions")
      .insert({
        agent_id: agentId,
        amount,
        type,
        booking_reference: bookingReference,
        status: "completed",
        created_by: session?.user?.id
      });

    if (insertError) throw insertError;

    return NextResponse.json({ message: "Commission recorded successfully" });
  } catch (error) {
    console.error("Record commission error:", error);
    return NextResponse.json(
      { error: "Failed to record commission" },
      { status: 500 }
    );
  }
} 