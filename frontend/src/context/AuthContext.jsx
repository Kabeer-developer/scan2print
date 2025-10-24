import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [store, setStore] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const login = (storeData, tokenValue) => {
    setStore(storeData);
    setToken(tokenValue);
  };

  const logout = () => {
    setStore(null);
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ store, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
