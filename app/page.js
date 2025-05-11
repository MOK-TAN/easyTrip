


// "use client";

// import { useState } from 'react';
// import Link from 'next/link';

// export default function Home() {

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <div className="bg-white">





//       <header className="absolute inset-x-0 top-0 z-50">
//         <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
//           <div className="flex lg:flex-1 justify-center">
//             <a href="/" className="-m-1.5 p-1.5">
//               <span className="text-gray-900">EasyTrip.com</span>
//             </a>
//           </div>
//           <div className="hidden lg:flex lg:gap-x-12">
//             <a href="/about" className="text-sm font-semibold text-gray-900">About Us</a>
//             <a href="/contact" className="text-sm font-semibold text-gray-900">Contact Us</a>
//             <a href="#" className="text-sm font-semibold text-gray-900">Reviews</a>
//             <a href="#" className="text-sm font-semibold text-gray-900">Company</a>
//           </div>
          
//           {/* Dropdown for login */}
//           <div className="hidden lg:flex lg:flex-1 lg:justify-end group relative">
//             <a href="#" className="text-sm font-semibold text-gray-900">
//               Log in <span aria-hidden="true">&rarr;</span>
//             </a>
//             <div className="absolute hidden mt-2 w-48 bg-white shadow-lg rounded-lg group-hover:block">
//               <div className="py-2">
//                 <a
//                   href="/agent/login"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   Agent Login
//                 </a>
//                 <a
//                   href="/user/login"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   User Login
//                 </a>
//                 <a
//                   href="/busoperator/login"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   Bus Operator Login
//                 </a>

//                 <a
//                   href="/hotelowner/login"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   Hotel owner Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>

//       <section className="relative bg-gray-50 py-16 sm:py-24 lg:py-40">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
//             Find Your Next Trip with EasyTrip
//           </h2>
//           <p className="mt-4 text-lg text-gray-600">
//             Search and book your next vacation with ease. Discover the best deals, destinations, and experiences tailored just for you.
//           </p>
          
