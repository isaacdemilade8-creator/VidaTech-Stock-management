import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("storeUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("storeUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("storeUser");
    }
  }, [user]);

  const login = (storeName, email) => {
    const userData = { storeName, email };
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedData) => {
  setUser((prev) => ({
    ...prev,
    ...updatedData,
  }));
};

const value = {
  user,
  login,
  logout,
  updateProfile,
  isAuthenticated: !!user,
};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
