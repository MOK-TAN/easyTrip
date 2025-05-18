import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { userId, status } = await request.json();
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Verify that the requesting user is an admin
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

    // Update user status
    const { error: updateError } = await supabase
      .from("users")
      .update({ 
        status,
        status_changed_at: new Date().toISOString(),
        status_changed_by: session?.user?.id
      })
      .eq("id", userId);

    if (updateError) throw updateError;

    return NextResponse.json({ message: "User status updated successfully" });
  } catch (error) {
    console.error("Update user status error:", error);
    return NextResponse.json(
      { error: "Failed to update user status" },
      { status: 500 }
    );
  }
} 