// src/pages/Categories.jsx

import { useInventory } from "../context/InventoryContext";
import { Link } from "react-router-dom";

export default function Categories() {
  const { products } = useInventory();

  // Group products by category
  const categories = products.reduce((acc, product) => {
    const cat = product.category || "Uncategorized";

    if (!acc[cat]) {
      acc[cat] = [];
    }

    acc[cat].push(product);

    return acc;
  }, {});

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">Categories</h1>
        <p className="text-xs md:text-sm text-slate-600">Browse and manage product categories</p>
      </div>

      {Object.keys(categories).length === 0 && (
        <p className="text-xs md:text-sm text-slate-500">No products yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {Object.entries(categories).map(
          ([category, items]) => (
            <a
              href={`/categories/${category}`}
              key={category}
              className="bg-white p-3 md:p-5 rounded-xl shadow hover:shadow-md transition block"
            >
              <h2 className="text-lg md:text-xl font-semibold text-blue-700">
                {category}
              </h2>

              <p className="text-xs md:text-sm text-slate-500 mt-1 md:mt-2">
                {items.length} product
                {items.length > 1 && "s"}
              </p>
            </a>
          )
        )}
      </div>
    </div>
  );
}
