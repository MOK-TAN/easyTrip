// "use client";
// import Image from "next/image";
// import Link from 'next/link';
// import {useState} from 'react';

// export default function Home() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   return (
//     <>
//       <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
//         <div className="text-2xl font-bold">Ghum Gham</div>
//         <div className="hidden md:flex">
//           <a href="#" className="mx-2 hover:text-blue-200">Home</a>
//           <a href="#" className="mx-2 hover:text-blue-200">Our Offer</a>
//           <a href="#" className="mx-2 hover:text-blue-200">Booking</a>
//           <a href="#" className="mx-2 hover:text-blue-200">FAQ</a>
//         </div>
//         <div className="flex items-center relative">
//           <input
//             type="text" 
//             placeholder="Search" 
//             className="p-2 rounded text-black bg-white border-gray-300 mr-2"
//           />
//           {/* <div 
//           className="relative"
//           onMouseEnter={()=> setIsDropdownOpen(true)}
//           onMouseLeave={()=> setIsDropdownOpen(false)}
//           >
//           </div> */}
//           <button  onClick={()=> setIsDropdownOpen(true)}
//           className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100">Login</button>
//           {isDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden">
//                 <Link href="user/login">
//                   <div className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-black">User Login</div>
//                 </Link>
//                 <Link href="user/signup">
//                   <div className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-black">User Sign Up</div>
//                 </Link>
//                 <Link href="admin/login">
//                   <div className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-black">Admin Login</div>
//                 </Link>
//                 <Link href="admin/signup">
//                   <div className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-black">Admin Sign Up</div>
//                 </Link>
//                 <Link href="busoperator/login">
//                   <div className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-black">Bus operator Login</div>
//                 </Link>
//                 <Link href="busoperator/signup">
//                   <div className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-black">Bus operator Sign Up</div>
//                 </Link>
//               </div>
//             )}
//         </div>
//       </nav>
//       <div onClick={ ()=>{ setIsDropdownOpen(false)}}
//       className="bg-cover bg-center h-96 flex items-center justify-center" style={{backgroundImage: "url(https://t3.ftcdn.net/jpg/02/11/44/66/360_F_211446611_nI7ZJ1wu2a4bd2luJkqnePBpgpjY7qpk.jpg)"}}>
//         <div className="text-center bg-white bg-opacity-50 p-8 rounded text-black">
//           <h1 className="text-4xl font-bold mb-4">Explore the World With Us</h1>
//           <p className="text-xl mb-6">Discover amazing destinations with our curated travel experiences</p>
//           <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
//             Book Now
//           </button>
//         </div>
//       </div>
      
