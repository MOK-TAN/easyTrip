"use client";

import { useState } from "react";

export default function User() {
  const [showOptions, setShowOptions] = useState(false);

  const togglePaymentOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-16 sm:py-24 lg:py-32">
      <div className="max-w-md w-full px-6 lg:px-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-900">Welcome, User</h2>
        <p className="mt-4 text-lg text-gray-600">You can pay online securely using the button below.</p>

        <div className="mt-8">
          <button
            onClick={togglePaymentOptions}
            className="w-full py-3 px-4 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Pay Online Securely
          </button>
        </div>

        {showOptions && (
          <div className="mt-6 space-y-4">
            <button
              className="w-full py-3 px-4 text-sm font-semibold text-green-700 bg-green-100 border border-green-300 rounded-lg hover:bg-green-200 transition"
            >
              Pay with eSewa
            </button>
            <button
              className="w-full py-3 px-4 text-sm font-semibold text-purple-700 bg-purple-100 border border-purple-300 rounded-lg hover:bg-purple-200 transition"
            >
              Pay with Khalti
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
