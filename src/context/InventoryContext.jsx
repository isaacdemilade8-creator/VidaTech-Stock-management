import { createContext, useContext } from "react";
import { StoreContext } from "./StoreContextFile";
import { useHistoryLog } from "./HistoryContext";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  // Inventory now delegates to StoreContext (single source of truth)
  // We wrap the store context and expose the same API to preserve compatibility

  const store = useContext(StoreContext);

  const products = store?.products || [];
  const { history } = useHistoryLog();

  const addProduct = (product) => store?.addProduct(product);
  const updateProduct = (product) => store?.updateProduct(product.id, product);
  const deleteProduct = (id) => store?.deleteProduct(id);

  return (
    <InventoryContext.Provider
      value={{ products, history, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}
