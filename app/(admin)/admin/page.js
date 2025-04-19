"use client";

import { useState } from "react";

const AdminDashboard = () => {
  // Dummy data
  const [agents, setAgents] = useState([
    { id: 1, name: "Agent A", email: "agentA@example.com" },
    { id: 2, name: "Agent B", email: "agentB@example.com" },
  ]);
  const [users, setUsers] = useState([
    { id: 1, name: "User X", email: "userX@example.com" },
    { id: 2, name: "User Y", email: "userY@example.com" },
  ]);
  const [hotelOwners, setHotelOwners] = useState([
    { id: 1, name: "Owner 1", email: "owner1@example.com" },
    { id: 2, name: "Owner 2", email: "owner2@example.com" },
  ]);
  const [busOperators, setBusOperators] = useState([
    { id: 1, name: "Bus Operator 1", email: "bus1@example.com" },
    { id: 2, name: "Bus Operator 2", email: "bus2@example.com" },
  ]);

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("agents");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle add or update
  const handleSave = () => {
    const newItem = {
      id: editingId || Math.random(),
      name: formData.name,
      email: formData.email,
    };

    const setData = {
      agents: setAgents,
      users: setUsers,
      hotelOwners: setHotelOwners,
      busOperators: setBusOperators,
    }[currentCategory];

    setData((prev) =>
      editingId ? prev.map((item) => (item.id === editingId ? newItem : item)) : [...prev, newItem]
    );

    setFormData({ name: "", email: "" });
    setEditingId(null);
  };

  // Handle edit
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ name: item.name, email: item.email });
  };

  // Handle delete
  const handleDelete = (id) => {
    const setData = {
      agents: setAgents,
      users: setUsers,
      hotelOwners: setHotelOwners,
      busOperators: setBusOperators,
    }[currentCategory];

    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto"> {/* Centered layout */}
      <h1 className="text-2xl font-semibold text-gray-900 text-center">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-6 mt-6">
        {["agents", "users", "hotelOwners", "busOperators"].map((category) => (
          <button
            key={category}
            onClick={() => setCurrentCategory(category)}
            className={`text-sm font-semibold px-4 py-2 rounded-md transition ${
    currentCategory === category ? "bg-blue-500 text-white" : "text-gray-900 hover:bg-gray-200"
  }`}
          >
            {category.replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="mt-6 bg-gray-100 p-6 rounded-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{editingId ? "Edit" : "Add"} {currentCategory}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-4 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-4 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-3 bg-blue-500 text-white rounded-md text-sm font-semibold mt-4 w-full"
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{currentCategory} List</h2>
        <div className="space-y-4">
          {(
            { agents, users, hotelOwners, busOperators }[currentCategory]
          ).map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-gray-100 p-6 rounded-md">
              <div>
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">{item.email}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;