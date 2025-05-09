"use client";

import { useState } from "react";

export default function BusDashboard() {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      type: "Bus",
      name: "Deluxe Express",
      departure: "08:00 AM",
      arrival: "02:00 PM",
      from: "Kathmandu",
      to: "Pokhara",
      seats: 40,
      ac: true,
      wifi: true,
      charging_port: true,
      vehicle_number: "BA 2 KHA 1234",
    },
    {
      id: 2,
      type: "Microbus",
      name: "Speedy Shuttle",
      departure: "09:00 AM",
      arrival: "03:00 PM",
      from: "Pokhara",
      to: "Chitwan",
      seats: 20,
      ac: false,
      wifi: false,
      charging_port: false,
      vehicle_number: "PA 1 KHA 5678",
    },
    {
      id: 3,
      type: "Jeep",
      name: "Mountain Rover",
      departure: "07:30 AM",
      arrival: "01:00 PM",
      from: "Kathmandu",
      to: "Nagarkot",
      seats: 8,
      ac: true,
      wifi: false,
      charging_port: true,
      vehicle_number: "KA 3 KHA 7890",
    },
  ]);

  const [newVehicle, setNewVehicle] = useState({
    type: "",
    name: "",
    departure: "",
    arrival: "",
    from: "",
    to: "",
    seats: "",
    ac: false,
    wifi: false,
    charging_port: false,
    vehicle_number: "",
  });

  const [editingVehicle, setEditingVehicle] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewVehicle({
      ...newVehicle,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addVehicle = () => {
    if (
      newVehicle.type &&
      newVehicle.name &&
      newVehicle.departure &&
      newVehicle.arrival &&
      newVehicle.from &&
      newVehicle.to &&
      newVehicle.seats &&
      newVehicle.vehicle_number
    ) {
      setVehicles([
        ...vehicles,
        { ...newVehicle, id: Date.now(), seats: Number(newVehicle.seats) },
      ]);
      setNewVehicle({
        type: "",
        name: "",
        departure: "",
        arrival: "",
        from: "",
        to: "",
        seats: "",
        ac: false,
        wifi: false,
        charging_port: false,
        vehicle_number: "",
      });
    }
  };

  const deleteVehicle = (id) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
  };

  const startEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setNewVehicle(vehicle);
  };

  const updateVehicle = () => {
    setVehicles(
      vehicles.map((vehicle) =>
        vehicle.id === editingVehicle.id ? newVehicle : vehicle
      )
    );
    setEditingVehicle(null);
    setNewVehicle({
      type: "",
      name: "",
      departure: "",
      arrival: "",
      from: "",
      to: "",
      seats: "",
      ac: false,
      wifi: false,
      charging_port: false,
      vehicle_number: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">🚌 Vehicle Management</h1>

      {/* Add / Edit Form */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">
          {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Vehicle Type"
            name="type"
            value={newVehicle.type}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded"
            placeholder="Vehicle Name"
            name="name"
            value={newVehicle.name}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded"
            placeholder="Departure Time"
            name="departure"
            value={newVehicle.departure}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded"
            placeholder="Arrival Time"
            name="arrival"
            value={newVehicle.arrival}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded"
            placeholder="From (Location)"
            name="from"
            value={newVehicle.from}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded"
            placeholder="To (Location)"
            name="to"
            value={newVehicle.to}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded"
            placeholder="Available Seats"
            type="number"
            name="seats"
            value={newVehicle.seats}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded"
            placeholder="Vehicle Number"
            name="vehicle_number"
            value={newVehicle.vehicle_number}
            onChange={handleChange}
          />
          <div className="col-span-2 flex items-center gap-2">
            <label>
              <input
                type="checkbox"
                name="ac"
                checked={newVehicle.ac}
                onChange={handleChange}
              />
              AC
            </label>
            <label>
              <input
                type="checkbox"
                name="wifi"
                checked={newVehicle.wifi}
                onChange={handleChange}
              />
              WiFi
            </label>
            <label>
              <input
                type="checkbox"
                name="charging_port"
                checked={newVehicle.charging_port}
                onChange={handleChange}
              />
              Charging Port
            </label>
          </div>
        </div>
        <div className="mt-4">
          {editingVehicle ? (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
              onClick={updateVehicle}
            >
              Update Vehicle
            </button>
          ) : (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={addVehicle}
            >
              Add Vehicle
            </button>
          )}
        </div>
      </div>

      {/* Vehicle List */}
      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-gray-900">{vehicle.name}</h3>
              <p className="text-sm text-gray-600">
                {vehicle.from} ➝ {vehicle.to}
              </p>
              <p className="text-sm text-gray-600">
                Departure: {vehicle.departure} | Arrival: {vehicle.arrival}
              </p>
              <p className="text-sm text-gray-600">Seats: {vehicle.seats}</p>
              <p className="text-sm text-gray-600">Vehicle Number: {vehicle.vehicle_number}</p>
              <p className="text-sm text-gray-600">
                AC: {vehicle.ac ? "Yes" : "No"} | WiFi: {vehicle.wifi ? "Yes" : "No"} | Charging Port: {vehicle.charging_port ? "Yes" : "No"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => startEdit(vehicle)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => deleteVehicle(vehicle.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}