//       <div className="container bg-blue-200 py-12 px-2">
//         <h2 className="text-3xl font-bold text-center mb-8">Popular Destinations</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Destination cards */}
//           {[
//             { name: "Pokhara, Nepal", price: "RS 25,000" },
//             { name: "Kathmandu, Nepal", price: "RS 15,000" },
//             { name: "Chitwan, Nepal", price: "RS 20,000" }
//           ].map((dest, index) => (
//             <div key={index} className="rounded-lg overflow-hidden shadow-lg">
//               <img src={/api/placeholder/400/250} alt={dest.name} className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <h3 className="font-bold text-xl mb-2">{dest.name}</h3>
//                 <p className="text-gray-600 mb-2">7 Days Tour</p>
//                 <div className="flex justify-between items-center">
//                   <span className="text-blue-500 font-bold">{dest.price}</span>
//                   <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       <div className="bg-blue-100 py-12 px-4">
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             {[
//               { title: "Best Prices", desc: "We offer competitive rates for all destinations" },
//               { title: "24/7 Support", desc: "Our customer support team is always available" },
//               { title: "Experienced Guides", desc: "Travel with our knowledgeable local guides" },
//               { title: "Safe Travel", desc: "Your safety is our top priority" }
//             ].map((feature, index) => (
//               <div key={index} className="bg-white p-6 rounded-lg shadow-md">
//                 <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       <footer className="bg-blue-400 text-white py-8">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">Ghum Gham</h3>
//               <p>Making your travel dreams come true since 2025.</p>
//               <p className="mt-2">Created by Team A</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//               <ul>
//                 <li className="mb-2"><a href="#" className="hover:text-blue-300">Home</a></li>
//                 <li className="mb-2"><a href="#" className="hover:text-blue-300">Destinations</a></li>
//                 <li className="mb-2"><a href="#" className="hover:text-blue-300">Packages</a></li>
//                 <li className="mb-2"><a href="#" className="hover:text-blue-300">Contact Us</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Contact</h3>
//               <p className="mb-2">Email: info@ghumgham.com</p>
//               <p className="mb-2">Phone: 9841714584</p>
//               <p>Address: Naxal,Kathmandu</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
//               <p className="mb-4">Subscribe to get travel deals and updates</p>
//               <div className="flex">
//                 <input type="email" placeholder="Your Email" className="p-2 rounded-l text-black w-full" />
//                 <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r">Subscribe</button>
//               </div>
//             </div>
//           </div>
//           <div className="border-t border-blue-600 mt-8 pt-6 text-center">
//             <p>&copy; 2025 Ghum Gham. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }





// // export default function Home() {
// //   return (
// //     <div>
// //       <h4>OUR ROUTES </h4>
// //       <br />
// //       <h5>USER ROUTES</h5>
// //       <Link href='/user/signup'>User sign up</Link><br />
// //       <Link href='/user/login'>User login up</Link><br />

// //       <br />
// //       <h5>ADMIN ROUTES</h5>
// //       <Link href='/admin/signup'>Admin sign up</Link><br />
// //       <Link href='/admin/login'>Admin login up</Link><br />

// //       <br />
// //       <h5>AGENT ROUTES</h5>
// //       <Link href='/agent/signup'>Agent sign up</Link><br />
// //       <Link href='/agent/login'>Agent login up</Link><br />

// //       <br />
// //       <h5>BUS OPERATOR ROUTES</h5>
// //       <Link href='/busoperator/signup'>busoperator sign up</Link><br />
// //       <Link href='/busoperator/login'>busoperator login up</Link><br />

// //       <br />
// //       <h5>HOTEL OWNER ROUTES</h5>
// //       <Link href='/hotelowner/signup'>hotelowner sign up</Link><br />
// //       <Link href='/hotelowner/login'>hotelowner login up</Link><br />
// //     </div>
// //   );
// // }

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

// export default function Home() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
//         <div className="text-2xl font-bold">Ghum Gham</div>
//         <div className="hidden md:flex">
//           <Link href="#" className="mx-2 hover:text-blue-200">Home</Link>
//           <Link href="#" className="mx-2 hover:text-blue-200">Our Offer</Link>
//           <Link href="#" className="mx-2 hover:text-blue-200">Booking</Link>
//           <Link href="#" className="mx-2 hover:text-blue-200">FAQ</Link>
//         </div>
//         <div className="flex items-center relative">
//           <input type="text" placeholder="Search" className="p-2 rounded text-black bg-white border-gray-300 mr-2" />
//           <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100">Login</button>
//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden">
//               {[
//                 { path: "user/login", label: "User Login" },
//                 { path: "user/signup", label: "User Sign Up" },
//                 { path: "admin/login", label: "Admin Login" },
//                 { path: "admin/signup", label: "Admin Sign Up" },
//                 { path: "busoperator/login", label: "Bus Operator Login" },
//                 { path: "busoperator/signup", label: "Bus Operator Sign Up" }
//               ].map((item, index) => (
//                 <Link key={index} href={item.path} className="block px-4 py-2 hover:bg-blue-100 cursor-pointer text-black">{item.label}</Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="bg-cover bg-center h-96 flex items-center justify-center" style={{ backgroundImage: "url(https://t3.ftcdn.net/jpg/02/11/44/66/360_F_211446611_nI7ZJ1wu2a4bd2luJkqnePBpgpjY7qpk.jpg)" }}>
//         <div className="text-center bg-white bg-opacity-50 p-8 rounded text-black">
//           <h1 className="text-4xl font-bold mb-4">Explore the World With Us</h1>
//           <p className="text-xl mb-6">Discover amazing destinations with our curated travel experiences</p>
//           <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">Book Now</button>
//         </div>
//       </div>

//       {/* Popular Destinations */}
//       <div className="container bg-blue-200 py-12 px-2">
//         <h2 className="text-3xl font-bold text-center mb-8">Popular Destinations</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {[
//             { name: "Pokhara, Nepal", price: "RS 25,000" },
//             { name: "Kathmandu, Nepal", price: "RS 15,000" },
//             { name: "Chitwan, Nepal", price: "RS 20,000" }
//           ].map((dest, index) => (
//             <div key={index} className="rounded-lg overflow-hidden shadow-lg">
//               <Image src="/api/placeholder/400/250" alt={dest.name} width={400} height={250} className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <h3 className="font-bold text-xl mb-2">{dest.name}</h3>
//                 <p className="text-gray-600 mb-2">7 Days Tour</p>
//                 <div className="flex justify-between items-center">
//                   <span className="text-blue-500 font-bold">{dest.price}</span>
//                   <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">View Details</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-blue-400 text-white py-8">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">Ghum Gham</h3>
//               <p>Making your travel dreams come true since 2025.</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//               <ul>
//                 <li className="mb-2"><Link href="#" className="hover:text-blue-300">Home</Link></li>
//                 <li className="mb-2"><Link href="#" className="hover:text-blue-300">Destinations</Link></li>
//                 <li className="mb-2"><Link href="#" className="hover:text-blue-300">Packages</Link></li>
//                 <li className="mb-2"><Link href="#" className="hover:text-blue-300">Contact Us</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Contact</h3>
//               <p className="mb-2">Email: info@ghumgham.com</p>
//               <p className="mb-2">Phone: 9841714584</p>
//               <p>Address: Naxal, Kathmandu</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
//               <p className="mb-4">Subscribe to get travel deals and updates</p>
//               <div className="flex">
//                 <input type="email" placeholder="Your Email" className="p-2 rounded-l text-black w-full" />
//                 <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r">Subscribe</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }


// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// export default function Home() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     // Close dropdown when clicking outside
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".dropdown-menu")) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
//         <div className="text-2xl font-bold">Ghum Gham</div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex">
//           {["Home", "Our Offer", "Booking", "FAQ"].map((item, index) => (
//             <Link key={index} href="#" className="mx-2 hover:text-blue-200">
//               {item}
//             </Link>
//           ))}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           ☰
//         </button>

