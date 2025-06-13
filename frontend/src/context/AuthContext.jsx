import { createContext, useState, useEffect, useContext } from "react";

import { api } from "../service/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [username, setUsername] = useState("");

  const fetchUser = async () => {
    try {
      const response = await api.get("/me", {
        withCredentials: true,
      });
      setUser(response.data.user);
      setUsername(response.data.username);
    } catch (err) {
      setUser(null);
      console.error(err.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loader, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
