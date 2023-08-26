/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, createContext, useContext } from "react";
const baseURL = import.meta.env.VITE_BASE_URL;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  axios.defaults.baseURL = baseURL;

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
