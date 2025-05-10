"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useBusOperatorContext } from "@/context/BusOperatorContext";
import { useRouter } from "next/navigation";



export default function BusDashboard() {

  const { user, signOut } = useAuth();
  const router = useRouter();

  const { buses, addBus, updateBus, deleteBus, fetchBuses } = useBusOperatorContext();

  const [newBus, setNewBus] = useState({ name: "", departure: "", arrival: "", from: "", to: "", seats: "" });
  const [editingBus, setEditingBus] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

    // Check login and fetch busses 
  useEffect(() => {
    if (user === false) {
      router.push("/busoperator/login");
    } else if (user) {
      fetchBuses(); // fetch buses from Supabase
    }
  }, [user, router]);

  // useEffect(() => {
  //   fetchBuses(); // Refetch buses on mount
  // }, []);

  const handleChange = (e) => {
    setNewBus({ ...newBus, [e.target.name]: e.target.value });
  };

  const handleAddBus = async () => {
    if (newBus.name && newBus.departure && newBus.arrival && newBus.from && newBus.to && newBus.seats) {

// { name: "", departure: "", arrival: "", from: "", to: "", seats: "" }

      // await addBus({ ...newBus, seats: Number(newBus.seats) });
      // await addBus({
      //   name : newBus.name,
      //   departure : newBus.departure,
      //   arrival : newBus.arrival,
      //   from_location : newBus.from,
      //   to_location : newBus.to,
      //   seats : Number(newBus.seats),
      //   bus_operator_id : user.id
      // })

  await addBus({
    name: newBus.name,
    departure: ${newBus.departure}:00,
    arrival: ${newBus.arrival}:00,
    from_location: newBus.from,
    to_location: newBus.to,
    seats: Number(newBus.seats),
    bus_operator_id: user.id,
});

      setNewBus({ name: "", departure: "", arrival: "", from: "", to: "", seats: "" });
    }
  };

  const handleDeleteBus = async (id) => {
    await deleteBus(id);
  };

  const startEdit = (bus) => {
    setEditingBus(bus);
    setNewBus(bus);
  };

  const handleUpdateBus = async () => {
    await updateBus(editingBus.id, { ...newBus, seats: Number(newBus.seats) });
    setEditingBus(null);
    setNewBus({ name: "", departure: "", arrival: "", from: "", to: "", seats: "" });
  };

  const handleBooking = (bus) => {
    const booking = {
      id: Date.now(),
      busId: bus.id,
      busName: bus.name,
      passengerName: "Demo User",
    };
    setBookings([...bookings, booking]);
    setNotifications([...notifications, 📢 New booking on ${bus.name} by ${booking.passengerName}]);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      {/* Header with Bell */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">🚌 Bus Management</h1>
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative focus:outline-none">
            <span className="text-2xl">🔔</span>
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {notifications.length}
              </span>
            )}
          </button>
          {showNotifications && notifications.length > 0 && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded shadow-lg z-10 p-3">
              <h2 className="text-sm font-bold mb-2">Notifications</h2>
              <ul className="max-h-48 overflow-y-auto text-sm space-y-1">
                {notifications.map((note, i) => (
                  <li key={i} className="text-gray-800">• {note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">{editingBus ? "Edit Bus" : "Add New Bus"}</h2>
        <div className="grid grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Bus Name" name="name" value={newBus.name} onChange={handleChange} />
          <input className="border p-2 rounded" placeholder="Departure Time" name="departure" value={newBus.departure} onChange={handleChange} />
          <input className="border p-2 rounded" placeholder="Arrival Time" name="arrival" value={newBus.arrival} onChange={handleChange} />
          <input className="border p-2 rounded" placeholder="From (Location)" name="from" value={newBus.from} onChange={handleChange} />
          <input className="border p-2 rounded" placeholder="To (Location)" name="to" value={newBus.to} onChange={handleChange} />
          <input className="border p-2 rounded" placeholder="Available Seats" type="number" name="seats" value={newBus.seats} onChange={handleChange} />
        </div>
        <div className="mt-4">
          {editingBus ? (
            <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2" onClick={handleUpdateBus}>Update Bus</button>
          ) : (
            <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleAddBus}>Add Bus</button>
          )}
        </div>
      </div>

      {/* Bus List for notification */}
      <div className="space-y-4">
        {buses.map((bus) => (
          <div key={bus.id} className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-900">{bus.name}</h3>
              <p className="text-sm text-gray-600">{bus.from} ➝ {bus.to}</p>
              <p className="text-sm text-gray-600">Departure: {bus.departure} | Arrival: {bus.arrival}</p>
              <p className="text-sm text-gray-600">Seats: {bus.seats}</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleBooking(bus)}>Book Seat</button>
              <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => startEdit(bus)}>Edit</button>
              <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDeleteBus(bus.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

       <div className="mt-8 flex justify-end">
        <button
          onClick={signOut}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Log out
        </button>
        </div>
    </div>
  );
}



