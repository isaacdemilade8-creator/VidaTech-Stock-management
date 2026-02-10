// src/context/InventoryContext.jsx

import { createContext, useContext, useRef, useState, useEffect } from "react";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const initialized = useRef(false);

  const [products, setProducts] = useState([]);

  // =============================
  // Load ONCE from localStorage
  // =============================

  useEffect(() => {
    if (initialized.current) return;

    const saved = localStorage.getItem("inventoryProducts");

    if (saved) {
      setProducts(JSON.parse(saved));
    }

    initialized.current = true;
  }, []);

  // =============================
  // Save on Change
  // =============================

  useEffect(() => {
    if (!initialized.current) return;

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
