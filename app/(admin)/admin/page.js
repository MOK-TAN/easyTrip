"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "../../../context/adminContext"; // Adjust path as needed

import { useAuth } from "@/context/AuthContext";

const AdminDashboard = () => {
  const { usersByRole, fetchUsers, loading, createUser, updateUser, deleteUser } = useAdmin();
  const [formData, setFormData] = useState({ email: "", full_name: "", phone_number: "", role: "user", password: "" });
  const [editingId, setEditingId] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("users");

    
  const { user, signOut } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (editingId) {
      updateUser({
        id: editingId,
        email: formData.email,
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        role: formData.role,
      });
    } else {
      createUser(formData);
    }
    setFormData({ email: "", full_name: "", phone_number: "", role: "user", password: "" });
    setEditingId(null);
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setFormData({
      email: user.email,
      full_name: user.full_name,
      phone_number: user.phone_number,
      role: user.role,
      password: "",
    });
  };

  const handleDelete = (id) => {
    deleteUser(id);
  };

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 text-center">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-6 mt-6">
        {["users", "agents", "hotelOwners", "busOperators"].map((category) => (
          <button
            key={category}
            onClick={() => setCurrentCategory(category)}
            className={`text-sm font-semibold px-4 py-2 rounded-md transition ${currentCategory === category ? "bg-blue-500 text-white" : "text-gray-900 hover:bg-gray-200"}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="mt-6 bg-gray-100 p-6 rounded-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{editingId ? "Edit" : "Add"} {currentCategory}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-4 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-4 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
            className="p-4 border border-gray-300 rounded-md text-sm"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-md text-sm"
          >
            <option value="user">User</option>
            <option value="hotel_owner">Hotel Owner</option>
            <option value="bus_operator">Bus Operator</option>
            <option value="agent">Agent</option>
          </select>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-4 border border-gray-300 rounded-md text-sm"
          />
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-500 text-white rounded-md text-sm font-semibold mt-4 w-full"
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* List */}
      <div className="mt-8 bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Users</h2>
        <div className="space-y-4">
          {usersByRole[currentCategory].map((user) => (
            <div key={user.id} className="flex justify-between items-center p-4 border-b">
              <div>
                <h3 className="text-xl font-semibold">{user.full_name}</h3>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-gray-500">{user.role}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-sm font-semibold text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
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
};

export default AdminDashboard;
