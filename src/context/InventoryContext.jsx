import { createContext, useContext, useRef, useState, useEffect } from "react";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const initialized = useRef(false);

  const [history, setHistory] = useState([]);

  useEffect(() => {
  const saved = localStorage.getItem("inventoryHistory");
  if (saved) setHistory(JSON.parse(saved));
}, []);

useEffect(() => {
  localStorage.setItem("inventoryHistory", JSON.stringify(history));
}, [history]);

// Action wrapper
const logHistory = (action, product) => {
  const entry = {
    id: Date.now(),
    action,
    product: product.name,
    quantity: product.quantity,
    date: new Date().toLocaleString(),
  };
  setHistory((prev) => [entry, ...prev]);
};

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (initialized.current) return;

    const saved = localStorage.getItem("inventoryProducts");

    if (saved) {
      setProducts(JSON.parse(saved));
    }

    initialized.current = true;
  }, []);

  useEffect(() => {
    if (!initialized.current) return;

    localStorage.setItem(
      "inventoryProducts",
      JSON.stringify(products)
    );
  }, [products]);

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
