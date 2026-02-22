// src/pages/CategoryDetails.jsx

import { useParams } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";

import InventoryGrid from "../components/InventoryGrid";

export default function CategoryDetails() {
  const { name } = useParams();
  const { products } = useInventory();

  const filtered = products.filter(
    (p) => p.category === name
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
        Category: {name}
      </h1>

      {filtered.length === 0 && (
        <p className="text-xs md:text-sm text-slate-500">
          No products in this category.
        </p>
      )}

      <InventoryGrid products={filtered} />
    </div>
  );
}
