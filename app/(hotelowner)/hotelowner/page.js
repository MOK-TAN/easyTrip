"use client";
import React, { useState } from "react";

export default function HotelOwnerSignup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "confirmPassword" || e.target.name === "password") {
      if (formData.password !== e.target.value && e.target.name === "confirmPassword") {
        setPasswordMatchError("Passwords do not match");
      } else {
        setPasswordMatchError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    console.log("Hotel Owner Form Submitted", formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="bg-white p-10 rounded-3xl shadow-lg w-96 text-center">
        <h2 className="text-red-800 text-2xl font-bold mb-6">Hotel Owner Signup</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        {passwordMatchError && <p className="text-red-600 mb-2">{passwordMatchError}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-4 my-3 border-2 border-gray-300 rounded-lg text-lg outline-none text-black focus:border-red-800 focus:ring-2 focus:ring-red-800"
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-4 my-3 border-2 border-gray-300 rounded-lg text-lg outline-none text-black focus:border-red-800 focus:ring-2 focus:ring-red-800"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-4 my-3 border-2 border-gray-300 rounded-lg text-lg outline-none text-black focus:border-red-800 focus:ring-2 focus:ring-red-800"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-4 my-3 border-2 border-gray-300 rounded-lg text-lg outline-none text-black focus:border-red-800 focus:ring-2 focus:ring-red-800"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full p-4 my-3 border-2 border-gray-300 rounded-lg text-lg outline-none text-black focus:border-red-800 focus:ring-2 focus:ring-red-800"
          />
          <button
            type="submit"
            className="bg-red-800 text-white p-4 w-full rounded-lg text-lg font-bold hover:bg-red-900"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
