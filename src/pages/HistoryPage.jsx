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
    <div className="bg-white p-3 md:p-4 rounded-xl shadow">
      <h1 className="text-lg md:text-2xl font-bold mb-3 md:mb-4">
        Activity Log
      </h1>

      {/* Controls */}
      <div className="flex flex-col gap-2 md:gap-3 mb-3 md:mb-4">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <div className="flex gap-2 flex-wrap">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm flex-1 min-w-[100px] focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            className="bg-red-500 text-white px-2 md:px-4 py-1.5 md:py-2 rounded text-xs md:text-sm hover:bg-red-600 transition flex-1 md:flex-none"
          >
            Clear
          </button>
        </div>
      </div>

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <p className="text-center text-xs md:text-sm text-slate-500">
          No records found
        </p>
      ) : (
        <ul className="space-y-2 md:space-y-3">
          {filteredHistory.map((item) => (
            <li
              key={item.id}
              className="border p-2 md:p-3 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0"
            >
              <div>
                <p className="font-semibold text-xs md:text-sm">
                  {item.user}
                </p>

                <p className="text-xs md:text-sm text-slate-600">
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
