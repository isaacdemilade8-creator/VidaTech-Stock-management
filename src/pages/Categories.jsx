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
    <div>
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      {Object.keys(categories).length === 0 && (
        <p className="text-slate-500">No products yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(categories).map(
          ([category, items]) => (
            <Link
              to={`/categories/${category}`}
              key={category}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-blue-700">
                {category}
              </h2>

              <p className="text-slate-500 mt-2">
                {items.length} product
                {items.length > 1 && "s"}
              </p>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
