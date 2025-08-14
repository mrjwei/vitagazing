import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let initUser = localStorage.getItem('user') || null
  if (initUser) {
    initUser = JSON.parse(initUser)
  }
  const [user, setUser] = useState(initUser);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData))
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user')
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
