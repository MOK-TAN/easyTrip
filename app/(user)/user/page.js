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

  const history = [
    {
      id: 101,
      hotel: "Hotel Himalaya",
      date: "March 15, 2025",
      amount: "NPR 10,000",
    },
    {
      id: 102,
      hotel: "Hotel Annapurna",
      date: "February 02, 2025",
      amount: "NPR 11,500",
    },
  ];

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
              <div
                key={hotel.id}
                className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:shadow-md transition"
              >
                <h4 className="text-lg font-bold text-indigo-700">{hotel.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{hotel.detail}</p>
                <p className="text-sm font-semibold text-gray-800 mt-2">{hotel.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Booking History */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Booking History</h3>
          <ul className="space-y-4">
            {history.map((entry) => (
              <li key={entry.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-gray-900">{entry.hotel}</p>
                <p className="text-sm text-gray-600">Date: {entry.date}</p>
                <p className="text-sm text-gray-700">Paid: {entry.amount}</p>
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
      </div>
    </div>
  );
}


// "use client";

// import { useState } from "react";

// export default function User() {
//   const [showOptions, setShowOptions] = useState(false);

//   const togglePaymentOptions = () => {
//     setShowOptions(!showOptions);
//   };

//   return (
//     <div className="bg-white min-h-screen flex items-center justify-center py-16 sm:py-24 lg:py-32">
//       <div className="max-w-md w-full px-6 lg:px-8 bg-white rounded-lg shadow-lg text-center">
//         <h2 className="text-3xl font-bold text-gray-900">Welcome, User</h2>
//         <p className="mt-4 text-lg text-gray-600">You can pay online securely using the button below.</p>

//         <div className="mt-8">
//           <button
//             onClick={togglePaymentOptions}
//             className="w-full py-3 px-4 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             Pay Online Securely
//           </button>
//         </div>

//         {showOptions && (
//           <div className="mt-6 space-y-4">
//             <button
//               className="w-full py-3 px-4 text-sm font-semibold text-green-700 bg-green-100 border border-green-300 rounded-lg hover:bg-green-200 transition"
//             >
//               Pay with eSewa
//             </button>
//             <button
//               className="w-full py-3 px-4 text-sm font-semibold text-purple-700 bg-purple-100 border border-purple-300 rounded-lg hover:bg-purple-200 transition"
//             >
//               Pay with Khalti
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
