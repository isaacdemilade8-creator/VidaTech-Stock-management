// src/pages/Inventory.jsx

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useInventory } from "../context/InventoryContext";

import InventoryGrid from "../components/InventoryGrid";
import AddProductModal from "../components/AddProductModal";
import InventoryFilter from "../components/InventoryFilter";

export default function Inventory() {
  const { user } = useContext(AuthContext);

  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useInventory();

  const [filteredProducts, setFilteredProducts] = useState([]);

  // Keep filtered products in sync
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // =============================
  // Handlers
  // =============================

  const handleAdd = (product) => {
    addProduct(product);
  };

  const handleRestock = (id) => {
    const item = products.find((p) => p.id === id);

    if (!item) return;

    updateProduct({
      ...item,
      quantity: item.quantity + 5,
    });
  };

  const handleSell = (id) => {
    const item = products.find((p) => p.id === id);

    if (!item) return;

    updateProduct({
      ...item,
      quantity: Math.max(item.quantity - 1, 0),
    });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    deleteProduct(id);
  };

  const handleUpdate = (updatedProduct) => {
    updateProduct(updatedProduct);
  };

  // =============================
  // Search & Filter
  // =============================

  const handleSearch = (query) => {
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  const handleFilter = (filter) => {
    let filtered = [...products];

    if (filter === "low") {
      filtered = filtered.filter((p) => p.quantity <= 10);
    }

    if (filter === "high") {
      filtered = filtered.filter((p) => p.quantity > 10);
    }

    setFilteredProducts(filtered);
  };

  // =============================
  // Stats
  // =============================

  const totalQuantity = products.reduce(
    (acc, p) => acc + p.quantity,
    0
  );

  const totalValue = products.reduce(
    (acc, p) => acc + p.quantity * p.price,
    0
  );

  // =============================
  // UI
  // =============================

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Inventory</h1>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-sm text-slate-500">Total Products</p>
          <p className="text-2xl font-bold text-blue-800">
            {products.length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-sm text-slate-500">Total Quantity</p>
          <p className="text-2xl font-bold text-purple-600">
            {totalQuantity}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-sm text-slate-500">Total Value</p>
          <p className="text-2xl font-bold text-blue-700">
            ₦{totalValue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Filter */}
      <InventoryFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
      />

      {/* Add Product */}
      <AddProductModal onAdd={handleAdd} />

      {/* Grid */}
      <InventoryGrid
        products={filteredProducts}
        onRestock={handleRestock}
        onSell={handleSell}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
