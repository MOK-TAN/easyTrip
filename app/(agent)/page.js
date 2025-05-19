"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabaseClient";

export default function HotelOwnerDashboard() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(false);

  useEffect(() => {
    if (user === false) {
      router.push("/hotelowner/login");
    } else if (user) {
      const fetchAllData = async () => {
        try {
          const [notificationsResult, hotelIdsResult] = await Promise.all([
            supabase
              .from("notifications")
              .select("id, message, is_read, created_at")
              .eq("recipient_id", user.id)
              .order("created_at", { ascending: false }),
            supabase
              .from("hotels")
              .select("id")
              .eq("hotel_owner_id", user.id),
          ]);

          setLoadingNotifications(true);
          if (notificationsResult.error) {
            console.error("Error fetching notifications:", notificationsResult.error.message);
            setNotifications([]);
          } else {
            setNotifications(notificationsResult.data || []);
          }
          setLoadingNotifications(false);

          setLoadingBookings(true);
          const hotelIds = (hotelIdsResult.data || []).map(h => h.id);
          if (hotelIds.length) {
            const { data: bookingsData, error: bookingsError } = await supabase
              .from("hotel_bookings")
              .select(`
                id,
                user_id,
                hotel_id,
                room_type,
                check_in,
                check_out,
                status,
                agent_id,
                customer_name,
                customer_contact,
                created_at,
                users!hotel_bookings_user_id_fkey(full_name),
                hotels(name)
              `)
              .in("hotel_id", hotelIds)
              .order("created_at", { ascending: false });

            if (bookingsError) {
              console.error("Error fetching bookings:", bookingsError.message);
              setBookings([]);
            } else {
              setBookings(bookingsData || []);
            }
          } else {
            setBookings([]);
          }
          setLoadingBookings(false);
        } catch (error) {
          console.error("Error in fetchAllData:", error.message);
          setLoadingBookings(false);
          setLoadingNotifications(false);
        }
      };

      fetchAllData();
    }
  }, [user, router]);

  const handleApproveBooking = async (bookingId, userId, agentId, hotelName) => {
    const { error } = await supabase
      .from("hotel_bookings")
      .update({ status: "Approved" })
      .eq("id", bookingId);

    if (error) {
      console.error("Error approving booking:", error.message);
      return;
    }

    const recipientId = userId || agentId;
    if (recipientId) {
      const { error: notificationError } = await supabase
        .from("notifications")
        .insert({
          recipient_id: recipientId,
          booking_id: bookingId,
          type: "hotel",
          message: `Your booking for ${hotelName} has been approved.`,
        });
      if (notificationError) {
        console.error("Error sending approval notification:", notificationError.message);
      }
    }

    const { data: hotelIdsData } = await supabase
      .from("hotels")
      .select("id")
      .eq("hotel_owner_id", user.id);
    const hotelIds = (hotelIdsData || []).map(h => h.id);
    const { data, error: bookingsError } = await supabase
      .from("hotel_bookings")
      .select(`
        id,
        user_id,
        hotel_id,
        room_type,
        check_in,
        check_out,
        status,
        agent_id,
        customer_name,
        customer_contact,
        created_at,
        users!hotel_bookings_user_id_fkey(full_name),
        hotels(name)
      `)
      .in("hotel_id", hotelIds)
      .order("created_at", { ascending: false });

    if (bookingsError) {
      console.error("Error refetching bookings:", bookingsError.message);
      setBookings([]);
    } else {
      setBookings(data || []);
    }
  };

  const handleRejectBooking = async (bookingId, userId, agentId, hotelName) => {
    const { error } = await supabase
      .from("hotel_bookings")
      .update({ status: "Rejected" })
      .eq("id", bookingId);

    if (error) {
      console.error("Error rejecting booking:", error.message);
      return;
    }

    const recipientId = userId || agentId;
    if (recipientId) {
      const { error: notificationError } = await supabase
        .from("notifications")
        .insert({
          recipient_id: recipientId,
          booking_id: bookingId,
          type: "hotel",
          message: `Your booking for ${hotelName} has been rejected.`,
        });
      if (notificationError) {
        console.error("Error sending rejection notification:", notificationError.message);
      }
    }

    const { data: hotelIdsData } = await supabase
      .from("hotels")
      .select("id")
      .eq("hotel_owner_id", user.id);
    const hotelIds = (hotelIdsData || []).map(h => h.id);
    const { data, error: bookingsError } = await supabase
      .from("hotel_bookings")
      .select(`
        id,
        user_id,
        hotel_id,
        room_type,
        check_in,
        check_out,
        status,
        agent_id,
        customer_name,
        customer_contact,
        created_at,
        users!hotel_bookings_user_id_fkey(full_name),
        hotels(name)
      `)
      .in("hotel_id", hotelIds)
      .order("created_at", { ascending: false });

    if (bookingsError) {
      console.error("Error refetching bookings:", bookingsError.message);
      setBookings([]);
    } else {
      setBookings(data || []);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-indigo-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-sm font-medium">
                Welcome, {user.user_metadata?.full_name || "Hotel Owner"}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative flex items-center text-sm font-medium hover:text-indigo-200 transition-colors focus:outline-none"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                Notifications
                {notifications.some((n) => !n.is_read) && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {notifications.filter((n) => !n.is_read).length}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-10 p-4 animate-fade-in">
                  <h2 className="text-sm font-semibold text-gray-900 mb-3">Notifications</h2>
                  {loadingNotifications ? (
                    <p className="text-gray-600 text-sm">Loading notifications...</p>
                  ) : notifications.length === 0 ? (
                    <p className="text-gray-600 text-sm">No notifications</p>
                  ) : (
                    <ul className="max-h-64 overflow-y-auto space-y-2 text-sm">
                      {notifications.map((notification) => (
                        <li key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.is_read ? "Read" : "Unread"} •{" "}
                            {new Date(notification.created_at).toLocaleDateString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={signOut}
              className="text-sm font-medium hover:text-indigo-200 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hotel Bookings Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Bookings</h2>
          {loadingBookings ? (
            <p className="text-gray-600">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="text-gray-600">No bookings available for your hotels.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div className="flex-1">
                      <div className="text-lg font-semibold text-gray-800">
                        {b.customer_name || b.users?.full_name || "Unknown User"}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        booked <span className="font-medium">{b.room_type}</span> at{" "}
                        <span className="font-medium">{b.hotels?.name || "Unknown Hotel"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Check-in: <span className="font-medium">{b.check_in}</span> | Check-out:{" "}
                        <span className="font-medium">{b.check_out}</span>
                      </div>
                      <div className="text-sm mt-2">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                            b.status.toLowerCase() === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : b.status.toLowerCase() === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                    </div>
                    {b.status.toLowerCase() === "pending" && (
                      <div className="mt-4 md:mt-0 md:ml-6 flex space-x-2">
                        <button
                          onClick={() =>
                            handleApproveBooking(
                              b.id,
                              b.user_id,
                              b.agent_id,
                              b.hotels?.name || "Unknown Hotel"
                            )
                          }
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleRejectBooking(
                              b.id,
                              b.user_id,
                              b.agent_id,
                              b.hotels?.name || "Unknown Hotel"
                            )
                          }
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
