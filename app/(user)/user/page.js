// "use client";

// import { useState, useEffect } from "react";
// import { useAuth } from '../../../context/AuthContext';
// import Link from 'next/link';
// import Slider from "react-slick"; // Import React Slick
// import { supabase } from "../../../supabase/supabaseClient";
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// export default function UserDashboard() {
// <<<<<<< shuvam_supabase_33
//   const [showPayments, setShowPayments] = useState(false);
//   const [wishlist, setWishlist] = useState([
//     {
//       id: 1,
//       type: "hotel",
//       name: "Hotel Yak & Yeti",
//       detail: "Luxury stay in the heart of Kathmandu",
//       price: "NPR 12,000 / night",
//     },
//     {
//       id: 2,
//       type: "hotel",
//       name: "Hotel Barahi Pokhara",
//       detail: "Lakeside view with premium service",
//       price: "NPR 9,500 / night",
//     },
//   ]);

// <<<<<<< HEAD
//   const [history] = useState([
// =======
//   const [bookings, setBookings] = useState([
// >>>>>>> b99218eb85cede6f49ab52faec81da62eb64fb81
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

// <<<<<<< HEAD
//   const availableHotels = [
//     {
//       id: 201,
//       name: "Hotel Everest View",
//       detail: "Scenic mountain view rooms",
//       price: "NPR 15,000 / night",
//     },
//   ];
// =======
//   const [editingBooking, setEditingBooking] = useState(null);
//   const [editForm, setEditForm] = useState({ hotel: "", date: "", nights: "", amount: "" });

//   const startEdit = (booking) => {
//     setEditingBooking(booking.id);
//     setEditForm({ ...booking });
//   };
// =======
//   const { user, signOut } = useAuth();
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [hotels, setHotels] = useState([]);
//   const [buses, setBuses] = useState([]);
// >>>>>>> main

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
// >>>>>>> b99218eb85cede6f49ab52faec81da62eb64fb81

//   const availableBuses = [
//     {
//       id: 301,
//       name: "Deluxe Express",
//       detail: "Kathmandu to Pokhara",
//       price: "NPR 1,200",
//     },
//   ];

//   const addToWishlist = (item, type) => {
//     const exists = wishlist.find((w) => w.id === item.id && w.type === type);
//     if (!exists) {
//       setWishlist([...wishlist, { ...item, type }]);
//     }
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

// <<<<<<< shuvam_supabase_33
//         {/* Wishlist Section */}
//         <section>
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Wishlist</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
// <<<<<<< HEAD
//             {wishlist.map((item) => (
//               <div key={`${item.type}-${item.id}`} className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:shadow-md transition">
//                 <h4 className="text-lg font-bold text-indigo-700">{item.name}</h4>
//                 <p className="text-sm text-gray-500 capitalize">{item.type}</p>
//                 <p className="text-sm text-gray-600 mt-1">{item.detail}</p>
//                 <p className="text-sm font-semibold text-gray-800 mt-2">{item.price}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Available Hotels */}
//         <section>
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Hotels</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {availableHotels.map((hotel) => (
//               <div key={hotel.id} className="border p-4 rounded shadow">
//                 <h4 className="text-lg font-bold">{hotel.name}</h4>
//                 <p className="text-sm text-gray-600">{hotel.detail}</p>
//                 <p className="text-sm">{hotel.price}</p>
//                 <button onClick={() => addToWishlist(hotel, "hotel")} className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded">
//                   Add to Wishlist
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Available Buses */}
//         <section>
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Buses</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {availableBuses.map((bus) => (
//               <div key={bus.id} className="border p-4 rounded shadow">
//                 <h4 className="text-lg font-bold">{bus.name}</h4>
//                 <p className="text-sm text-gray-600">{bus.detail}</p>
//                 <p className="text-sm">{bus.price}</p>
//                 <button onClick={() => addToWishlist(bus, "bus")} className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded">
//                   Add to Wishlist
//                 </button>
// =======
//             {wishlist.map((hotel) => (
//               <div key={hotel.id} className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:shadow-md transition">
//                 <h4 className="text-lg font-bold text-indigo-700">{hotel.name}</h4>
//                 <p className="text-sm text-gray-600 mt-1">{hotel.detail}</p>
//                 <p className="text-sm font-semibold text-gray-800 mt-2">{hotel.price}</p>
// >>>>>>> b99218eb85cede6f49ab52faec81da62eb64fb81
// =======
//                 {isProfileOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//                     <Link href="/user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
//                     <Link href="/user/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
//                     <button onClick={signOut} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign out</button>
//                   </div>
//                 )}
// >>>>>>> main
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
// <<<<<<< shuvam_supabase_33
//                 ) : (
//                   <>
//                     <p className="font-semibold text-gray-900">{entry.hotel}</p>
//                     <p className="text-sm text-gray-600">Date: {entry.date}</p>
//                     <p className="text-sm text-gray-600">Nights: {entry.nights}</p>
//                     <p className="text-sm text-gray-700">Paid: {entry.amount}</p>
//                     <div className="flex gap-2 mt-2">
//                       <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => startEdit(entry)}>
//                         Modify
//                       </button>
//                       <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => cancelBooking(entry.id)}>
//                         Cancel
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* Payment Section for git*/}
//         <section className="text-center">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Make a Payment</h3>
//           <button
//             onClick={() => setShowPayments(!showPayments)}
//             className="py-3 px-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
//           >
//             Pay Now
//           </button>

//           {showPayments && (
//             <div className="mt-6 space-y-4 max-w-sm mx-auto">
//               <button className="w-full py-3 px-4 text-sm font-semibold text-green-700 bg-green-100 border border-green-300 rounded-lg hover:bg-green-200 transition">
//                 Pay with eSewa
//               </button>
//               <button className="w-full py-3 px-4 text-sm font-semibold text-purple-700 bg-purple-100 border border-purple-300 rounded-lg hover:bg-purple-200 transition">
//                 Pay with Khalti
//               </button>
// =======
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
// >>>>>>> main
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
