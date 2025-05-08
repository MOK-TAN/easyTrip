"use client";

import { useState } from "react";

export default function UserDashboard() {
  const [showPayments, setShowPayments] = useState(false);

  const wishlist = [
    {
      id: 1,
      name: "Hotel Yak & Yeti",
      detail: "Luxury stay in the heart of Kathmandu",
      price: "NPR 12,000 / night",
    },
    {
      id: 2,
      name: "Hotel Barahi Pokhara",
      detail: "Lakeside view with premium service",
      price: "NPR 9,500 / night",
    },
  ];

  const [bookings, setBookings] = useState([
    {
      id: 201,
      hotel: "Hotel Everest View",
      date: "April 10, 2025",
      nights: 2,
      amount: "NPR 20,000",
    },
    {
      id: 202,
      hotel: "Hotel Mechi Crown",
      date: "May 5, 2025",
      nights: 3,
      amount: "NPR 27,000",
    },
  ]);

  const [editingBooking, setEditingBooking] = useState(null);
  const [editForm, setEditForm] = useState({ hotel: "", date: "", nights: "", amount: "" });

  const startEdit = (booking) => {
    setEditingBooking(booking.id);
    setEditForm({ ...booking });
  };

  const cancelBooking = (id) => {
    setBookings(bookings.filter((b) => b.id !== id));
    if (editingBooking === id) {
      setEditingBooking(null);
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    setBookings(bookings.map((b) => (b.id === editingBooking ? { ...editForm, id: editingBooking } : b)));
    setEditingBooking(null);
    setEditForm({ hotel: "", date: "", nights: "", amount: "" });
  };

  return (
    <div className="bg-white min-h-screen py-16 px-6 sm:py-24 lg:py-32">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome to Your Dashboard</h2>
          <p className="mt-2 text-gray-600 text-lg">Manage your wishlist, bookings, and make secure payments.</p>
        </div>

        {/* Wishlist Section */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Wishlist</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {wishlist.map((hotel) => (
              <div key={hotel.id} className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:shadow-md transition">
                <h4 className="text-lg font-bold text-indigo-700">{hotel.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{hotel.detail}</p>
                <p className="text-sm font-semibold text-gray-800 mt-2">{hotel.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Booking History (View/Edit/Cancel) */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Bookings</h3>
          <ul className="space-y-4">
            {bookings.map((entry) => (
              <li key={entry.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                {editingBooking === entry.id ? (
                  <div className="space-y-2">
                    <input
                      className="border p-2 rounded w-full"
                      name="hotel"
                      value={editForm.hotel}
                      onChange={handleEditChange}
                      placeholder="Hotel Name"
                    />
                    <input
                      className="border p-2 rounded w-full"
                      name="date"
                      value={editForm.date}
                      onChange={handleEditChange}
                      placeholder="Booking Date"
                    />
                    <input
                      className="border p-2 rounded w-full"
                      name="nights"
                      value={editForm.nights}
                      onChange={handleEditChange}
                      placeholder="Nights"
                    />
                    <input
                      className="border p-2 rounded w-full"
                      name="amount"
                      value={editForm.amount}
                      onChange={handleEditChange}
                      placeholder="Amount"
                    />
                    <div className="flex gap-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={saveEdit}>
                        Save
                      </button>
                      <button className="bg-gray-300 text-gray-800 px-3 py-1 rounded" onClick={() => setEditingBooking(null)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-semibold text-gray-900">{entry.hotel}</p>
                    <p className="text-sm text-gray-600">Date: {entry.date}</p>
                    <p className="text-sm text-gray-600">Nights: {entry.nights}</p>
                    <p className="text-sm text-gray-700">Paid: {entry.amount}</p>
                    <div className="flex gap-2 mt-2">
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => startEdit(entry)}>
                        Modify
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => cancelBooking(entry.id)}>
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Payment Section */}
        <section className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Make a Payment</h3>
          <button
            onClick={() => setShowPayments(!showPayments)}
            className="py-3 px-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Pay Now
          </button>

          {showPayments && (
            <div className="mt-6 space-y-4 max-w-sm mx-auto">
              <button className="w-full py-3 px-4 text-sm font-semibold text-green-700 bg-green-100 border border-green-300 rounded-lg hover:bg-green-200 transition">
                Pay with eSewa
              </button>
              <button className="w-full py-3 px-4 text-sm font-semibold text-purple-700 bg-purple-100 border border-purple-300 rounded-lg hover:bg-purple-200 transition">
                Pay with Khalti
              </button>
            </div>
          )}
        </section>
{/* Share Details Section */}
<section className="text-center">
  <button
    onClick={() => alert("Your details have been shared successfully!")}
    className="mt-6 py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
  >
    Share My Details
  </button>
</section>

      </div>
    </div>
  );
}