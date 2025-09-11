import { API_URL } from '../src/api';
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
  auth: false,
  role: null
});

export const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState(null);

  const validateUsers = [
    "Technical Head", "General Secretary", "Joint Secretary", 
    "Content Team", "Event Coordinator", "President", 
    "Vice-President", "Social Media", "Treasurer", "Faculty"
  ];

  const refreshUser = () => {
    fetch(`${API_URL}/me`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setRole(data.role);
        setAuth(validateUsers.includes(data.role));
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    refreshUser();
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={{ auth, role, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
