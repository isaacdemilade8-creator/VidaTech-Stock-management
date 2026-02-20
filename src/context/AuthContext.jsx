import { createContext, useState, useEffect, useContext } from "react";
import { useHistoryLog } from "./HistoryContext";

export const AuthContext = createContext();

// Default avatar image
const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=6B5BFF&color=fff&size=128";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addHistory } = useHistoryLog();

  // Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("storeUser");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false); // finished loading
  }, []);

  // Save user
  useEffect(() => {
    if (user) {
      localStorage.setItem("storeUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("storeUser");
    }
  }, [user]);

  // Register
  const register = (storeName, email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === email)) {
      throw new Error("Email already registered");
    }
    const newUser = { storeName, email, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setUser({ ...newUser, avatar: DEFAULT_AVATAR });
    addHistory({ type: "auth", action: "register", email, timestamp: new Date().toISOString() });
  };

  // Login
  const login = (storeName, email, password) => {
    const userData = {
      storeName,
      email,
      password,
      avatar: DEFAULT_AVATAR,
      lastLogin: new Date().toISOString(),
    };

    setUser(userData);
    localStorage.setItem("storeUser", JSON.stringify(userData));
    addHistory({ type: "auth", action: "login", email, timestamp: new Date().toISOString() });
  };

  // Logout
  const logout = () => {
    addHistory({ type: "auth", action: "logout", email: user?.email, timestamp: new Date().toISOString() });
    setUser(null);
    localStorage.removeItem("storeUser");
  };

  // Update profile info
  const updateProfile = (updatedData) => {
    setUser((prev) => {
      const merged = { ...prev, ...updatedData };
      addHistory({ type: "auth", action: "update_profile", email: merged.email, timestamp: new Date().toISOString() });
      return merged;
    });
  };

  // Update avatar
  const updateAvatar = (image) => {
    setUser((prev) => {
      const merged = { ...prev, avatar: image };
      addHistory({ type: "auth", action: "update_avatar", email: merged.email, timestamp: new Date().toISOString() });
      return merged;
    });
  };

  // Update password
  const updatePassword = (newPassword) => {
    setUser((prev) => {
      const merged = { ...prev, password: newPassword };
      addHistory({ type: "auth", action: "update_password", email: merged.email, timestamp: new Date().toISOString() });
      return merged;
    });
  };

  const value = {
    user,
    register,
    login,
    logout,
    updateProfile,
    updateAvatar,
    updatePassword,
    isAuthenticated: !!user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}