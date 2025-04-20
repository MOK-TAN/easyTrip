// context/AgentContext.js
import { createContext, useState, useContext } from "react";

const AgentContext = createContext();

export const AgentProvider = ({ children }) => {
  const [bookings, setBookings] = useState([
    { id: 1, customer: "John Doe", bus_id: 1, seats: 2 },
    { id: 2, customer: "Jane Smith", bus_id: 2, seats: 3 },
  ]);

  const addBooking = (newBooking) => {
    setBookings([...bookings, { ...newBooking, id: Date.now() }]);
  };

  return (
    <AgentContext.Provider value={{ bookings, addBooking }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgentContext = () => useContext(AgentContext);
