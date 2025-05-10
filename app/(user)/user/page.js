"use client";

import { useState } from "react";

export default function UserDashboard() {
  const [showPayments, setShowPayments] = useState(false);
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      type: "hotel",
      name: "Hotel Yak & Yeti",
      detail: "Luxury stay in the heart of Kathmandu",
      price: "NPR 12,000 / night",
    },
    {
      id: 2,
      type: "hotel",
      name: "Hotel Barahi Pokhara",
      detail: "Lakeside view with premium service",
      price: "NPR 9,500 / night",
    },
  ]);

  const [history] = useState([
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
  ]);

  const availableHotels = [
    {
      id: 201,
      name: "Hotel Everest View",
      detail: "Scenic mountain view rooms",
      price: "NPR 15,000 / night",
    },
  ];

  const availableBuses = [
    {
      id: 301,
      name: "Deluxe Express",
      detail: "Kathmandu to Pokhara",
      price: "NPR 1,200",
    },
  ];

  const reviews = [
    {
      id: 1,
      type: "hotel",
      itemId: 201,
      user: "John Doe",
      rating: 5,
      review: "Amazing view and excellent service!",
    },
    {
      id: 2,
      type: "bus",
      itemId: 301,
      user: "Jane Smith",
      rating: 4,
      review: "Comfortable ride, but could use more legroom.",
    },
  ];

  const [newReview, setNewReview] = useState({
    type: "",
    itemId: null,
    user: "",
    rating: 1,
    review: "",
  });

  const addToWishlist = (item, type) => {
    const exists = wishlist.find((w) => w.id === item.id && w.type === type);
    if (!exists) {
      setWishlist([...wishlist, { ...item, type }]);
    }
  };

  const submitReview = () => {
    if (newReview.user && newReview.review && newReview.rating > 0) {
      setNewReview({ type: "", itemId: null, user: "", rating: 1, review: "" });
      setReviews([
        ...reviews,
        { ...newReview, id: Date.now() },
      ]);
    }
  };

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
            {wishlist.map((item) => (
              <div key={`${item.type}-${item.id}`} className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:shadow-md transition">
                <h4 className="text-lg font-bold text-indigo-700">{item.name}</h4>
                <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                <p className="text-sm text-gray-600 mt-1">{item.detail}</p>
                <p className="text-sm font-semibold text-gray-800 mt-2">{item.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Available Hotels */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Hotels</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {availableHotels.map((hotel) => (
              <div key={hotel.id} className="border p-4 rounded shadow">
                <h4 className="text-lg font-bold">{hotel.name}</h4>
                <p className="text-sm text-gray-600">{hotel.detail}</p>
                <p className="text-sm">{hotel.price}</p>
                <button onClick={() => addToWishlist(hotel, "hotel")} className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded">
                  Add to Wishlist
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Available Buses */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Buses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {availableBuses.map((bus) => (
              <div key={bus.id} className="border p-4 rounded shadow">
                <h4 className="text-lg font-bold">{bus.name}</h4>
                <p className="text-sm text-gray-600">{bus.detail}</p>
                <p className="text-sm">{bus.price}</p>
                <button onClick={() => addToWishlist(bus, "bus")} className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded">
                  Add to Wishlist
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Reviews</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="border p-4 rounded shadow">
                <h4 className="text-lg font-semibold">{review.user}</h4>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">{review.review}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Add Review Section */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add a Review</h3>
          <div className="border p-6 rounded shadow">
            <input
              type="text"
              placeholder="Your Name"
              value={newReview.user}
              onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
              className="border p-2 rounded mb-4 w-full"
            />
            <textarea
              placeholder="Your Review"
              value={newReview.review}
              onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
              className="border p-2 rounded mb-4 w-full"
            />
            <div className="flex items-center gap-2 mb-4">
              <label>Rating: </label>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                  className={i < newReview.rating ? "text-yellow-400 cursor-pointer" : "text-gray-300 cursor-pointer"}
                >
                  ★
                </span>
              ))}
            </div>
            <button onClick={submitReview} className="py-2 px-4 bg-indigo-600 text-white rounded-lg">
              Submit Review
            </button>
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