//         {/* Login Dropdown */}
//         <div className="relative dropdown-menu">
//           <button
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100"
//           >
//             Login
//           </button>
//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden">
//               {[
//                 { path: "user/login", label: "User Login" },
//                 { path: "user/signup", label: "User Sign Up" },
//                 { path: "admin/login", label: "Admin Login" },
//                 { path: "admin/signup", label: "Admin Sign Up" },
//                 { path: "busoperator/login", label: "Bus Operator Login" },
//                 { path: "busoperator/signup", label: "Bus Operator Sign Up" }
//               ].map((item, index) => (
//                 <Link
//                   key={index}
//                   href={item.path}
//                   className="block px-4 py-2 hover:bg-blue-100 cursor-pointer text-black"
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div
//         className="bg-cover bg-center h-96 flex items-center justify-center"
//         style={{
//           backgroundImage:
//             "url(https://t4.ftcdn.net/jpg/11/73/13/91/360_F_1173139101_AbqKhhBFCVfxTKtB0SfNZVlghvtbFuSO.jpg)"
//         }}
//       >
//         <div className="text-center bg-white bg-opacity-50 p-8 rounded text-black">
//           <h1 className="text-4xl font-bold mb-4">Explore the World With Us</h1>
//           <p className="text-xl mb-6">
//             Discover amazing destinations with our curated travel experiences
//           </p>
//           <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
//             Book Now
//           </button>
//         </div>
//       </div>

