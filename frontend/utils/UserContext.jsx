import { API_URL } from '../src/api';
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
  auth: false,
  role: null,
  refreshUser: () => {},
  clearUser: () => {}
});

export const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState(null);

  const validateUsers = [
    "Technical Head", "General Secretary", "Joint Secretary", 
    "Content Team", "Event Coordinator", "President", 
    "Vice-President", "Social Media", "Treasurer", "Faculty",
    "Membership Chair"
  ];

  const refreshUser = () => {
    fetch(`${API_URL}/me`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then(data => {
        setRole(data.role);
        setAuth(validateUsers.includes(data.role));
      })
      .catch(() => {
        // if not logged in
        setRole(null);
        setAuth(false);
      });
  };

  // explicitly clear context on logout
  const clearUser = () => {
    setRole(null);
    setAuth(false);
  };

  useEffect(() => {
    refreshUser();
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={{ auth, role, refreshUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
