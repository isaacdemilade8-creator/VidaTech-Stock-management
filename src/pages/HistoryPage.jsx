// src/pages/HistoryPage.jsx
import { useState } from "react";
import { useHistoryLog } from "../context/HistoryContext";

export default function HistoryPage() {
  const { history, clearHistory } = useHistoryLog();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Filter + Search
  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.product?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || item.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">
        Activity Log
      </h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All</option>
          <option value="ADD">Add</option>
          <option value="SELL">Sell</option>
          <option value="RESTOCK">Restock</option>
          <option value="DELETE">Delete</option>
          <option value="UPDATE">Update</option>
        </select>

        <button
          onClick={clearHistory}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear
        </button>
      </div>

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <p className="text-center text-slate-500">
          No records found
        </p>
      ) : (
        <ul className="space-y-3">
          {filteredHistory.map((item) => (
            <li
              key={item.id}
              className="border p-3 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {item.user}
                </p>

                <p className="text-sm text-slate-600">
                  {item.type} — {item.product?.name}
                </p>
              </div>

              <span className="text-xs text-slate-400">
                {new Date(item.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
