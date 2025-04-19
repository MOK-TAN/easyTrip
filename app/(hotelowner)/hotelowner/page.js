"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function HotelOwnerDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === false) {
      router.push("/hotelowner/login");
    }
  }, [user, router]);

  // Dummy data for hotels
  const [hotels, setHotels] = useState([
    { id: 1, name: "Hotel Sunrise", location: "Kathmandu", price: 150 },
    { id: 2, name: "Mountain View Hotel", location: "Pokhara", price: 120 },
    { id: 3, name: "Lakeside Resort", location: "Chitwan", price: 200 },
  ]);

  const [formData, setFormData] = useState({ name: "", location: "", price: "" });
  const [editingHotelId, setEditingHotelId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddHotel = () => {
    const newHotel = { id: Math.random(), ...formData, price: parseFloat(formData.price) };
    setHotels([...hotels, newHotel]);
    setFormData({ name: "", location: "", price: "" });
  };

  const handleEditHotel = (hotel) => {
    setEditingHotelId(hotel.id);
    setFormData({ name: hotel.name, location: hotel.location, price: hotel.price });
  };

  const handleUpdateHotel = () => {
    setHotels(hotels.map((hotel) => (hotel.id === editingHotelId ? { ...hotel, ...formData, price: parseFloat(formData.price) } : hotel)));
    setFormData({ name: "", location: "", price: "" });
    setEditingHotelId(null);
  };

  const handleDeleteHotel = (id) => {
    setHotels(hotels.filter((hotel) => hotel.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-semibold text-gray-900">🏨 Hotel Owner Dashboard</h1>

      {/* Hotel Form */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold mb-4">{editingHotelId ? "Edit Hotel" : "Add Hotel"}</h2>
        <div className="grid grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Hotel Name" name="name" value={formData.name} onChange={handleChange} />
          <input className="border p-2 rounded" placeholder="Location" name="location" value={formData.location} onChange={handleChange} />
          <input className="border p-2 rounded" type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={editingHotelId ? handleUpdateHotel : handleAddHotel}>
            {editingHotelId ? "Update Hotel" : "Add Hotel"}
          </button>
        </div>
      </div>

      {/* Hotel List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">List of Hotel</h2>
        <div className="space-y-4">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">{hotel.name}</h3>
                <p className="text-sm text-gray-600">Location: {hotel.location}</p>
                <p className="text-sm text-gray-600">Price: ${hotel.price}</p>
              </div>
              <div className="flex space-x-4">
                <button onClick={() => handleEditHotel(hotel)} className="text-blue-500 hover:text-blue-700 text-sm">Edit</button>
                <button onClick={() => handleDeleteHotel(hotel.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-8 flex justify-end">
        <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">Log out</button>
      </div>
    </div>
  );
}