//           <form className="mt-8 max-w-md mx-auto">
//             <div className="flex justify-center">
//               <div className="relative w-full">
//                 <input
//                   type="text"
//                   id="location-search"
//                   className="block w-full py-3 pl-4 pr-12 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                   placeholder="Enter a destination"
//                 />
//                 <button
//                   type="submit"
//                   className="absolute top-0 right-0 px-4 py-3 text-sm font-medium text-white bg-indigo-600 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   Search
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </section>

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  // const [query, setQuery] = useState('');
  // const [suggestions, setSuggestions] = useState([]);
  // const router = useRouter();

  // const destinations = ['Pokhara', 'Kathmandu', 'Lumbini', 'Chitwan', 'Bhaktapur'];

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setQuery(value);
  //   if (value.length > 0) {
  //     const filtered = destinations.filter((d) =>
  //       d.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setSuggestions(filtered);
  //   } else {
  //     setSuggestions([]);
  //   }
  // };

  // const handleSelect = (destination) => {
  //   setQuery(destination);
  //   setSuggestions([]);
  //   router.push('/user/login');
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (query.trim()) {
  //     router.push('/user/login');
  //   }
  // };

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

const destinations = [
  { name: 'Pokhara', hotels: 5, bus: 3 },
  { name: 'Kathmandu', hotels: 10, bus: 4 },
  { name: 'Lumbini', hotels: 4, bus: 2 },
  { name: 'Chitwan', hotels: 6, bus: 2 },
  { name: 'Bhaktapur', hotels: 3, bus: 1 },
  { name: 'Biratnagar', hotels: 7, bus: 3 },
  { name: 'Butwal', hotels: 5, bus: 2 },
  { name: 'Dharan', hotels: 6, bus: 3 },
  { name: 'Nepalgunj', hotels: 4,  bus: 2 },
  { name: 'Hetauda', hotels: 3, bus: 2 },
  { name: 'Itahari', hotels: 4, bus: 2 },
  { name: 'Janakpur', hotels: 5, bus: 3 },
  { name: 'Birgunj', hotels: 6, bus: 4 },
  { name: 'Tansen', hotels: 2, bus: 1 },
  { name: 'Dhangadhi', hotels: 4, bus: 2 },
  { name: 'Bharatpur', hotels: 5, bus: 2 },
  { name: 'Gorkha', hotels: 2, bus: 1 },
  { name: 'Damak', hotels: 3, bus: 2 },
  { name: 'Banepa', hotels: 2, bus: 1 },
  { name: 'Panauti', hotels: 1, bus: 1 }
];

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setError('');
    if (value.length > 0) {
      const filtered = destinations.filter((d) =>
        d.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (destination) => {
    setQuery(destination.name);
    setSuggestions([]);
    setError('');
    router.push('/user/login');
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (query.trim()) {
  //     setError('');
  //     router.push('/user/login');
  //   } else {
  //     setError('Please enter something');
  //   }
  // };

    const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    const validPattern = /^[a-zA-Z\s]+$/;

    if (!trimmedQuery) {
      setError('Please enter something');
    } else if (!validPattern.test(trimmedQuery)) {
      setError('Invalid characters entered');
      setQuery('');
      setSuggestions([]);
    } else {
      setError('');
      router.push('/user/login');
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1 justify-center">
            <Link href="/" className="-m-1.5 p-1.5 text-gray-900">EasyTrip.com</Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link href="/about" className="text-sm font-semibold text-gray-900">About Us</Link>
            <Link href="/contact" className="text-sm font-semibold text-gray-900">Contact Us</Link>
            <Link href="#" className="text-sm font-semibold text-gray-900">Reviews</Link>
            <Link href="#" className="text-sm font-semibold text-gray-900">Company</Link>
          </div>
          {/* Login Dropdown */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end group relative">
            <span className="text-sm font-semibold text-gray-900 cursor-pointer">
              Log in and Sign up <span aria-hidden="true">&rarr;</span>
            </span>
            <div className="absolute hidden mt-2 w-48 bg-white shadow-lg rounded-lg group-hover:block">
              <div className="py-2">
                {/* <Link href="/agent/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Agent Login</Link> */}
                <Link href="/user/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">User Login</Link>
                <Link href="/busoperator/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Bus Operator Login</Link>
                <Link href="/hotelowner/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hotel Owner Login</Link>
              </div>

              <div className="py-2">
                {/* <Link href="/agent/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Agent Login</Link> */}
                <Link href="/user/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">User signup</Link>
                <Link href="/busoperator/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Bus Operator signup</Link>
                <Link href="/hotelowner/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hotel Owner signup</Link>
              </div>
            </div>
            

            
          </div>
        </nav>
      </header>





      {/* Hero Section with Search */}
      {/* <section className="relative bg-gray-50 py-16 sm:py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Find Your Next Trip with EasyTrip</h2>
          <p className="mt-4 text-lg text-gray-600">
            Search and book your next vacation with ease. Discover the best deals, destinations, and experiences tailored just for you.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto relative">
            <div className="flex justify-center">
              <div className="relative w-full">
                <input
                  type="text"
                  value={query}
                  onChange={handleChange}
                  className="block w-full py-3 pl-4 pr-12 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter a destination"
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 px-4 py-3 text-sm font-medium text-white bg-indigo-600 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Search
                </button>
              </div>
            </div>
            {suggestions.length > 0 && (
              <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSelect(item)}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>
      </section> */}

    <section className="relative bg-gray-50 py-16 sm:py-24 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Find Your Next Trip with EasyTrip</h2>
        <p className="mt-4 text-lg text-gray-600">
          Search and book your next vacation with ease. Discover the best deals, destinations, and experiences tailored just for you.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto relative">
          <div className="flex justify-center">
            <div className="relative w-full">
              <input
                type="text"
                value={query}
                onChange={handleChange}
                className={`block w-full py-3 pl-4 pr-12 text-sm border rounded-lg focus:outline-none ${
                  error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                }`}
                placeholder="Enter a destination"
              />
              <button
                type="submit"
                className="absolute top-0 right-0 px-4 py-3 text-sm font-medium text-white bg-indigo-600 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Search
              </button>
            </div>
          </div>
          {error && <p className="mt-2 text-sm text-red-600 text-left">{error}</p>}

          {suggestions.length > 0 && (
            <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto text-left">
              {suggestions.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 cursor-pointer"
                >
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">
                    Hotels: {item.hotels} · Bus: {item.bus}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </section>

    

{/* Hotel List */}
<section className="bg-white py-16 sm:py-24 lg:py-32">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Top Hotels</h2>
    <p className="mt-4 text-lg text-gray-600">Explore the best hotels and book your stay now!</p>

    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      
      {/* Hotel Card */}
      {[{
        name: "Hotel Ocean View",
        desc: "A stunning hotel by the ocean with panoramic views.",
        price: "$250/night",
        location: "Miami, FL",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/29/55/12/10/pokhara-boutique-hotel.jpg"
      }, {
        name: "Mountain Retreat",
        desc: "A serene getaway nestled in the heart of the mountains.",
        price: "$180/night",
        location: "Aspen, CO",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQskozQPbD6emQTHBe0pNdj5tF_Pd8dteWsBQ&s"
      }, {
        name: "City Lights Hotel",
        desc: "A luxury hotel in the heart of the city with modern amenities.",
        price: "$350/night",
        location: "New York, NY",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRww8AmUnjRzXgjZPabKl7hBBUn_y_nTw_GnQ&s"
      }].map((hotel, index) => (
        <Link href='/user/login'  key={index} className="transform transition duration-300 hover:scale-105">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl cursor-pointer">
            <img src={hotel.image} alt={hotel.name} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
              <p className="text-sm text-gray-500 mt-2">{hotel.desc}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-semibold text-gray-900">{hotel.price}</span>
                <span className="text-sm text-gray-500">{hotel.location}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>


{/* Bus Routes Section */}
<section className="bg-white py-16 sm:py-24 lg:py-32">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Popular Bus Routes</h2>
    <p className="mt-4 text-lg text-gray-600">
      Check out the most traveled bus routes and book your journey now!
    </p>

    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

      {/* Bus Routes */}
      {[
        {
          title: "Kathmandu to Pokhara",
          desc: "A scenic ride through the Himalayan foothills.",
          price: "$15",
          time: "9:00 AM"
        },
        {
          title: "Kathmandu to Chitwan",
          desc: "Experience the natural beauty of Chitwan National Park.",
          price: "$20",
          time: "7:00 AM"
        },
        {
          title: "Kathmandu to Lumbini",
          desc: "A spiritual journey to the birthplace of Lord Buddha.",
          price: "$25",
          time: "10:00 AM"
        }
      ].map((route, index) => (
        <Link href="/user/login" key={index}>
          <div className="transform transition duration-300 hover:scale-105 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl cursor-pointer">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">{route.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{route.desc}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-semibold text-gray-900">{route.price}</span>
                <span className="text-sm text-gray-500">{route.time}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>

      {/* Trust Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why Book With EasyTrip?</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Best Price Guarantee</h4>
              <p className="text-sm text-gray-600 mt-2">We offer the lowest prices available. Found a lower price? We’ll match it.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">24/7 Customer Support</h4>
              <p className="text-sm text-gray-600 mt-2">Our team is here to help you anytime, anywhere.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Secure Payment</h4>
              <p className="text-sm text-gray-600 mt-2">Pay safely using Khalti, eSewa, or your debit/credit card.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Verified Reviews</h4>
              <p className="text-sm text-gray-600 mt-2">Read honest feedback from real travelers before you book.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">What Our Travelers Say</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="text-gray-700 italic">"EasyTrip made our honeymoon seamless. We loved the hotel and the price!"</p>
              <p className="mt-4 font-semibold text-gray-900">- Sita & Ram</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="text-gray-700 italic">"Booking bus tickets and hotels from one site was very convenient."</p>
              <p className="mt-4 font-semibold text-gray-900">- Binod Thapa</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="text-gray-700 italic">"The payment options made me feel secure. Loved the experience!"</p>
              <p className="mt-4 font-semibold text-gray-900">- Anjali Gurung</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex flex-col space-y-4">
              <span className="text-lg font-semibold">EasyTrip.com</span>
              <p className="text-sm">Your travel partner for booking the best hotels, buses, and trips.</p>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="text-sm hover:text-gray-400">About Us</a>
              <a href="#" className="text-sm hover:text-gray-400">Contact</a>
              <a href="#" className="text-sm hover:text-gray-400">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-gray-400">Terms of Service</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; 2025 EasyTrip.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}




 // <div>
    //   <h4>OUR ROUTES </h4>
    //   <br />
    //   <h5>USER ROUTES</h5>
    //   <Link href='/user/signup'>User sign up</Link><br />
    //   <Link href='/user/login'>User login up</Link><br />

    //   <br />
    //   <h5>ADMIN ROUTES</h5>x  ``
    //   <Link href='/admin/signup'>Admin sign up</Link><br />
    //   <Link href='/admin/login'>Admin login up</Link><br />

    //   <br />
    //   <h5>AGENT ROUTES</h5>
    //   <Link href='/agent/signup'>Agent sign up</Link><br />
    //   <Link href='/agent/login'>Agent login up</Link><br />

    //   <br />
    //   <h5>BUS OPERATOR ROUTES</h5>
    //   <Link href='/busoperator/signup'>busoperator sign up</Link><br />
    //   <Link href='/busoperator/login'>busoperator login up</Link><br />

    //   <br />
    //   <h5>HOTEL OWNER ROUTES</h5>
    //   <Link href='/hotelowner/signup'>hotelowner sign up</Link><br />
    //   <Link href='/hotelowner/login'>hotelowner login up</Link><br />
    // </div>