// src/context/InventoryContext.jsx

import { createContext, useContext, useEffect, useState } from "react";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState([]);

  // =============================
  // Load from localStorage
  // =============================

  useEffect(() => {
    const saved = localStorage.getItem("inventoryProducts");

    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  // =============================
  // Save to localStorage
  // =============================

  useEffect(() => {
    localStorage.setItem(
      "inventoryProducts",
      JSON.stringify(products)
    );
  }, [products]);

  // =============================
  // Actions
  // =============================

  const addProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (updated) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === updated.id ? updated : p
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  return (
    <InventoryContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}
