"use client";

import { useState } from "react";

export default function AgentDashboard() {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({ customer: "", from: "", to: "", date: "", seats: 1 });

  const handleChange = (e) => {
    setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
  };

  const bookTicket = () => {
    if (newBooking.customer && newBooking.from && newBooking.to && newBooking.date && newBooking.seats > 0) {
      setBookings([...bookings, { ...newBooking, id: Date.now() }]);
      setNewBooking({ customer: "", from: "", to: "", date: "", seats: 1 });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">🕵️‍♂️ Agent Dashboard</h1>

      {/* Booking Form */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Book Ticket</h2>
        <div className="grid grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Customer Name" name="customer" value={newBooking.customer} onChange={handleChange} />
          <input className="border p-2 rounded" placeholder="From (Location)" name="from" value={newBooking.from} onChange={handleChange} />
          <input className="border p-2 rounded" placeholder="To (Location)" name="to" value={newBooking.to} onChange={handleChange} />
          <input className="border p-2 rounded" type="date" name="date" value={newBooking.date} onChange={handleChange} />
          <input className="border p-2 rounded" type="number" min="1" name="seats" placeholder="Seats" value={newBooking.seats} onChange={handleChange} />
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded mt-4" onClick={bookTicket}>Book Ticket</button>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-900">{booking.customer}</h3>
              <p className="text-sm text-gray-600">{booking.from} ➝ {booking.to}</p>
              <p className="text-sm text-gray-600">Date: {booking.date} | Seats: {booking.seats}</p>
            </div>
            <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => setBookings(bookings.filter(b => b.id !== booking.id))}>
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
