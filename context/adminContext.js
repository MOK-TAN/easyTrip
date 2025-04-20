// context/AdminContext.js
import { createContext, useState, useContext } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState({
    totalUsers: 1000,
    totalBookings: 500,
    totalHotels: 30,
  });

  const updateTotalUsers = (newUserCount) => {
    setAdminData((prevData) => ({
      ...prevData,
      totalUsers: newUserCount,
    }));
  };

  return (
    <AdminContext.Provider value={{ adminData, updateTotalUsers }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
