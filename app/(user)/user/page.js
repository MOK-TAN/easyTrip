"use client";

import { useState, useEffect } from "react";
import { useAuth } from '../../../context/AuthContext';
import Link from 'next/link';
import Slider from "react-slick"; // Import React Slick
import { supabase } from "../../../supabase/supabaseClient";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function UserDashboard() {
  const { user, signOut } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [buses, setBuses] = useState([]);

  // Fetch hotels and buses data (Example for Supabase)
  useEffect(() => {
    const fetchHotelsAndBuses = async () => {
      // Fetch hotels from Supabase
      const { data: hotelsData, error: hotelsError } = await supabase.from('hotels').select();
      if (hotelsError) console.error('Error fetching hotels:', hotelsError.message);
      else setHotels(hotelsData);

      // Fetch buses from Supabase
      const { data: busesData, error: busesError } = await supabase.from('buses').select();
      if (busesError) console.error('Error fetching buses:', busesError.message);
      else setBuses(busesData);
    };

    fetchHotelsAndBuses();
  }, []);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640, // Mobile breakpoint
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024, // Tablet/Small Desktop
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1280, // Larger Screens
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/user" className="text-xl font-bold text-indigo-600">EasyTrip</Link>
            </div>

            {/* Profile Dropdown */}
            <div className="flex items-center">
              <div className="relative">
                <button onClick={toggleProfile} className="flex items-center space-x-3 focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    {user?.user_metadata?.full_name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-gray-700">{user?.user_metadata?.full_name || 'User'}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link href="/user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                    <Link href="/user/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                    <button onClick={signOut} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign out</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user?.user_metadata?.full_name || 'User'}!</h2>
            <p className="mt-2 text-gray-600 text-lg">Manage your wishlist, bookings, and make secure payments.</p>
          </div>

          {/* Hotels Section with Carousel */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Hotels</h3>

            {/* If screen width > 1024px, show cards side by side; otherwise, use carousel */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="bg-white border border-gray-200 rounded-lg shadow p-4">
                    <h4 className="text-lg font-bold text-indigo-700">{hotel.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{hotel.description}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-2">{hotel.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel for smaller screens */}
            <div className="lg:hidden">
              <Slider {...settings}>
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="bg-white border border-gray-200 rounded-lg shadow p-4">
                    <h4 className="text-lg font-bold text-indigo-700">{hotel.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{hotel.description}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-2">{hotel.price}</p>
                  </div>
                ))}
              </Slider>
            </div>
          </section>

          {/* Buses Section with Carousel */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Buses</h3>

            {/* If screen width > 1024px, show cards side by side; otherwise, use carousel */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {buses.map((bus) => (
                  <div key={bus.id} className="bg-white border border-gray-200 rounded-lg shadow p-4">
                    <h4 className="text-lg font-bold text-indigo-700">{bus.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{bus.route}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-2">{bus.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel for smaller screens */}
            <div className="lg:hidden">
              <Slider {...settings}>
                {buses.map((bus) => (
                  <div key={bus.id} className="bg-white border border-gray-200 rounded-lg shadow p-4">
                    <h4 className="text-lg font-bold text-indigo-700">{bus.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{bus.route}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-2">{bus.price}</p>
                  </div>
                ))}
              </Slider>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
