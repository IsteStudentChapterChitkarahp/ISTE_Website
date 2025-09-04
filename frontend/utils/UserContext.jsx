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

  useEffect(() => {
fetch('http://localhost:5000/me', {
  method: 'GET',
  credentials: 'include',
})
      .then(res => res.json())
      .then(data => {
        setRole(data.role);
        setAuth(validateUsers.includes(data.role));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <UserContext.Provider value={{ auth, role }}>
      {children}
    </UserContext.Provider>
  );
};
