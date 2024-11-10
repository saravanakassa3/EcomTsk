import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userLogin = localStorage.getItem('userLogin') === 'true';  
    console.log("userLogin", userLogin);
    setIsAuthenticated(userLogin);
  }, []);
  

  const userLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('userLogin', btoa('true'));
  };
  
  const userLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('userLogin');
  };  

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userLogin, userLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
