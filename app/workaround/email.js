"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/supabase/supabaseClient";
import { useAuth } from "@/context/AuthContext";

export default function UserHotelBooking() {
  const { user } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    const { data, error } = await supabase.from("hotels").select("*");
    if (!error) setHotels(data || []);
  };

  const openDialog = (hotel) => {
    setSelectedHotel(hotel);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedHotel(null);
  };

  const handleBookHotel = async () => {
    if (!selectedHotel || !user) return;

    const checkIn = new Date().toISOString().split("T")[0];
    const checkOut = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];

    const { data: booking, error } = await supabase
      .from("hotel_bookings")
      .insert({
        user_id: user.id,
        hotel_id: selectedHotel.id,
        room_type: selectedHotel.room_type || "Standard",
        check_in: checkIn,
        check_out: checkOut,
        status: "Pending"
      })
      .select()
      .single();

    if (error) {
      alert("Booking failed: " + error.message);
      return;
    }

    // Trigger email via Supabase Function or API
    await fetch("/api/send-booking-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        hotelName: selectedHotel.name,
        checkIn,
        checkOut,
      }),
    });

    alert("Booking submitted. Confirmation email sent.");
    closeDialog();
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">Book a Hotel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="p-4 bg-white shadow rounded">
            <h2 className="font-bold text-lg">{hotel.name}</h2>
            <p className="text-gray-600">Location: {hotel.location}</p>
            <p className="text-gray-600">Price: ${hotel.price}</p>
            <button
              className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded"
              onClick={() => openDialog(hotel)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-2">Confirm Booking: {selectedHotel.name}</h3>
            <p className="text-sm mb-4 text-gray-600">Check-in: Today | Check-out: Tomorrow</p>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={closeDialog}>Cancel</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleBookHotel}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
