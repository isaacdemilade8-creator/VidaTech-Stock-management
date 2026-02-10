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
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Category: {name}
      </h1>

      {filtered.length === 0 && (
        <p className="text-slate-500">
          No products in this category.
        </p>
      )}

      <InventoryGrid products={filtered} />
    </div>
  );
}