//       {/* Popular Destinations */}
//       <div className="container bg-blue-200 py-12 px-2">
//         <h2 className="text-3xl font-bold text-center mb-8">
//           Popular Destinations
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {[
//             { name: "Pokhara, Nepal", price: "RS 25,000", image: "/https://media.istockphoto.com/id/1844319912/photo/pokhara-phewa-lake.jpg?s=612x612&w=0&k=20&c=GiC5EAyWUpkOhX36t1qRSJot8r6ZMczQYsjO3Q3Wpdo=" },
//             { name: "Kathmandu, Nepal", price: "RS 15,000", image: "/https://cdn.kimkim.com/files/a/content_articles/featured_photos/4a8eeecd5c9854938f39e98a5144100052e91af8/medium-56421a1c8d25ba4943cea3ca141450a3.jpg" },
//             { name: "Chitwan, Nepal", price: "RS 20,000", image: "/https://media.app.nepalguidetrekking.com/uploads/media/Sunset-Chitwan.jpg" }
//           ].map((dest, index) => (
//             <div key={index} className="rounded-lg overflow-hidden shadow-lg">
//               <Image
//                 src={dest.image}
//                 alt={dest.name}
//                 width={400}
//                 height={250}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="font-bold text-xl mb-2">{dest.name}</h3>
//                 <p className="text-gray-600 mb-2">7 Days Tour</p>
//                 <div className="flex justify-between items-center">
//                   <span className="text-blue-500 font-bold">{dest.price}</span>
//                   <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-blue-400 text-white py-8">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">Ghum Gham</h3>
//               <p>Making your travel dreams come true since 2025.</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//               <ul>
//                 {["Home", "Destinations", "Packages", "Contact Us"].map(
//                   (item, index) => (
//                     <li key={index} className="mb-2">
//                       <Link href="#" className="hover:text-blue-300">
//                         {item}
//                       </Link>
//                     </li>
//                   )
//                 )}
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Contact</h3>
//               <p className="mb-2">Email: info@ghumgham.com</p>
//               <p className="mb-2">Phone: 9841714584</p>
//               <p>Address: Naxal, Kathmandu</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
//               <p className="mb-4">Subscribe to get travel deals and updates</p>
//               <div className="flex">
//                 <input
//                   type="email"
//                   placeholder="Your Email"
//                   className="p-2 rounded-l text-black w-full"
//                 />
//                 <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }


// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// export default function Home() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     // Close dropdown when clicking outside
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".dropdown-menu")) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="bg-blue-600 p-4 text-white flex justify-between items-center relative">
//         <div className="text-2xl font-bold">Ghum Gham</div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex">
//           {["Home", "Our Offer", "Booking", "FAQ"].map((item, index) => (
//             <Link key={index} href="#" className="mx-2 hover:text-blue-200">
//               {item}
//             </Link>
//           ))}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-2xl"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           ☰
//         </button>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="absolute top-16 left-0 w-full bg-blue-600 flex flex-col items-center md:hidden">
//             {["Home", "Our Offer", "Booking", "FAQ"].map((item, index) => (
//               <Link key={index} href="#" className="p-4 text-white w-full text-center hover:bg-blue-500">
//                 {item}
//               </Link>
//             ))}
//           </div>
//         )}

//         {/* Login Dropdown */}
//         <div className="relative dropdown-menu">
//           <button
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100"
//           >
//             Login
//           </button>
//           {isDropdownOpen && (
//             <div 
//               className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden" 
//               onClick={(e) => e.stopPropagation()}
//             >
//               {[
//                 { path: "user/login", label: "User Login" },
//                 { path: "user/signup", label: "User Sign Up" },
//                 { path: "admin/login", label: "Admin Login" },
//                 { path: "admin/signup", label: "Admin Sign Up" },
//                 { path: "busoperator/login", label: "Bus Operator Login" },
//                 { path: "busoperator/signup", label: "Bus Operator Sign Up" }
//               ].map((item, index) => (
//                 <Link
//                   key={index}
//                   href={item.path}
//                   className="block px-4 py-2 hover:bg-blue-100 cursor-pointer text-black"
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div
//         className="bg-cover bg-center h-96 flex items-center justify-center"
//         style={{
//           backgroundImage:
//             "url(https://t4.ftcdn.net/jpg/11/73/13/91/360_F_1173139101_AbqKhhBFCVfxTKtB0SfNZVlghvtbFuSO.jpg)"
//         }}
//       >
//         <div className="text-center bg-white bg-opacity-50 p-8 rounded text-black">
//           <h1 className="text-4xl font-bold mb-4">Explore the World With Us</h1>
//           <p className="text-xl mb-6">
//             Discover amazing destinations with our curated travel experiences
//           </p>
//           <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
//             Book Now
//           </button>
//         </div>
//       </div>

