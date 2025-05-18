"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/supabase/supabaseClient";
import Link from "next/link";

export default function UserDashboard() {
  const { user, signOut } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [buses, setBuses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Review states for hotels
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [previousReviews, setPreviousReviews] = useState([]);

  // Review states for buses
  const [showBusReviewModal, setShowBusReviewModal] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [busReviewText, setBusReviewText] = useState("");
  const [busRating, setBusRating] = useState(5);
  const [previousBusReviews, setPreviousBusReviews] = useState([]);

  useEffect(() => {
    if (user) {
      fetchHotels();
      fetchBuses();
      fetchNotifications();
    }
  }, [user]);

  // Hotel review functions
  const openReviewModal = async (hotel) => {
    setSelectedHotel(hotel);
    setShowReviewModal(true);
    setReviewText("");
    setRating(5);

    const { data, error } = await supabase
      .from("reviews")
      .select("*, users(full_name)")
      .eq("hotel_id", hotel.id)
      .order("created_at", { ascending: false });
    setPreviousReviews(data || []);
  };

  const handleSubmitReview = async () => {
    if (!selectedHotel || !rating || !reviewText) return;

    const { data: review, error } = await supabase
      .from("reviews")
      .insert({
        hotel_id: selectedHotel.id,
        user_id: user.id,
        rating,
        comment: reviewText,
      })
      .select()
      .single();

    if (error) {
      alert("Failed to submit review");
      return;
    }

    const { data: hotelData } = await supabase
      .from("hotels")
      .select("hotel_owner_id")
      .eq("id", selectedHotel.id)
      .single();

    if (hotelData?.hotel_owner_id) {
      const { error: notifError } = await supabase.from("notifications").insert({
        recipient_id: hotelData.hotel_owner_id,
        type: "review",
        message: `New review for ${selectedHotel.name} by ${user.user_metadata.full_name}`,
      });
      if (notifError) {
        console.error("Notification insert error:", notifError.message);
      }
    }

    setShowReviewModal(false);
  };

  // Bus review functions
  const openBusReviewModal = async (bus) => {
    setSelectedBus(bus);
    setShowBusReviewModal(true);
    setBusReviewText("");
    setBusRating(5);

    const { data, error } = await supabase
      .from("bus_reviews")
      .select("*, users(full_name)")
      .eq("bus_id", bus.id)
      .order("created_at", { ascending: false });
    setPreviousBusReviews(data || []);
  };

  const handleSubmitBusReview = async () => {
    if (!selectedBus || !busRating || !busReviewText) return;

    const { data: review, error } = await supabase
      .from("bus_reviews")
      .insert({
        bus_id: selectedBus.id,
        user_id: user.id,
        rating: busRating,
        comment: busReviewText,
      })
      .select()
      .single();

    if (error) {
      alert("Failed to submit bus review");
      return;
    }

    const { data: busData } = await supabase
      .from("buses")
      .select("bus_operator_id")
      .eq("id", selectedBus.id)
      .single();

    if (busData?.bus_operator_id) {
      const { error: notifError } = await supabase.from("notifications").insert({
        recipient_id: busData.bus_operator_id,
        type: "bus_review",
        message: `New review for ${selectedBus.name} by ${user.user_metadata.full_name}`,
      });
      if (notifError) {
        console.error("Notification insert error:", notifError.message);
      }
    }

    setShowBusReviewModal(false);
  };

  const fetchHotels = async () => {
    const { data, error } = await supabase.from("hotels").select("*");
    if (error) {
      console.error("Error fetching hotels:", error.message);
    } else {
      setHotels(data || []);
    }
  };

  const fetchBuses = async () => {
    const { data, error } = await supabase.from("buses").select("*");
    if (error) {
      console.error("Error fetching buses:", error.message);
    } else {
      setBuses(data || []);
    }
  };

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("recipient_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching notifications:", error.message);
    } else {
      setNotifications(data || []);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <Link href="/user" className="text-xl font-bold text-indigo-600">
            EasyTrip
          </Link>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-sm text-gray-600 hover:text-indigo-600"
            >
              Notifications
              {notifications.some((n) => !n.is_read) && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {notifications.filter((n) => !n.is_read).length}
                </span>
              )}
            </button>
            <button onClick={signOut} className="text-sm text-red-600">
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-4 top-16 bg-white shadow-lg rounded-lg w-80 p-4 z-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-600">No notifications available.</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li key={notification.id} className="p-4 bg-gray-100 rounded-lg">
                  <p>{notification.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Dashboard */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome, {user?.user_metadata?.full_name || "User"}!
        </h2>

        {/* Hotels Section */}
        <section className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Hotels</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={hotel.images[0] || "https://via.placeholder.com/300"}
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-900">{hotel.name}</h4>
                  <p className="text-sm text-gray-600">{hotel.location}</p>
                  <p className="text-sm text-gray-600">Price: ${hotel.price}</p>
                  <p className="text-sm text-gray-600">{hotel.description}</p>
                  <p className="text-sm text-gray-600">{hotel.room_type}</p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => openReviewModal(hotel)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hotel Review Modal */}
          {showReviewModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h3 className="text-lg font-bold mb-2">Reviews for {selectedHotel?.name}</h3>
                <div className="mb-4 max-h-40 overflow-y-auto">
                  {previousReviews.length === 0 ? (
                    <p className="text-gray-500 text-sm">No reviews yet.</p>
                  ) : (
                    previousReviews.map((r) => (
                      <div key={r.id} className="mb-2 border-b pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{r.users?.full_name || "User"}</span>
                          <span className="text-yellow-500">{r.rating}★</span>
                        </div>
                        <div className="text-sm">{r.comment}</div>
                        {r.owner_response && (
                          <div className="text-xs text-blue-700 mt-1">
                            <span className="font-semibold">Owner:</span> {r.owner_response}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">Your Rating</label>
                  <select
                    className="border rounded w-full p-1"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n} Star{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">Your Review</label>
                  <textarea
                    className="border rounded w-full p-1"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 rounded bg-gray-300"
                    onClick={() => setShowReviewModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-green-600 text-white"
                    onClick={handleSubmitReview}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Buses Section */}
        <section className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Buses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {buses.map((bus) => (
              <div key={bus.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-900">{bus.name}</h4>
                  <p className="text-sm text-gray-600">
                    Route: {bus.from_location} ➝ {bus.to_location}
                  </p>
                  <p className="text-sm text-gray-600">Seats: {bus.seats}</p>
                  <p className="text-sm text-gray-600">
                    Departure: {bus.departure} | Arrival: {bus.arrival}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => openBusReviewModal(bus)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bus Review Modal */}
          {showBusReviewModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h3 className="text-lg font-bold mb-2">Reviews for {selectedBus?.name}</h3>
                <div className="mb-4 max-h-40 overflow-y-auto">
                  {previousBusReviews.length === 0 ? (
                    <p className="text-gray-500 text-sm">No reviews yet.</p>
                  ) : (
                    previousBusReviews.map((r) => (
                      <div key={r.id} className="mb-2 border-b pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{r.users?.full_name || "User"}</span>
                          <span className="text-yellow-500">{r.rating}★</span>
                        </div>
                        <div className="text-sm">{r.comment}</div>
                        {r.owner_response && (
                          <div className="text-xs text-blue-700 mt-1">
                            <span className="font-semibold">Operator:</span> {r.owner_response}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">Your Rating</label>
                  <select
                    className="border rounded w-full p-1"
                    value={busRating}
                    onChange={(e) => setBusRating(Number(e.target.value))}
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n} Star{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">Your Review</label>
                  <textarea
                    className="border rounded w-full p-1"
                    value={busReviewText}
                    onChange={(e) => setBusReviewText(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 rounded bg-gray-300"
                    onClick={() => setShowBusReviewModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-green-600 text-white"
                    onClick={handleSubmitBusReview}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}