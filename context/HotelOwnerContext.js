"use client";
import { createContext, useState, useContext } from "react";
import { supabase } from '../supabase/supabaseClient';

const HotelOwnerContext = createContext();


export const HotelOwnerProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);

  // 🔄 Fetch hotels owned by the logged-in user
  const fetchHotels = async () => {
    // const user = supabase.auth.getUser();

     const { data: user, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    console.error("User not authenticated or error fetching user", userError);
    return;
  }

    console.log("user from hotel auth", user.user.id);
    if (!user) return;

    const { data, error } = await supabase
      .from("hotels")
      .select("*")
      .eq("hotel_owner_id", user.user.id);


      console.log("hotels data", data);

    if (error) {
      console.error("Error fetching hotels:", JSON.stringify(error, null, 2));

    } else {
      setHotels(data || []);
    }
  };

  // ➕ Add a new hotel
  const addHotel = async (newHotel) => {
    
     const { data: user, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    console.error("User not authenticated or error fetching user", userError);
    return;
  }

    const { data, error } = await supabase
      .from("hotels")
      .insert([
        {
          ...newHotel,
          hotel_owner_id: user.user.id,
        },
      ])
      .select();

    if (error) {
      console.error("Error adding hotel:", error);
    } else {
      setHotels([...hotels, data[0]]);
    }
  };

  const updateHotel = async (id, updatedData) => {
    const { data, error } = await supabase
      .from("hotels")
      .update(updatedData)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating hotel:", error);
    } else {
      setHotels(hotels.map((hotel) => (hotel.id === id ? data[0] : hotel)));
    }
  };

  // ❌ Delete hotel by ID
  const deleteHotel = async (id) => {
    const { error } = await supabase.from("hotels").delete().eq("id", id);

    if (error) {
      console.error("Error deleting hotel:", error);
    } else {
      setHotels(hotels.filter((hotel) => hotel.id !== id));
    }
  };

  return (
    <HotelOwnerContext.Provider
      value={{
        hotels,
        fetchHotels,
        addHotel,
        updateHotel,
        deleteHotel,
      }}
    >
      {children}
    </HotelOwnerContext.Provider>
  );
};


export const useHotelOwnerContext = () => useContext(HotelOwnerContext);