import { createContext, useContext, useState, useEffect } from "react";

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("inventoryHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("inventoryHistory", JSON.stringify(history));
  }, [history]);

  const addHistory = (action) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...action,
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
