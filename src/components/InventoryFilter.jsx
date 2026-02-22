import { useState } from "react";

export default function InventoryFilter({ onSearch, onFilter }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    onFilter(value);
  };

  return (
    <div className="mb-4 md:mb-6 flex flex-col gap-3 md:gap-4">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={handleSearchChange}
        className="flex-1 p-2 md:p-3 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
      />

      <select
        value={filter}
        onChange={handleFilterChange}
        className="p-2 md:p-3 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-auto"
      >
        <option value="all">All Products</option>
        <option value="low">Low Stock (≤10)</option>
        <option value="high">In Stock (>10)</option>
      </select>
    </div>
  );
}