"use client";

import { useState } from 'react';

export default function Home() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1 justify-center">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="text-gray-900">EasyTrip.com</span>
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#" className="text-sm font-semibold text-gray-900">About Us</a>
            <a href="#" className="text-sm font-semibold text-gray-900">Contact Us</a>
            <a href="#" className="text-sm font-semibold text-gray-900">Reviews</a>
            <a href="#" className="text-sm font-semibold text-gray-900">Company</a>
          </div>
          
          {/* Dropdown for login */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end group relative">
            <a href="#" className="text-sm font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
            <div className="absolute hidden mt-2 w-48 bg-white shadow-lg rounded-lg group-hover:block">
              <div className="py-2">
                <a
                  href="/agent/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Agent Login
                </a>
                <a
                  href="/user/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  User Login
                </a>
                <a
                  href="/busoperator/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Bus Operator Login
                </a>

                <a
                  href="/hotelowner/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Hotel owner Login
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <section className="relative bg-gray-50 py-16 sm:py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Find Your Next Trip with EasyTrip
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Search and book your next vacation with ease. Discover the best deals, destinations, and experiences tailored just for you.
          </p>
          
          <form className="mt-8 max-w-md mx-auto">
            <div className="flex justify-center">
              <div className="relative w-full">
                <input
                  type="text"
                  id="location-search"
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
          </form>
        </div>
      </section>

      {/* Hotel List */}
      <section className="bg-white py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Top Hotels</h2>
          <p className="mt-4 text-lg text-gray-600">Explore the best hotels and book your stay now!</p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Hotel 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://media-cdn.tripadvisor.com/media/photo-s/29/55/12/10/pokhara-boutique-hotel.jpg"/>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">Hotel Ocean View</h3>
                <p className="text-sm text-gray-500 mt-2">A stunning hotel by the ocean with panoramic views.</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-semibold text-gray-900">$250/night</span>
                  <span className="text-sm text-gray-500">Miami, FL</span>
                </div>
              </div>
            </div>

            {/* Hotel 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQskozQPbD6emQTHBe0pNdj5tF_Pd8dteWsBQ&s" alt="Hotel 2" className="w-full h-56 object-cover"/>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">Mountain Retreat</h3>
                <p className="text-sm text-gray-500 mt-2">A serene getaway nestled in the heart of the mountains.</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-semibold text-gray-900">$180/night</span>
                  <span className="text-sm text-gray-500">Aspen, CO</span>
                </div>
              </div>
            </div>

            {/* Hotel 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRww8AmUnjRzXgjZPabKl7hBBUn_y_nTw_GnQ&s" alt="Hotel 3" className="w-full h-56 object-cover"/>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">City Lights Hotel</h3>
                <p className="text-sm text-gray-500 mt-2">A luxury hotel in the heart of the city with modern amenities.</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-semibold text-gray-900">$350/night</span>
                  <span className="text-sm text-gray-500">New York, NY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Bus Routes Section */}
       <section className="bg-white py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Popular Bus Routes</h2>
          <p className="mt-4 text-lg text-gray-600">Check out the most traveled bus routes and book your journey now!</p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Route 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">Kathmandu to Pokhara</h3>
                <p className="text-sm text-gray-500 mt-2">A scenic ride through the Himalayan foothills.</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-semibold text-gray-900">$15</span>
                  <span className="text-sm text-gray-500">9:00 AM</span>
                </div>
              </div>
            </div>

            {/* Route 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">Kathmandu to Chitwan</h3>
                <p className="text-sm text-gray-500 mt-2">Experience the natural beauty of Chitwan National Park.</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-semibold text-gray-900">$20</span>
                  <span className="text-sm text-gray-500">7:00 AM</span>
                </div>
              </div>
            </div>

            {/* Route 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">Kathmandu to Lumbini</h3>
                <p className="text-sm text-gray-500 mt-2">A spiritual journey to the birthplace of Lord Buddha.</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-semibold text-gray-900">$25</span>
                  <span className="text-sm text-gray-500">10:00 AM</span>
                </div>
              </div>
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