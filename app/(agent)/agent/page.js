"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/supabase/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function AgentDashboard() {
  const { user, signOut } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({ customer: "", from: "", to: "", date: "", seats: 1 });
  const [commission, setCommissions] = useState([]);
  const [offers, setOffers] = useState([]);
  const [offerDetails, setOfferDetails] = useState("");
  const [offerUserId, setOfferUserId] = useState("");

  const [hotels, setHotels] = useState([]);
  const [buses, setBuses] = useState([]);
  const [showHotelDialog, setShowHotelDialog] = useState(false);
  const [showBusDialog, setShowBusDialog] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [bookingUser, setBookingUser] = useState({ name: "", contact: "" });
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [bookedHotelIds, setBookedHotelIds] = useState({});

  useEffect(() => {
    if (user) {
      fetchCommissions();
      fetchOffers();
      fetchHotels();
      fetchBuses();
      fetchBookedHotels();
      fetchNotifications();
    }
  }, [user]);

  const fetchCommissions = async () => {
    const { data, error } = await supabase
      .from("commissions")
      .select("*")
      .eq("agent_id", user.id);
    if (!error) setCommissions(data || []);
  };

  const fetchOffers = async () => {
    const { data, error } = await supabase
      .from("special_offers")
      .select("*")
      .eq("agent_id", user.id);
    if (!error) setOffers(data || []);
  };

  const fetchHotels = async () => {
    const { data, error } = await supabase.from("hotels").select("*");
    if (!error) setHotels(data || []);
  };

  const fetchBuses = async () => {
    const { data, error } = await supabase.from("buses").select("*");
    if (!error) setBuses(data || []);
  };

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("recipient_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching notifications:", error.message);
    } else {
      setNotifications(data || []);
    }
  };

  const fetchBookedHotels = async () => {
    const { data, error } = await supabase
      .from("hotel_bookings")
      .select("hotel_id")
      .in("status", ["Pending", "Approved"]);
    if (!error && data) {
      const ids = {};
      data.forEach((b) => {
        ids[b.hotel_id] = true;
      });
      setBookedHotelIds(ids);
    }
  };

  const handleChange = (e) => {
    setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
  };

  const handleSetOffer = async () => {
    if (!offerUserId || !offerDetails) return;
    await supabase.from("special_offers").insert({
      agent_id: user.id,
      user_id: offerUserId,
      offer_details: { text: offerDetails },
      valid_until: new Date(new Date().setDate(new Date().getDate() + 7)),
    });
    setOfferDetails("");
    setOfferUserId("");
    fetchOffers();
  };

  const openHotelDialog = (hotel) => {
    setSelectedHotel(hotel);
    setBookingUser({ name: "", contact: "" });
    setShowHotelDialog(true);
  };

  const openBusDialog = (bus) => {
    setSelectedBus(bus);
    setBookingUser({ name: "", contact: "" });
    setShowBusDialog(true);
  };

  const closeDialogs = () => {
    setShowHotelDialog(false);
    setShowBusDialog(false);
    setSelectedHotel(null);
    setSelectedBus(null);
    setBookingUser({ name: "", contact: "" });
  };

  const handleBookHotelForUser = async () => {
    if (!selectedHotel || !bookingUser.name || !bookingUser.contact) return;

    const { data: booking, error } = await supabase
      .from("hotel_bookings")
      .insert({
        user_id: null,
        hotel_id: selectedHotel.id,
        room_type: selectedHotel.room_type || "Standard",
        check_in: new Date().toISOString().split("T")[0],
        check_out: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
        status: "Pending",
        agent_id: user.id,
        customer_name: bookingUser.name,
        customer_contact: bookingUser.contact,
      })
      .select()
      .single();

    if (error) {
      alert("Booking failed: " + error.message);
      return;
    }

    const { data: hotelData, error: hotelError } = await supabase
      .from("hotels")
      .select("hotel_owner_id")
      .eq("id", selectedHotel.id)
      .single();

    if (hotelError) {
      alert("Booking succeeded, but failed to notify hotel owner: " + hotelError.message);
      closeDialogs();
      fetchBookedHotels();
      return;
    }

    await supabase.from("notifications").insert({
      recipient_id: hotelData.hotel_owner_id,
      booking_id: booking.id,
      type: "hotel",
      message: `Booking requested by agent for ${selectedHotel.name} (Customer: ${bookingUser.name})`,
    });

    closeDialogs();
    fetchBookedHotels();
  };

  const handleBookBusForUser = async () => {
    setBookings([
      ...bookings,
      {
        id: Date.now(),
        customer: bookingUser.name,
        contact: bookingUser.contact,
        bus: selectedBus.name,
        type: "bus",
      },
    ]);
    closeDialogs();
  };

  const handleRejectBooking = async (bookingId, hotelId) => {
    const { error } = await supabase
      .from("hotel_bookings")
      .update({ status: "Rejected" })
      .eq("id", bookingId);

    if (error) {
      alert("Error rejecting booking: " + error.message);
    } else {
      setBookedHotelIds((prev) => {
        const updated = { ...prev };
        delete updated[hotelId];
        return updated;
      });
      fetchBookedHotels();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      {/* Your full JSX content remains unchanged */}
      {/* Just ensure that inside JSX, template literals like className and message use correct syntax like `...` */}
    </div>
  );
}
