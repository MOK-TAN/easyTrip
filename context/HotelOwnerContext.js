// context/HotelOwnerContext.js
import { createContext, useState, useContext } from "react";

const HotelOwnerContext = createContext();

export const HotelOwnerProvider = ({ children }) => {
  const [hotels, setHotels] = useState([
    { id: 1, name: "Hotel Sunrise", location: "Kathmandu", price: 150 },
    { id: 2, name: "Mountain View Hotel", location: "Pokhara", price: 120 },
  ]);

  const addHotel = (newHotel) => {
    setHotels([...hotels, { ...newHotel, id: Date.now() }]);
  };

  return (
    <HotelOwnerContext.Provider value={{ hotels, addHotel }}>
      {children}
    </HotelOwnerContext.Provider>
  );
};

export const useHotelOwnerContext = () => useContext(HotelOwnerContext);
