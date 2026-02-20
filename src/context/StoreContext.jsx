import { useState, useEffect } from "react";
import { StoreContext } from "./StoreContextFile";
import { useHistoryLog } from "./HistoryContext";

export function StoreProvider({ children }) {
  const { addHistory } = useHistoryLog();

  // PRODUCTS
  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || [];
  });

  // CATEGORIES
  const [categories, setCategories] = useState(() => {
    return JSON.parse(localStorage.getItem("categories")) || [];
  });

  function addCategory(name) {
    const newCategory = {
      id: Date.now(),
      name: name.trim(),
    };
    setCategories((prev) => [...prev, newCategory]);
    addHistory && addHistory({ type: "category", action: "add", name: newCategory.name, id: newCategory.id, timestamp: new Date().toISOString() });
  }

  function deleteCategory(id) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    addHistory && addHistory({ type: "category", action: "delete", id, timestamp: new Date().toISOString() });
  }

  function updateCategory(id, name) {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name: name.trim() } : c)));
    addHistory && addHistory({ type: "category", action: "update", id, name: name.trim(), timestamp: new Date().toISOString() });
  }

  // UNITS
  const [units, setUnits] = useState(() => {
    return JSON.parse(localStorage.getItem("units")) || [];
  });

  function addUnit(name) {
    const newUnit = {
      id: Date.now(),
      name: name.trim(),
    };
    setUnits((prev) => [...prev, newUnit]);
    addHistory && addHistory({ type: "unit", action: "add", name: newUnit.name, id: newUnit.id, timestamp: new Date().toISOString() });
  }

  function deleteUnit(id) {
    setUnits((prev) => prev.filter((u) => u.id !== id));
    addHistory && addHistory({ type: "unit", action: "delete", id, timestamp: new Date().toISOString() });
  }

  function updateUnit(id, name) {
    setUnits((prev) => prev.map((u) => (u.id === id ? { ...u, name: name.trim() } : u)));
    addHistory && addHistory({ type: "unit", action: "update", id, name: name.trim(), timestamp: new Date().toISOString() });
  }

  // SUPPLIERS
  const [suppliers, setSuppliers] = useState(() => {
    return JSON.parse(localStorage.getItem("suppliers")) || [];
  });

  function addSupplier(name) {
    const newSupplier = {
      id: Date.now(),
      name: name.trim(),
    };
    setSuppliers((prev) => [...prev, newSupplier]);
    addHistory && addHistory({ type: "supplier", action: "add", name: newSupplier.name, id: newSupplier.id, timestamp: new Date().toISOString() });
  }

  function deleteSupplier(id) {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
    addHistory && addHistory({ type: "supplier", action: "delete", id, timestamp: new Date().toISOString() });
  }

  function updateSupplier(id, name) {
    setSuppliers((prev) => prev.map((s) => (s.id === id ? { ...s, name: name.trim() } : s)));
    addHistory && addHistory({ type: "supplier", action: "update", id, name: name.trim(), timestamp: new Date().toISOString() });
  }

  // BRANDS
  const [brands, setBrands] = useState(() => {
    return JSON.parse(localStorage.getItem("brands")) || [];
  });

  function addBrand(name) {
    const newBrand = {
      id: Date.now(),
      name: name.trim(),
    };
    setBrands((prev) => [...prev, newBrand]);
    addHistory && addHistory({ type: "brand", action: "add", name: newBrand.name, id: newBrand.id, timestamp: new Date().toISOString() });
  }

  function deleteBrand(id) {
    setBrands((prev) => prev.filter((b) => b.id !== id));
    addHistory && addHistory({ type: "brand", action: "delete", id, timestamp: new Date().toISOString() });
  }

  function updateBrand(id, name) {
    setBrands((prev) => prev.map((b) => (b.id === id ? { ...b, name: name.trim() } : b)));
    addHistory && addHistory({ type: "brand", action: "update", id, name: name.trim(), timestamp: new Date().toISOString() });
  }

  // ADD PRODUCT
  function addProduct(product) {
    const newProduct = {
      id: Date.now(),
      ...product,
    };
    setProducts((prev) => [...prev, newProduct]);
    addHistory && addHistory({ type: "product", action: "add", id: newProduct.id, name: newProduct.name, timestamp: new Date().toISOString() });
  }

  function updateProduct(id, updates) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    addHistory && addHistory({ type: "product", action: "update", id, updates, timestamp: new Date().toISOString() });
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addHistory && addHistory({ type: "product", action: "delete", id, timestamp: new Date().toISOString() });
  }

  function bulkDeleteProducts(ids = []) {
    setProducts((prev) => prev.filter((p) => !ids.includes(p.id)));
    addHistory && addHistory({ type: "product", action: "bulk_delete", ids, timestamp: new Date().toISOString() });
  }

  // SALES & PURCHASES
  const [sales, setSales] = useState(() => JSON.parse(localStorage.getItem("sales")) || []);
  const [purchases, setPurchases] = useState(() => JSON.parse(localStorage.getItem("purchases")) || []);

  function addSale(sale) {
    const newSale = { id: Date.now(), ...sale };
    setSales((prev) => [...prev, newSale]);
    // reduce product stock if product id provided
    if (sale.productId) {
      setProducts((prev) =>
        prev.map((p) => (p.id === sale.productId ? { ...p, quantity: Math.max(0, (p.quantity || 0) - (Number(sale.quantity) || 0)) } : p))
      );
    }
    addHistory && addHistory({ type: "sale", action: "add", id: newSale.id, productId: sale.productId, quantity: sale.quantity, total: sale.total, timestamp: new Date().toISOString() });
  }

  function addPurchase(purchase) {
    const newPurchase = { id: Date.now(), ...purchase };
    setPurchases((prev) => [...prev, newPurchase]);
    if (purchase.productId) {
      setProducts((prev) => prev.map((p) => (p.id === purchase.productId ? { ...p, quantity: (p.quantity || 0) + (Number(purchase.quantity) || 0) } : p)));
    }
    addHistory && addHistory({ type: "purchase", action: "add", id: newPurchase.id, productId: purchase.productId, quantity: purchase.quantity, timestamp: new Date().toISOString() });
  }

  // Stock adjustments / history
  const [stockHistory, setStockHistory] = useState(() => JSON.parse(localStorage.getItem("stockHistory")) || []);

  // Dashboard video URL
  const [videoUrl, setVideoUrl] = useState(() => localStorage.getItem("dashboardVideo") || "");

  function adjustStock(productId, delta, reason = "adjustment") {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, quantity: Math.max(0, (p.quantity || 0) + Number(delta)) } : p)));
    setStockHistory((prev) => [...prev, { id: Date.now(), productId, delta: Number(delta), reason, date: new Date().toISOString() }] );
    addHistory && addHistory({ type: "stock", action: "adjust", productId, delta: Number(delta), reason, timestamp: new Date().toISOString() });
  }

  function setDashboardVideo(url) {
    setVideoUrl(url || "");
    addHistory && addHistory({ type: "dashboard", action: "set_video", url, timestamp: new Date().toISOString() });
  }

  // AUTO SAVE (ONLY ONCE PER STATE)
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("units", JSON.stringify(units));
  }, [units]);

  useEffect(() => {
    localStorage.setItem("suppliers", JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem("brands", JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    localStorage.setItem("sales", JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem("purchases", JSON.stringify(purchases));
  }, [purchases]);

  useEffect(() => {
    localStorage.setItem("stockHistory", JSON.stringify(stockHistory));
  }, [stockHistory]);

  useEffect(() => {
    localStorage.setItem("dashboardVideo", videoUrl);
  }, [videoUrl]);

  return (
    <StoreContext.Provider
      value={{
        products,
        videoUrl,
        categories,
        units,
        suppliers,
        brands,
        sales,
        purchases,
        stockHistory,
        addProduct,
        updateProduct,
        deleteProduct,
        bulkDeleteProducts,
        addCategory,
        updateCategory,
        addUnit,
        updateUnit,
        addSupplier,
        updateSupplier,
        addBrand,
        updateBrand,
        deleteCategory,
        deleteUnit,
        deleteSupplier,
        deleteBrand,
        addSale,
        addPurchase,
        adjustStock,
        setDashboardVideo,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}