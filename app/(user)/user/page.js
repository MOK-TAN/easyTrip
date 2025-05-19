"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/supabase/supabaseClient";
import Link from "next/link";

export default function UserDashboard() {
  const { user, signOut } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [buses, setBuses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [bookedItems, setBookedItems] = useState({ hotels: {}, buses: {} });

  // Payment dialog states
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentType, setPaymentType] = useState("online");
  const [verificationAnswer, setVerificationAnswer] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemType, setItemType] = useState(null);

  // Filter states
  const [priceFilter, setPriceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [roomTypeFilter, setRoomTypeFilter] = useState("");

  useEffect(() => {
    if (user) {
      fetchHotels();
      fetchBuses();
      fetchBookings();
      fetchNotifications();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchHotels();
    }
  }, [priceFilter, locationFilter, roomTypeFilter, user]);

  const fetchHotels = async () => {
    let query = supabase.from("hotels").select("*");
    if (priceFilter) query = query.lte("price", parseInt(priceFilter));
    if (locationFilter) query = query.ilike("location", locationFilter);
    if (roomTypeFilter) query = query.eq("room_type", roomTypeFilter);

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching hotels:", error.message);
    } else {
      setHotels(data || []);
    }
  };

  const resetFilters = () => {
    setPriceFilter("");
    setLocationFilter("");
    setRoomTypeFilter("");
  };

  const fetchBuses = async () => {
    const { data, error } = await supabase.from("buses").select("*");
    if (error) {
      console.error("Error fetching buses:", error.message);
    } else {
      setBuses(data || []);
    }
  };

  const fetchBookings = async () => {
    const { data: hotelBookings, error: hotelError } = await supabase
      .from("hotel_bookings")
      .select("*, hotels(name, location)")
      .eq("user_id", user.id)
      .in("status", ["Pending", "Approved"])
      .order("created_at", { ascending: false });

    const { data: busBookings, error: busError } = await supabase
      .from("bus_bookings")
      .select("*, buses(name, from_location, to_location)")
      .eq("user_id", user.id)
      .in("status", ["Pending", "Approved"])
      .order("created_at", { ascending: false });

    if (hotelError || busError) {
      console.error("Error fetching bookings:", hotelError?.message || busError?.message);
    } else {
      setBookings([...(hotelBookings || []), ...(busBookings || [])]);
      const hotelBooked = {};
      const busBooked = {};
      hotelBookings?.forEach((booking) => {
        hotelBooked[booking.hotel_id] = true;
      });
      busBookings?.forEach((booking) => {
        busBooked[booking.bus_id] = true;
      });
      setBookedItems({ hotels: hotelBooked, buses: busBooked });
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

  const openPaymentDialog = (item, type) => {
    setSelectedItem(item);
    setItemType(type);
    setShowPaymentDialog(true);
    setPaymentType("online");
    setVerificationAnswer("");
  };

  const handleConfirmBooking = async () => {
    if (verificationAnswer !== "2") {
      alert("Incorrect answer. Booking cancelled.");
      setShowPaymentDialog(false);
      return;
    }

    if (itemType === "hotel") {
      await handleBookHotel(selectedItem);
    } else {
      await handleBookBus(selectedItem);
    }
    setShowPaymentDialog(false);
  };

  const handleBookHotel = async (hotel) => {
    const { data: booking, error } = await supabase
      .from("hotel_bookings")
      .insert({
        user_id: user.id,
        hotel_id: hotel.id,
        room_type: hotel.room_type || "Standard",
        check_in: new Date().toISOString().split("T")[0],
        check_out: new Date(new Date().setDate(new Date().getDate() + 1))
          .toISOString()
          .split("T")[0],
        status: "Pending",
        agent_id: null,
        customer_name: user.user_metadata?.full_name || "",
        customer_contact: user.email || "",
      })
      .select()
      .single();

    if (error) {
      console.error("Error booking hotel:", error.message);
    } else {
      setBookedItems((prev) => ({
        ...prev,
        hotels: { ...prev.hotels, [hotel.id]: true },
      }));
      fetchBookings();

      const { data: hotelData, error: hotelError } = await supabase
        .from("hotels")
        .select("hotel_owner_id")
        .eq("id", hotel.id)
        .single();

      if (hotelError) {
        console.error("Error fetching hotel owner:", hotelError.message);
        return;
      }

      await supabase.from("notifications").insert({
        recipient_id: hotelData.hotel_owner_id,
        booking_id: booking.id,
        type: "hotel",
        message: `Booking requested by ${user.user_metadata.full_name} for ${hotel.name}`,
      });
    }
  };

  const handleBookBus = async (bus) => {
    const { data: booking, error } = await supabase
      .from("bus_bookings")
      .insert({
        user_id: user.id,
        bus_id: bus.id,
        seat_number: 1,
        departure_date: new Date().toISOString().split("T")[0],
        status: "Pending",
        agent_id: null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error booking bus:", error.message);
    } else {
      setBookedItems((prev) => ({
        ...prev,
        buses: { ...prev.buses, [bus.id]: true },
      }));
      fetchBookings();

      const { data: busData, error: busError } = await supabase
        .from("buses")
        .select("bus_operator_id")
        .eq("id", bus.id)
        .single();

      if (busError) {
        console.error("Error fetching bus operator:", busError.message);
        return;
      }

      await supabase.from("notifications").insert({
        recipient_id: busData.bus_operator_id,
        booking_id: booking.id,
        type: "bus",
        message: `Booking requested by ${user.user_metadata.full_name} for ${bus.name}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/user" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              EasyTrip
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative flex items-center text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Notifications
                {notifications.some((n) => !n.is_read) && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {notifications.filter((n) => !n.is_read).length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsBookingsOpen(true)}
                className="flex items-center text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01" />
                </svg>
                My Bookings
              </button>
              <button
                onClick={signOut}
                className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-4 top-16 bg-white shadow-lg rounded-xl w-80 p-5 z-50 animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500">No notifications available.</p>
          ) : (
            <ul className="space-y-3">
              {notifications.map((notification) => (
                <li key={notification.id} className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                  {notification.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Bookings Dialog */}
      {isBookingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Bookings</h3>
            {bookings.length === 0 ? (
              <p className="text-sm text-gray-500">You have no bookings.</p>
            ) : (
              <ul className="space-y-4">
                {bookings.map((booking) => (
                  <li key={booking.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">
                      {booking.hotels?.name || booking.buses?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {booking.hotels
                        ? `Location: ${booking.hotels.location}`
                        : `Route: ${booking.buses.from_location} ➝ ${booking.buses.to_location}`}
                    </p>
                    <p className="text-sm text-gray-600">Status: {booking.status}</p>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsBookingsOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Dialog */}
      {showPaymentDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
              >
                <option value="online">Online Payment</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Verify: What is 1+1?</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={verificationAnswer}
                onChange={(e) => setVerificationAnswer(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPaymentDialog(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome, {user?.user_metadata?.full_name || "User"}!
        </h2>

        {/* Hotel Filters */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Filter Hotels</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="">All Prices</option>
                <option value="1000">Less than $1000</option>
                <option value="3000">Less than $3000</option>
                <option value="5000">Less than $5000</option>
                <option value="7000">Less than $7000</option>
                <option value="10000">Less than $10000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Chitwan">Chitwan</option>
                <option value="Pokhara">Pokhara</option>
                <option value="Jhapa">Jhapa</option>
                <option value="Baglung">Baglung</option>
                <option value="Hetauda">Hetauda</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={roomTypeFilter}
                onChange={(e) => setRoomTypeFilter(e.target.value)}
              >
                <option value="">All Room Types</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </section>

        {/* Hotels Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Available Hotels</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative h-56">
                  <img
                    src={hotel.images[0] || "https://via.placeholder.com/300"}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {hotel.room_type}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2 truncate">{hotel.name}</h4>
                  <div className="flex items-center gap-1.5 mb-3">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm text-gray-600">{hotel.location}</p>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{hotel.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-indigo-600">
                      ${hotel.price}<span className="text-sm font-normal text-gray-500">/night</span>
                    </span>
                  </div>
                  <button
                    onClick={() => openPaymentDialog(hotel, "hotel")}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      bookedItems.hotels[hotel.id]
                        ? "bg-red-100 text-red-600 cursor-not-allowed"
                        : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                    }`}
                    disabled={bookedItems.hotels[hotel.id]}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {bookedItems.hotels[hotel.id] ? "Booked" : "Book Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Buses Section */}
        <section className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Available Buses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {buses.map((bus) => (
              <div
                key={bus.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2 truncate">{bus.name}</h4>
                  <div className="flex items-center gap-1.5 mb-3">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553-2.276A1 1 0 0021 13.618V2.382a1 1 0 00-1.553-.894L15 4m0 13V4" />
                    </svg>
                    <p className="text-sm text-gray-600">
                      {bus.from_location} ➝ {bus.to_location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <p className="text-sm text-gray-600">Seats: {bus.seats}</p>
                  </div>
                  <div className="flex items-center gap-1.5 mb-4">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-gray-600">
                      {bus.departure} - {bus.arrival}
                    </p>
                  </div>
                  <button
                    onClick={() => openPaymentDialog(bus, "bus")}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      bookedItems.buses[bus.id]
                        ? "bg-red-100 text-red-600 cursor-not-allowed"
                        : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                    }`}
                    disabled={bookedItems.buses[bus.id]}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {bookedItems.buses[bus.id] ? "Booked" : "Book Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
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