//       {/* Popular Destinations */}
//       <div className="container bg-blue-200 py-12 px-2">
//         <h2 className="text-3xl font-bold text-center mb-8">
//           Popular Destinations
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {[
//             { name: "Pokhara, Nepal", price: "RS 25,000", image: "https://media.istockphoto.com/id/1844319912/photo/pokhara-phewa-lake.jpg?s=612x612&w=0&k=20&c=GiC5EAyWUpkOhX36t1qRSJot8r6ZMczQYsjO3Q3Wpdo=" },
//             { name: "Kathmandu, Nepal", price: "RS 15,000", image: "https://cdn.kimkim.com/files/a/content_articles/featured_photos/4a8eeecd5c9854938f39e98a5144100052e91af8/medium-56421a1c8d25ba4943cea3ca141450a3.jpg" },
//             { name: "Chitwan, Nepal", price: "RS 20,000", image: "https://media.app.nepalguidetrekking.com/uploads/media/Sunset-Chitwan.jpg" }
//           ].map((dest, index) => (
//             <div key={index} className="rounded-lg overflow-hidden shadow-lg">
//               <Image
//                 src={dest.image}
//                 alt={dest.name}
//                 width={400}
//                 height={250}
//                 className="w-full h-48 object-cover"
//                 unoptimized
//               />
//               <div className="p-4">
//                 <h3 className="font-bold text-xl mb-2">{dest.name}</h3>
//                 <p className="text-gray-600 mb-2">7 Days Tour</p>
//                 <div className="flex justify-between items-center">
//                   <span className="text-blue-500 font-bold">{dest.price}</span>
//                   <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-blue-400 text-white py-8">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">Ghum Gham</h3>
//               <p>Making your travel dreams come true since 2025.</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//               <ul>
//                 {["Home", "Destinations", "Packages", "Contact Us"].map(
//                   (item, index) => (
//                     <li key={index} className="mb-2">
//                       <Link href="#" className="hover:text-blue-300">
//                         {item}
//                       </Link>
//                     </li>
//                   )
//                 )}
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Contact</h3>
//               <p className="mb-2">Email: info@ghumgham.com</p>
//               <p className="mb-2">Phone: 9841714584</p>
//               <p>Address: Naxal, Kathmandu</p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }

"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-menu")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center relative">
        <div className="text-2xl font-bold">Ghum Gham</div>
        <div className="hidden md:flex space-x-4">
          {["Home", "Our Offer", "Booking", "FAQ"].map((item, index) => (
            <Link key={index} href="#" className="hover:text-blue-200">
              {item}
            </Link>
          ))}
        </div>
        <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-blue-600 flex flex-col items-center md:hidden">
            {["Home", "Our Offer", "Booking", "FAQ"].map((item, index) => (
              <Link key={index} href="#" className="p-4 w-full text-center hover:bg-blue-500">
                {item}
              </Link>
            ))}
          </div>
        )}
        <div className="relative dropdown-menu">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="bg-white text-blue-500 px-4 py-2 rounded">
            Login
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
              {["User Login", "User Sign Up", "Admin Login", "Admin Sign Up", "Bus Operator Login", "Bus Operator Sign Up"].map((item, index) => (
                <Link key={index} href={`/${item.toLowerCase().replace(/ /g, "")}`} className="block px-4 py-2 hover:bg-blue-100">
                  {item}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-cover bg-center h-96 flex items-center justify-center bg-[url('https://t4.ftcdn.net/jpg/11/73/13/91/360_F_1173139101_AbqKhhBFCVfxTKtB0SfNZVlghvtbFuSO.jpg')]">
        <div className="text-center bg-white bg-opacity-50 p-8 rounded">
          <h1 className="text-4xl font-bold">Explore the World With Us</h1>
          <p className="text-xl">Discover amazing destinations with curated travel experiences.</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">Book Now</button>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="bg-blue-200 py-12 px-4">
        <h2 className="text-3xl font-bold text-center">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[{ name: "Pokhara, Nepal", price: "RS 25,000", image: "https://media.istockphoto.com/id/1844319912/photo/pokhara-phewa-lake.jpg" },
            { name: "Kathmandu, Nepal", price: "RS 15,000", image: "https://cdn.kimkim.com/files/a/content_articles/featured_photos/4a8eeecd5c9854938f39e98a5144100052e91af8.jpg" },
            { name: "Chitwan, Nepal", price: "RS 20,000", image: "https://media.app.nepalguidetrekking.com/uploads/media/Sunset-Chitwan.jpg" }].map((dest, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg">
              <Image src={dest.image} alt={dest.name} width={400} height={250} className="w-full h-48 object-cover" unoptimized />
              <div className="p-4">
                <h3 className="text-xl font-bold">{dest.name}</h3>
                <p className="text-gray-600">7 Days Tour</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-500 font-bold">{dest.price}</span>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-400 text-white py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold">Ghum Gham</h3>
            <p>Making travel dreams come true since 2025.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            {["Home", "Destinations", "Packages", "Contact Us"].map((item, index) => (
              <Link key={index} href="#" className="block hover:text-blue-300">{item}</Link>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <p>Email: info@ghumgham.com</p>
            <p>Phone: 9841714584</p>
            <p>Address: Naxal, Kathmandu</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p>Subscribe for travel updates</p>
            <div className="flex mt-2">
              <input type="email" placeholder="Your Email" className="p-2 rounded-l text-black w-full" />
              <button className="bg-blue-500 px-4 py-2 rounded-r">Subscribe</button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}