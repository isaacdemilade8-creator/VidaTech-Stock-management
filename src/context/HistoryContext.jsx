// src/context/HistoryContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);

  // Load saved history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("inventoryHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Save history whenever it changes
  useEffect(() => {
    localStorage.setItem("inventoryHistory", JSON.stringify(history));
  }, [history]);

  // Add new history entry
  const addHistory = (action) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...action, // { type: 'ADD', product: {...}, user: 'Store1' }
    };
    setHistory((prev) => [newEntry, ...prev]);
  };

  const clearHistory = () => {
  setHistory([]);
};

return (
  <HistoryContext.Provider
    value={{
      history,
      addHistory,
      clearHistory,
    }}
  >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistoryLog() {
  return useContext(HistoryContext);
}
