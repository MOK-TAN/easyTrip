// context/BusOperatorContext.js
"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from '../supabase/supabaseClient';

const BusOperatorContext = createContext();

export const BusOperatorProvider = ({ children }) => {
  const [buses, setBuses] = useState([]);

  // Fetch buses from Supabase when the context is loaded
  const fetchBuses = async () => {
    const { data: user, error: userError } = await supabase.auth.getUser();
  
    if (userError || !user) {
      console.error("User not authenticated or error fetching user", userError);
      return;
    }

    console.log("user from bus operator auth", user.user.id);
    if(!user) return;

    const { data, error } = await supabase
      .from("buses")
      .select("*")
      .eq("bus_operator_id", user.user.id);  // Fetch buses for the current bus operator

    if (error) {
      console.error("Error fetching buses:", JSON.stringify(error, null, 2));
    } else {
      setBuses(data || []);
    }
  };

  // Add a new bus
  const addBus = async (newBus) => {
    const { data: user, error: userError } = await supabase.auth.getUser();
  
    if (userError || !user) {
      console.error("User not authenticated or error fetching user", userError);
      return;
    }

    const { data, error } = await supabase
      .from("buses")
      .insert([
        {
          ...newBus,
          bus_operator_id: user.user.id,  // Assign the logged-in user as the bus operator
        },
      ])
      .select();

    if (error) {
      console.error("Error adding bus:", error);
    } else {
      setBuses([...buses, data[0]]);
    }
  };

  // Update an existing bus
  const updateBus = async (busId, updatedBus) => {
    const { data, error } = await supabase
      .from("buses")
      .update(updatedBus)
      .eq("id", busId)
      .select();

    if (error) {
      console.error("Error updating bus:", error);
    } else {
      const updatedBuses = buses.map((bus) =>
        bus.id === busId ? { ...bus, ...data[0] } : bus
      );
      setBuses(updatedBuses);
    }
  };

  // Delete a bus
  const deleteBus = async (busId) => {
    const { error } = await supabase
      .from("buses")
      .delete()
      .eq("id", busId);

    if (error) {
      console.error("Error deleting bus:", error);
    } else {
      setBuses(buses.filter((bus) => bus.id !== busId));
    }
  };

  // Load buses when the component mounts
  // useEffect(() => {
  //   fetchBuses();
  // }, []);

  return (
    <BusOperatorContext.Provider value={{ buses,fetchBuses, addBus, updateBus, deleteBus }}>
      {children}
    </BusOperatorContext.Provider>
  );
};

export const useBusOperatorContext = () => useContext(BusOperatorContext);









// // context/BusOperatorContext.js
// import { createContext, useState, useContext } from "react";

// const BusOperatorContext = createContext();

// export const BusOperatorProvider = ({ children }) => {
//   const [buses, setBuses] = useState([
//     { id: 1, name: "Deluxe Express", departure: "08:00 AM", arrival: "02:00 PM", from: "Kathmandu", to: "Pokhara", seats: 40 },
//     { id: 2, name: "Mountain Star", departure: "09:30 AM", arrival: "04:00 PM", from: "Pokhara", to: "Chitwan", seats: 35 },
//   ]);

//   const addBus = (newBus) => {
//     setBuses([...buses, { ...newBus, id: Date.now() }]);
//   };

//   return (
//     <BusOperatorContext.Provider value={{ buses, addBus }}>
//       {children}
//     </BusOperatorContext.Provider>
//   );
// };

// export const useBusOperatorContext = () => useContext(BusOperatorContext);
