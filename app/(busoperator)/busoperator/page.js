"use client";

import { useState } from "react";

export default function BusDashboard() {
  const [buses, setBuses] = useState([
    { id: 1, name: "Deluxe Express", departure: "08:00 AM", arrival: "02:00 PM", from: "Kathmandu", to: "Pokhara", seats: 40 },
    { id: 2, name: "Mountain Star", departure: "09:30 AM", arrival: "04:00 PM", from: "Pokhara", to: "Chitwan", seats: 35 },
  ]);

  const [newBus, setNewBus] = useState({ name: "", departure: "", arrival: "", from: "", to: "", seats: "" });
  const [editingBus, setEditingBus] = useState(null);

  const handleChange = (e) => {
    setNewBus({ ...newBus, [e.target.name]: e.target.value });
  };

  const addBus = () => {
    if (newBus.name && newBus.departure && newBus.arrival && newBus.from && newBus.to && newBus.seats) {
      setBuses([...buses, { ...newBus, id: Date.now(), seats: Number(newBus.seats) }]);
      setNewBus({ name: "", departure: "", arrival: "", from: "", to: "", seats: "" });
    }
  };

  const deleteBus = (id) => {
    setBuses(buses.filter(bus => bus.id !== id));
  };

  const startEdit = (bus) => {
    setEditingBus(bus);
    setNewBus(bus);
  };

  const updateBus = () => {
    setBuses(buses.map(bus => (bus.id === editingBus.id ? newBus : bus)));
    setEditingBus(null);
    setNewBus({ name: "", departure: "", arrival: "", from: "", to: "", seats: "" });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">🚌 Bus Management</h1>

      {/* Add / Edit Form */}
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
            <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2" onClick={updateBus}>Update Bus</button>
          ) : (
            <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={addBus}>Add Bus</button>
          )}
        </div>
      </div>

      {/* Bus List */}
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
              <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => startEdit(bus)}>Edit</button>
              <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => deleteBus(bus.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
