"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useHotelOwnerContext } from "@/context/HotelOwnerContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabaseClient";

export default function HotelOwnerDashboard() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { hotels, fetchHotels, addHotel, updateHotel, deleteHotel } = useHotelOwnerContext();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    room_type: "Standard",
    images: [],
  });
  const [errors, setErrors] = useState({});
  const [editingHotelId, setEditingHotelId] = useState(null);
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [noHotelsMessage, setNoHotelsMessage] = useState("");

  useEffect(() => {
    if (user === false) {
      router.push("/hotelowner/login");
    } else if (user) {
      const fetchAllData = async () => {
        try {
          const [hotelsResult, notificationsResult, hotelIdsResult] = await Promise.all([
            fetchHotels().catch(err => {
              console.error("fetchHotels error:", err);
              return { error: err, data: [] };
            }),
            supabase
              .from("notifications")
              .select("id, message, is_read, created_at")
              .eq("recipient_id", user.id)
              .order("created_at", { ascending: false }),
            supabase
              .from("hotels")
              .select("id")
              .eq("hotel_owner_id", user.id),
          ]);

          setLoadingNotifications(true);
          if (notificationsResult.error) {
            console.error("Error fetching notifications:", notificationsResult.error.message);
            setNotifications([]);
          } else {
            setNotifications(notificationsResult.data || []);
          }
          setLoadingNotifications(false);

          setLoadingBookings(true);
          const hotelIds = (hotelIdsResult.data || []).map(h => h.id);
          if (hotelIds.length) {
            const { data: bookingsData, error: bookingsError } = await supabase
              .from("hotel_bookings")
              .select(`
                id,
                user_id,
                hotel_id,
                room_type,
                check_in,
                check_out,
                status,
                agent_id,
                customer_name,
                customer_contact,
                created_at,
                users!hotel_bookings_user_id_fkey(full_name),
                hotels(name)
              `)
              .in("hotel_id", hotelIds)
              .order("created_at", { ascending: false });

            if (bookingsError) {
              console.error("Error fetching bookings:", bookingsError.message);
              setBookings([]);
            } else {
              setBookings(bookingsData || []);
            }
          } else {
            setNoHotelsMessage("No hotels found. Add a hotel to view bookings.");
            setBookings([]);
          }
          setLoadingBookings(false);
        } catch (error) {
          console.error("Error in fetchAllData:", error.message);
          setLoadingBookings(false);
          setLoadingNotifications(false);
        }
      };

      fetchAllData();
    }
  }, [user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
    setErrors({ ...errors, images: "" });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Enter hotel name";
    if (!formData.location.trim()) newErrors.location = "Enter location";
    if (!formData.price.trim()) newErrors.price = "Enter price";
    if (!formData.description.trim()) newErrors.description = "Enter description";
    if (!formData.room_type) newErrors.room_type = "Select a room type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddHotel = async () => {
    if (!validateFields()) return;

    try {
      const imageUrls = [];
      for (const [index, file] of formData.images.entries()) {
        const fileName = `hotel-${Date.now()}-${index}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(fileName, file, { contentType: file.type });
        if (uploadError) {
          setErrors({ ...errors, images: `Image upload failed: ${uploadError.message}` });
          return;
        }

        const { data } = supabase.storage.from("images").getPublicUrl(fileName);
        imageUrls.push(data.publicUrl);
      }

      await addHotel({
        name: formData.name,
        location: formData.location,
        price: parseFloat(formData.price),
        description: formData.description,
        room_type: formData.room_type,
        hotel_owner_id: user.id,
        images: imageUrls,
      });

      setFormData({ name: "", location: "", price: "", description: "", room_type: "Standard", images: [] });
      setNoHotelsMessage("");
      setIsHotelModalOpen(false);
    } catch (error) {
      setErrors({ ...errors, general: `Failed to add hotel: ${error.message}` });
    }
  };

  const handleEditHotel = (hotel) => {
    setEditingHotelId(hotel.id);
    setFormData({
      name: hotel.name,
      location: hotel.location,
      price: hotel.price.toString(),
      description: hotel.description || "",
      room_type: hotel.room_type || "Standard",
      images: [],
    });
    setIsHotelModalOpen(true);
  };

  const handleUpdateHotel = async () => {
    if (!validateFields()) return;

    try {
      const imageUrls = [];
      for (const [index, file] of formData.images.entries()) {
        const fileName = `hotel-${Date.now()}-${index}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(fileName, file, { contentType: file.type });
        if (uploadError) {
          setErrors({ ...errors, images: `Image upload failed: ${uploadError.message}` });
          return;
        }

        const { data } = supabase.storage.from("images").getPublicUrl(fileName);
        imageUrls.push(data.publicUrl);
      }

      let finalImages = imageUrls;
      if (imageUrls.length === 0 && editingHotelId) {
        const { data: hotel } = await supabase
          .from("hotels")
          .select("images")
          .eq("id", editingHotelId)
          .single();
        finalImages = hotel.images || [];
      }

      await updateHotel(editingHotelId, {
        name: formData.name,
        location: formData.location,
        price: parseFloat(formData.price),
        description: formData.description,
        room_type: formData.room_type,
        hotel_owner_id: user.id,
        images: finalImages,
      });

      setFormData({ name: "", location: "", price: "", description: "", room_type: "Standard", images: [] });
      setEditingHotelId(null);
      setIsHotelModalOpen(false);
    } catch (error) {
      setErrors({ ...errors, general: `Failed to update hotel: ${error.message}` });
    }
  };

  const handleDeleteHotel = async (id) => {
    await deleteHotel(id);
    if (hotels.length === 1) {
      setNoHotelsMessage("No hotels found. Add a hotel to view bookings.");
      setBookings([]);
    }
  };

  const handleApproveBooking = async (bookingId, userId, agentId, hotelName) => {
    const { error } = await supabase
      .from("hotel_bookings")
      .update({ status: "Approved" })
      .eq("id", bookingId);

    if (error) {
      console.error("Error approving booking:", error.message);
      return;
    }

    const recipientId = userId || agentId;
    if (recipientId) {
      const { error: notificationError } = await supabase
        .from("notifications")
        .insert({
          recipient_id: recipientId,
          booking_id: bookingId,
          type: "hotel",
          message: `Your booking for ${hotelName} has been approved.`,
        });
      if (notificationError) {
        console.error("Error sending approval notification:", notificationError.message);
      }
    }

    const { data: hotelIdsData } = await supabase
      .from("hotels")
      .select("id")
      .eq("hotel_owner_id", user.id);
    const hotelIds = (hotelIdsData || []).map(h => h.id);
    const { data, error: bookingsError } = await supabase
      .from("hotel_bookings")
      .select(`
        id,
        user_id,
        hotel_id,
        room_type,
        check_in,
        check_out,
        status,
        agent_id,
        customer_name,
        customer_contact,
        created_at,
        users!hotel_bookings_user_id_fkey(full_name),
        hotels(name)
      `)
      .in("hotel_id", hotelIds)
      .order("created_at", { ascending: false });

    if (bookingsError) {
      console.error("Error refetching bookings:", bookingsError.message);
      setBookings([]);
    } else {
      setBookings(data || []);
    }
  };

  const handleRejectBooking = async (bookingId, userId, agentId, hotelName) => {
    const { error } = await supabase
      .from("hotel_bookings")
      .update({ status: "Rejected" })
      .eq("id", bookingId);

    if (error) {
      console.error("Error rejecting booking:", error.message);
      return;
    }

    const recipientId = userId || agentId;
    if (recipientId) {
      const { error: notificationError } = await supabase
        .from("notifications")
        .insert({
          recipient_id: recipientId,
          booking_id: bookingId,
          type: "hotel",
          message: `Your booking for ${hotelName} has been rejected.`,
        });
      if (notificationError) {
        console.error("Error sending rejection notification:", notificationError.message);
      }
    }

    const { data: hotelIdsData } = await supabase
      .from("hotels")
      .select("id")
      .eq("hotel_owner_id", user.id);
    const hotelIds = (hotelIdsData || []).map(h => h.id);
    const { data, error: bookingsError } = await supabase
      .from("hotel_bookings")
      .select(`
        id,
        user_id,
        hotel_id,
        room_type,
        check_in,
        check_out,
        status,
        agent_id,
        customer_name,
        customer_contact,
        created_at,
        users!hotel_bookings_user_id_fkey(full_name),
        hotels(name)
      `)
      .in("hotel_id", hotelIds)
      .order("created_at", { ascending: false });

    if (bookingsError) {
      console.error("Error refetching bookings:", bookingsError.message);
      setBookings([]);
    } else {
      setBookings(data || []);
    }
  };

  const handleCancelHotelForm = () => {
    setFormData({ name: "", location: "", price: "", description: "", room_type: "Standard", images: [] });
    setErrors({});
    setEditingHotelId(null);
    setIsHotelModalOpen(false);
  };

	
const checkBooking = async () => {
setBookings([]);
 const { data, error: bookingsError } = await supabase
      .from("hotel_bookings")
      .select(`
        id,
        user_id,
        hotel_id,
        room_type,
        check_in,
        check_out,
        status,
        agent_id,
        customer_name,
        customer_contact,
        created_at,
        users!hotel_bookings_user_id_fkey(full_name),
        hotels(name)
      `)
      .in("hotel_id", hotelIds)
      .order("created_at", { ascending: false });
}


const uncheck = async () => {
setBookings([]);
 const { data, error: bookingsError } = await supabase
      .from("hotel_bookings")
      .select(`
        id,
        user_id,
        hotel_id,
        room_type,
        check_in,
        check_out,
        status,
        agent_id,
        customer_name,
        customer_contact,
        created_at,
        users!hotel_bookings_user_id_fkey(full_name),
        hotels(name)
      `)
      .in("hotel_id", hotelIds)
      .order("created_at", { ascending: false });
}
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-indigo-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-sm font-medium">
                Welcome, {user.user_metadata?.full_name || "Hotel Owner"}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative flex items-center text-sm font-medium hover:text-indigo-200 transition-colors focus:outline-none"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                Notifications
                {notifications.some((n) => !n.is_read) && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {notifications.filter((n) => !n.is_read).length}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-10 p-4 animate-fade-in">
                  <h2 className="text-sm font-semibold text-gray-900 mb-3">Notifications</h2>
                  {loadingNotifications ? (
                    <p className="text-gray-600 text-sm">Loading notifications...</p>
                  ) : notifications.length === 0 ? (
                    <p className="text-gray-600 text-sm">No notifications</p>
                  ) : (
                    <ul className="max-h-64 overflow-y-auto space-y-2 text-sm">
                      {notifications.map((notification) => (
                        <li key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.is_read ? "Read" : "Unread"} •{" "}
                            {new Date(notification.created_at).toLocaleDateString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <a href="#bookings" className="text-sm font-medium hover:text-indigo-200 transition-colors">
              Bookings
            </a>
            <button
              onClick={signOut}
              className="text-sm font-medium hover:text-indigo-200 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Add Hotel Button */}
        <div className="mb-8">
          <button
            onClick={() => setIsHotelModalOpen(true)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Hotel
          </button>
        </div>

        {/* Hotel Form Modal */}
        {isHotelModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {editingHotelId ? "Edit Hotel" : "Add Hotel"}
              </h2>
              {errors.general && (
                <p className="text-red-500 text-sm mb-4">{errors.general}</p>
              )}
              <div className="space-y-4">
                <div>
                  <input
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Hotel Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                  )}
                </div>
                <div>
                  <input
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Type
                  </label>
                  <select
                    name="room_type"
                    value={formData.room_type}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                  {errors.room_type && (
                    <p className="text-red-500 text-sm mt-1">{errors.room_type}</p>
                  )}
                </div>
                <div>
                  <textarea
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {formData.images.length > 0 && (
                    <p className="mt-2 text-sm text-gray-600">
                      {formData.images.length} image(s) selected
                    </p>
                  )}
                  {errors.images && (
                    <p className="text-red-500 text-sm mt-1">{errors.images}</p>
                  )}
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCancelHotelForm}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingHotelId ? handleUpdateHotel : handleAddHotel}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {editingHotelId ? "Update Hotel" : "Save Hotel"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hotel List */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hotel List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.length === 0 ? (
              <p className="text-gray-600 col-span-full">No hotels found. Add a hotel to get started.</p>
            ) : (
              hotels.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <img
                    src={hotel.images?.[0] || "https://via.placeholder.com/400x200?text=No+Image"}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{hotel.name}</h3>
                    <div className="flex items-center gap-1.5 mt-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-sm text-gray-600">{hotel.location}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Price: ${hotel.price}</p>
                    <p className="text-sm text-gray-600 mt-1">Room Type: {hotel.room_type || "Standard"}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">Description: {hotel.description || "N/A"}</p>
                    {hotel.images && hotel.images.length > 0 && (
                      <p className="text-sm text-gray-600 mt-1">Images: {hotel.images.length} uploaded</p>
                    )}
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleEditHotel(hotel)}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 text-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteHotel(hotel.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Hotel Bookings Section */}
        <section id="bookings" className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Bookings</h2>
          {loadingBookings ? (
            <p className="text-gray-600">Loading bookings...</p>
          ) : noHotelsMessage ? (
            <p className="text-gray-600">{noHotelsMessage}</p>
          ) : bookings.length === 0 ? (
            <p className="text-gray-600">No bookings available for your hotels.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div className="flex-1">
                      <div className="text-lg font-semibold text-gray-800">
                        {b.customer_name || b.users?.full_name || "Unknown User"}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        booked <span className="font-medium">{b.room_type}</span> at{" "}
                        <span className="font-medium">{b.hotels?.name || "Unknown Hotel"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Check-in: <span className="font-medium">{b.check_in}</span> | Check-out:{" "}
                        <span className="font-medium">{b.check_out}</span>
                      </div>
                      <div className="text-sm mt-2">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                            b.status.toLowerCase() === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : b.status.toLowerCase() === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                    </div>
                    {b.status.toLowerCase() === "pending" && (
                      <div className="mt-4 md:mt-0 md:ml-6 flex space-x-2">
                        <button
                          onClick={() =>
                            handleApproveBooking(
                              b.id,
                              b.user_id,
                              b.agent_id,
                              b.hotels?.name || "Unknown Hotel"
                            )
                          }
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleRejectBooking(
                              b.id,
                              b.user_id,
                              b.agent_id,
                              b.hotels?.name || "Unknown Hotel"
                            )
                          }
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}