"use client";

import { useState, useEffect } from "react";
import { useAuth } from '../../../context/AuthContext';
import Link from 'next/link';
import Slider from "react-slick";
import { supabase } from "../../../supabase/supabaseClient";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function UserDashboard() {
  const { user, signOut } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [buses, setBuses] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 640, settings: { slidesToShow: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
    ],
  };

  const fetchHotelsAndBuses = async () => {
    const { data: hotelsData } = await supabase.from('hotels').select();
    const { data: busesData } = await supabase.from('buses').select();
    setHotels(hotelsData || []);
    setBuses(busesData || []);
  };

  const fetchWishlist = async () => {
    if (!user) return;
    const { data, error } = await supabase.from("wishlist").select().eq("user_id", user.id);
    if (error) {
      console.error("Wishlist fetch error:", error);
      return;
    }

    const hotelPromises = data
      .filter(item => item.type === "hotel")
      .map(item => supabase.from("hotels").select("*").eq("id", item.item_id).single());

    const busPromises = data
      .filter(item => item.type === "bus")
      .map(item => supabase.from("buses").select("*").eq("id", item.item_id).single());

    const hotelResults = await Promise.all(hotelPromises);
    const busResults = await Promise.all(busPromises);

    const hotels = hotelResults.map(r => r.data).filter(Boolean);
    const buses = busResults.map(r => r.data).filter(Boolean);
    const combined = [...hotels, ...buses];
    setWishlistItems(combined);
  };

  const addToWishlist = async (itemId, type) => {
    const { error } = await supabase.from("wishlist").insert({
      user_id: user.id,
      item_id: itemId,
      type,
    });
    if (!error) fetchWishlist();
  };

  const removeFromWishlist = async (itemId) => {
    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("item_id", itemId)
      .eq("user_id", user.id);

    if (!error) fetchWishlist();
  };

  const clearWishlist = async () => {
    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", user.id);
    if (!error) setWishlistItems([]);
  };

  useEffect(() => {
    fetchHotelsAndBuses();
    if (user) fetchWishlist();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <Link href="/user" className="text-xl font-bold text-indigo-600">EasyTrip</Link>
          <div className="flex gap-4 items-center">
            <button onClick={() => setIsWishlistOpen(true)} className="text-sm font-medium text-indigo-600 border border-indigo-600 px-3 py-1 rounded hover:bg-indigo-50">
              Wishlist ({wishlistItems.length})
            </button>
            <div className="relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-3">
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
      </nav>

      {/* Dashboard Welcome */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user?.user_metadata?.full_name || 'User'}!</h2>
          <p className="mt-2 text-gray-600 text-lg">Manage your wishlist, bookings, and make secure payments.</p>
        </div>

        {/* Hotels Section */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Hotels</h3>
          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white border border-gray-200 rounded-lg shadow p-4">
                <h4 className="text-lg font-bold text-indigo-700">{hotel.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{hotel.description}</p>
                <p className="text-sm font-semibold text-gray-800 mt-2">{hotel.price}</p>
                <button onClick={() => addToWishlist(hotel.id, "hotel")} className="mt-3 text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded">
                  Save
                </button>
              </div>
            ))}
          </div>
          <div className="lg:hidden">
            <Slider {...settings}>
              {hotels.map((hotel) => (
                <div key={hotel.id} className="bg-white border border-gray-200 rounded-lg shadow p-4">
                  <h4 className="text-lg font-bold text-indigo-700">{hotel.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{hotel.description}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-2">{hotel.price}</p>
                  <button onClick={() => addToWishlist(hotel.id, "hotel")} className="mt-3 text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded">
                    Save
                  </button>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* Buses Section */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Buses</h3>
          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {buses.map((bus) => (
              <div key={bus.id} className="bg-white border border-gray-200 rounded-lg shadow p-4">
                <h4 className="text-lg font-bold text-indigo-700">{bus.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{bus.route}</p>
                <p className="text-sm font-semibold text-gray-800 mt-2">{bus.price}</p>
                <button onClick={() => addToWishlist(bus.id, "bus")} className="mt-3 text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded">
                  Save
                </button>
              </div>
            ))}
          </div>
          <div className="lg:hidden">
            <Slider {...settings}>
              {buses.map((bus) => (
                <div key={bus.id} className="bg-white border border-gray-200 rounded-lg shadow p-4">
                  <h4 className="text-lg font-bold text-indigo-700">{bus.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{bus.route}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-2">{bus.price}</p>
                  <button onClick={() => addToWishlist(bus.id, "bus")} className="mt-3 text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded">
                    Save
                  </button>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </div>

      {/* Wishlist Modal */}
      {isWishlistOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center">
          <div className="bg-white max-w-md w-full rounded-lg shadow-lg p-6 overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Wishlist</h2>
              <button onClick={() => setIsWishlistOpen(false)} className="text-gray-500 hover:text-gray-800">&times;</button>
            </div>
            {wishlistItems.length === 0 ? (
              <p className="text-gray-600">No items in wishlist.</p>
            ) : (
              <div className="space-y-4">
                {wishlistItems.map(item => (
                  <div key={item.id} className="border rounded p-4 bg-gray-50">
                    <h4 className="font-semibold text-indigo-700">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.description || item.route}</p>
                    <p className="text-sm text-gray-800 mt-1">Price: {item.price}</p>
                    <button onClick={() => removeFromWishlist(item.id)} className="mt-2 text-sm text-red-600 hover:underline">
                      Remove
                    </button>
                  </div>
                ))}
                <button onClick={clearWishlist} className="mt-4 text-sm text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}



// "use client";

// import { useState, useEffect } from "react";
// import { useAuth } from '../../../context/AuthContext';
// import Link from 'next/link';
// import Slider from "react-slick"; // Import React Slick
// import { supabase } from "../../../supabase/supabaseClient";
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// export default function UserDashboard() {
//   const { user, signOut } = useAuth();
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [hotels, setHotels] = useState([]);
//   const [buses, setBuses] = useState([]);

//   // Fetch hotels and buses data (Example for Supabase)
//   useEffect(() => {
//     const fetchHotelsAndBuses = async () => {
//       // Fetch hotels from Supabase
//       const { data: hotelsData, error: hotelsError } = await supabase.from('hotels').select();
//       if (hotelsError) console.error('Error fetching hotels:', hotelsError.message);
//       else setHotels(hotelsData);

//       // Fetch buses from Supabase
//       const { data: busesData, error: busesError } = await supabase.from('buses').select();
//       if (busesError) console.error('Error fetching buses:', busesError.message);
//       else setBuses(busesData);
//     };

//     fetchHotelsAndBuses();
//   }, []);

//   const toggleProfile = () => {
//     setIsProfileOpen(!isProfileOpen);
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 640, // Mobile breakpoint
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//       {
//         breakpoint: 1024, // Tablet/Small Desktop
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 1280, // Larger Screens
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation Bar */}
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <Link href="/user" className="text-xl font-bold text-indigo-600">EasyTrip</Link>
//             </div>

//             {/* Profile Dropdown */}
//             <div className="flex items-center">
//               <div className="relative">
//                 <button onClick={toggleProfile} className="flex items-center space-x-3 focus:outline-none">
//                   <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
//                     {user?.user_metadata?.full_name?.[0]?.toUpperCase() || 'U'}
//                   </div>
//                   <span className="text-gray-700">{user?.user_metadata?.full_name || 'User'}</span>
//                 </button>

//                 {isProfileOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//                     <Link href="/user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
//                     <Link href="/user/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
//                     <button onClick={signOut} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign out</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Dashboard Content */}
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="space-y-12">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user?.user_metadata?.full_name || 'User'}!</h2>
//             <p className="mt-2 text-gray-600 text-lg">Manage your wishlist, bookings, and make secure payments.</p>
//           </div>

//           {/* Hotels Section with Carousel */}
//           <section>
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Hotels</h3>

//             {/* If screen width > 1024px, show cards side by side; otherwise, use carousel */}
//             <div className="hidden lg:block">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {hotels.map((hotel) => (
//                   <div key={hotel.id} className="bg-white border border-gray-200 rounded-lg shadow p-4">
//                     <h4 className="text-lg font-bold text-indigo-700">{hotel.name}</h4>
//                     <p className="text-sm text-gray-600 mt-1">{hotel.description}</p>
//                     <p className="text-sm font-semibold text-gray-800 mt-2">{hotel.price}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Carousel for smaller screens */}
//             <div className="lg:hidden">
//               <Slider {...settings}>
//                 {hotels.map((hotel) => (
//                   <div key={hotel.id} className="bg-white border border-gray-200 rounded-lg shadow p-4">
//                     <h4 className="text-lg font-bold text-indigo-700">{hotel.name}</h4>
//                     <p className="text-sm text-gray-600 mt-1">{hotel.description}</p>
//                     <p className="text-sm font-semibold text-gray-800 mt-2">{hotel.price}</p>
//                   </div>
//                 ))}
//               </Slider>
//             </div>
//           </section>

//           {/* Buses Section with Carousel */}
//           <section>
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Buses</h3>

//             {/* If screen width > 1024px, show cards side by side; otherwise, use carousel */}
//             <div className="hidden lg:block">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {buses.map((bus) => (
//                   <div key={bus.id} className="bg-white border border-gray-200 rounded-lg shadow p-4">
//                     <h4 className="text-lg font-bold text-indigo-700">{bus.name}</h4>
//                     <p className="text-sm text-gray-600 mt-1">{bus.route}</p>
//                     <p className="text-sm font-semibold text-gray-800 mt-2">{bus.price}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Carousel for smaller screens */}
//             <div className="lg:hidden">
//               <Slider {...settings}>
//                 {buses.map((bus) => (
//                   <div key={bus.id} className="bg-white border border-gray-200 rounded-lg shadow p-4">
//                     <h4 className="text-lg font-bold text-indigo-700">{bus.name}</h4>
//                     <p className="text-sm text-gray-600 mt-1">{bus.route}</p>
//                     <p className="text-sm font-semibold text-gray-800 mt-2">{bus.price}</p>
//                   </div>
//                 ))}
//               </Slider>
//             </div>
//           </section>

//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import { useAuth } from '../../../context/AuthContext';
// import Link from 'next/link';
// import { supabase } from "../../../supabase/supabaseClient";
// import { Carousel } from 'react-responsive-carousel';  // Import Carousel component
// import "react-responsive-carousel/lib/styles/carousel.min.css";  // Import the styles

// export default function UserDashboard() {
//   const { user, signOut } = useAuth();

//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [showPayments, setShowPayments] = useState(false);
//   const [hotels, setHotels] = useState([]);
//   const [buses, setBuses] = useState([]);

//   // Fetch hotels and buses data (Example for Supabase)
//   useEffect(() => {
//     const fetchHotelsAndBuses = async () => {
//       // Fetch hotels from Supabase
//       const { data: hotelsData, error: hotelsError } = await supabase.from('hotels').select();
//       if (hotelsError) console.error('Error fetching hotels:', hotelsError.message);
//       else setHotels(hotelsData);

//       // Fetch buses from Supabase
//       const { data: busesData, error: busesError } = await supabase.from('buses').select();
//       if (busesError) console.error('Error fetching buses:', busesError.message);
//       else setBuses(busesData);
//     };

//     fetchHotelsAndBuses();
//   }, []);

//   const toggleProfile = () => {
//     setIsProfileOpen(!isProfileOpen);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation Bar */}
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <Link href="/user" className="text-xl font-bold text-indigo-600">EasyTrip</Link>
//             </div>

//             {/* Profile Dropdown */}
//             <div className="flex items-center">
//               <div className="relative">
//                 <button onClick={toggleProfile} className="flex items-center space-x-3 focus:outline-none">
//                   <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
//                     {user?.user_metadata?.full_name?.[0]?.toUpperCase() || 'U'}
//                   </div>
//                   <span className="text-gray-700">{user?.user_metadata?.full_name || 'User'}</span>
//                 </button>

//                 {isProfileOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//                     <Link href="/user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
//                     <Link href="/user/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
//                     <button onClick={signOut} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign out</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Dashboard Content */}
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="space-y-12">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user?.user_metadata?.full_name || 'User'}!</h2>
//             <p className="mt-2 text-gray-600 text-lg">Manage your wishlist, bookings, and make secure payments.</p>
//           </div>

//           {/* Hotels Section with Carousel */}
//           <section>
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Hotels</h3>
//             <Carousel 
//               infiniteLoop 
//               autoPlay 
//               interval={2500} 
//               showThumbs={false} 
//               dynamicHeight={false}
//             >
//               {hotels.map((hotel) => (
//                 <div key={hotel.id} className="bg-white border border-gray-200 rounded-lg shadow p-4">
//                   <h4 className="text-lg font-bold text-indigo-700">{hotel.name}</h4>
//                   <p className="text-sm text-gray-600 mt-1">{hotel.description}</p>
//                   <p className="text-sm font-semibold text-gray-800 mt-2">{hotel.price}</p>
//                 </div>
//               ))}
//             </Carousel>
//           </section>

//           {/* Buses Section with Carousel */}
//           <section>
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Buses</h3>
//             <Carousel 
//               infiniteLoop 
//               autoPlay 
//               interval={2500} 
//               showThumbs={false} 
//               dynamicHeight={false}
//             >
//               {buses.map((bus) => (
//                 <div key={bus.id} className="bg-white border border-gray-200 rounded-lg shadow p-4">
//                   <h4 className="text-lg font-bold text-indigo-700">{bus.name}</h4>
//                   <p className="text-sm text-gray-600 mt-1">{bus.route}</p>
//                   <p className="text-sm font-semibold text-gray-800 mt-2">{bus.price}</p>
//                 </div>
//               ))}
//             </Carousel>
//           </section>

//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import { useAuth } from '../../../context/AuthContext';
// import Link from 'next/link';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.min.css';


// export default function UserDashboard() {
//   const { user, signOut } = useAuth();

//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [showPayments, setShowPayments] = useState(false);
//   const [hotels, setHotels] = useState([]);
//   const [buses, setBuses] = useState([]);

//   // Fetch hotels and buses data (Example for Supabase)
//   useEffect(() => {
//     const fetchHotelsAndBuses = async () => {
//       // Fetch hotels from Supabase
//       const { data: hotelsData, error: hotelsError } = await supabase.from('hotels').select();
//       if (hotelsError) console.error('Error fetching hotels:', hotelsError.message);
//       else setHotels(hotelsData);

//       // Fetch buses from Supabase
//       const { data: busesData, error: busesError } = await supabase.from('buses').select();
//       if (busesError) console.error('Error fetching buses:', busesError.message);
//       else setBuses(busesData);
//     };

//     fetchHotelsAndBuses();
//   }, []);

//   const toggleProfile = () => {
//     setIsProfileOpen(!isProfileOpen);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation Bar */}
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <Link href="/user" className="text-xl font-bold text-indigo-600">EasyTrip</Link>
//             </div>

//             {/* Profile Dropdown */}
//             <div className="flex items-center">
//               <div className="relative">
//                 <button onClick={toggleProfile} className="flex items-center space-x-3 focus:outline-none">
//                   <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
//                     {user?.user_metadata?.full_name?.[0]?.toUpperCase() || 'U'}
//                   </div>
//                   <span className="text-gray-700">{user?.user_metadata?.full_name || 'User'}</span>
//                 </button>

//                 {isProfileOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//                     <Link href="/user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
//                     <Link href="/user/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
//                     <button onClick={signOut} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign out</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Dashboard Content */}
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="space-y-12">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user?.user_metadata?.full_name || 'User'}!</h2>
//             <p className="mt-2 text-gray-600 text-lg">Manage your wishlist, bookings, and make secure payments.</p>
//           </div>

//           {/* Hotels Section with Carousel */}
//           <section>
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Hotels</h3>
//             <Swiper spaceBetween={50} slidesPerView={1} loop={true} autoplay={{ delay: 2500 }}>
//               {hotels.map((hotel) => (
//                 <SwiperSlide key={hotel.id}>
//                   <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
//                     <h4 className="text-lg font-bold text-indigo-700">{hotel.name}</h4>
//                     <p className="text-sm text-gray-600 mt-1">{hotel.description}</p>
//                     <p className="text-sm font-semibold text-gray-800 mt-2">{hotel.price}</p>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </section>

//           {/* Buses Section with Carousel */}
//           <section>
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Buses</h3>
//             <Swiper spaceBetween={50} slidesPerView={1} loop={true} autoplay={{ delay: 2500 }}>
//               {buses.map((bus) => (
//                 <SwiperSlide key={bus.id}>
//                   <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
//                     <h4 className="text-lg font-bold text-indigo-700">{bus.name}</h4>
//                     <p className="text-sm text-gray-600 mt-1">{bus.route}</p>
//                     <p className="text-sm font-semibold text-gray-800 mt-2">{bus.price}</p>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </section>

//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useState } from "react";
// import { useAuth } from '../../../context/AuthContext';
// // import { supabase } from '../../../supabase/supabaseClient';
// import Link from 'next/link';

// export default function UserDashboard() {
//   const { user, signOut } = useAuth();

//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [showPayments, setShowPayments] = useState(false);

//   console.log("data",user);


//   const toggleProfile = () => {
//     setIsProfileOpen(!isProfileOpen);
//   };

//   const wishlist = [
//     {
//       id: 1,
//       name: "Hotel Yak & Yeti",
//       detail: "Luxury stay in the heart of Kathmandu",
//       price: "NPR 12,000 / night",
//     },
//     {
//       id: 2,
//       name: "Hotel Barahi Pokhara",
//       detail: "Lakeside view with premium service",
//       price: "NPR 9,500 / night",
//     },
//   ];

//   const [bookings, setBookings] = useState([
//     {
//       id: 201,
//       hotel: "Hotel Everest View",
//       date: "April 10, 2025",
//       nights: 2,
//       amount: "NPR 20,000",
//     },
//     {
//       id: 202,
//       hotel: "Hotel Mechi Crown",
//       date: "May 5, 2025",
//       nights: 3,
//       amount: "NPR 27,000",
//     },
//   ]);

//   const [editingBooking, setEditingBooking] = useState(null);
//   const [editForm, setEditForm] = useState({ hotel: "", date: "", nights: "", amount: "" });

//   const startEdit = (booking) => {
//     setEditingBooking(booking.id);
//     setEditForm({ ...booking });
//   };

//   const cancelBooking = (id) => {
//     setBookings(bookings.filter((b) => b.id !== id));
//     if (editingBooking === id) {
//       setEditingBooking(null);
//     }
//   };

//   const handleEditChange = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   const saveEdit = () => {
//     setBookings(bookings.map((b) => (b.id === editingBooking ? { ...editForm, id: editingBooking } : b)));
//     setEditingBooking(null);
//     setEditForm({ hotel: "", date: "", nights: "", amount: "" });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation Bar */}
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <Link href="/user" className="text-xl font-bold text-indigo-600">
//                 EasyTrip
//               </Link>
//             </div>

//             {/* Profile Dropdown */}
//             <div className="flex items-center">
//               <div className="relative">
//                 <button
//                   onClick={toggleProfile}
//                   className="flex items-center space-x-3 focus:outline-none"
//                 >
//                   <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
//                     {user?.user_metadata?.full_name?.[0]?.toUpperCase() || 'U'}
//                   </div>
//                   <span className="text-gray-700">{user?.user_metadata?.full_name || 'User'}</span>
//                 </button>

//                 {/* Dropdown Menu */}
//                 {isProfileOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//                     <Link
//                       href="/user/profile"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Your Profile
//                     </Link>
//                     <Link
//                       href="/user/settings"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Settings
//                     </Link>
//                     <button
//                       onClick={signOut}
//                       className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                     >
//                       Sign out
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Dashboard Content */}
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="space-y-12">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user?.user_metadata?.full_name || 'User'}!</h2>
//             <p className="mt-2 text-gray-600 text-lg">Manage your wishlist, bookings, and make secure payments.</p>
//           </div>

//           {/* Wishlist Section */}
//           <section>
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Wishlist</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {wishlist.map((hotel) => (
//                 <div key={hotel.id} className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:shadow-md transition">
//                   <h4 className="text-lg font-bold text-indigo-700">{hotel.name}</h4>
//                   <p className="text-sm text-gray-600 mt-1">{hotel.detail}</p>
//                   <p className="text-sm font-semibold text-gray-800 mt-2">{hotel.price}</p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Booking History Section */}
//           <section>
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Bookings</h3>
//             <ul className="space-y-4">
//               {bookings.map((entry) => (
//                 <li key={entry.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
//                   {editingBooking === entry.id ? (
//                     <div className="space-y-2">
//                       <input
//                         className="border p-2 rounded w-full"
//                         name="hotel"
//                         value={editForm.hotel}
//                         onChange={handleEditChange}
//                         placeholder="Hotel Name"
//                       />
//                       <input
//                         className="border p-2 rounded w-full"
//                         name="date"
//                         value={editForm.date}
//                         onChange={handleEditChange}
//                         placeholder="Booking Date"
//                       />
//                       <input
//                         className="border p-2 rounded w-full"
//                         name="nights"
//                         value={editForm.nights}
//                         onChange={handleEditChange}
//                         placeholder="Nights"
//                       />
//                       <input
//                         className="border p-2 rounded w-full"
//                         name="amount"
//                         value={editForm.amount}
//                         onChange={handleEditChange}
//                         placeholder="Amount"
//                       />
//                       <div className="flex gap-2">
//                         <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={saveEdit}>
//                           Save
//                         </button>
//                         <button className="bg-gray-300 text-gray-800 px-3 py-1 rounded" onClick={() => setEditingBooking(null)}>
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                       <p className="font-semibold text-gray-900">{entry.hotel}</p>
//                       <p className="text-sm text-gray-600">Date: {entry.date}</p>
//                       <p className="text-sm text-gray-600">Nights: {entry.nights}</p>
//                       <p className="text-sm text-gray-700">Paid: {entry.amount}</p>
//                       <div className="flex gap-2 mt-2">
//                         <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => startEdit(entry)}>
//                           Modify
//                         </button>
//                         <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => cancelBooking(entry.id)}>
//                           Cancel
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </section>

//           {/* Payment Section */}
//           <section className="text-center">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Make a Payment</h3>
//             <button
//               onClick={() => setShowPayments(!showPayments)}
//               className="py-3 px-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
//             >
//               Pay Now
//             </button>

//             {showPayments && (
//               <div className="mt-6 space-y-4 max-w-sm mx-auto">
//                 <button className="w-full py-3 px-4 text-sm font-semibold text-green-700 bg-green-100 border border-green-300 rounded-lg hover:bg-green-200 transition">
//                   Pay with eSewa
//                 </button>
//                 <button className="w-full py-3 px-4 text-sm font-semibold text-purple-700 bg-purple-100 border border-purple-300 rounded-lg hover:bg-purple-200 transition">
//                   Pay with Khalti
//                 </button>
//               </div>
//             )}
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }