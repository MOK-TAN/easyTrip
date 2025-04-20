// context/BusOperatorContext.js
import { createContext, useState, useContext } from "react";

const BusOperatorContext = createContext();

export const BusOperatorProvider = ({ children }) => {
  const [buses, setBuses] = useState([
    { id: 1, name: "Deluxe Express", departure: "08:00 AM", arrival: "02:00 PM", from: "Kathmandu", to: "Pokhara", seats: 40 },
    { id: 2, name: "Mountain Star", departure: "09:30 AM", arrival: "04:00 PM", from: "Pokhara", to: "Chitwan", seats: 35 },
  ]);

  const addBus = (newBus) => {
    setBuses([...buses, { ...newBus, id: Date.now() }]);
  };

  return (
    <BusOperatorContext.Provider value={{ buses, addBus }}>
      {children}
    </BusOperatorContext.Provider>
  );
};

export const useBusOperatorContext = () => useContext(BusOperatorContext);
