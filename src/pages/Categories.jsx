import { useInventory } from "../context/InventoryContext";

export default function Categories() {
  const { products } = useInventory();

  const grouped = products.reduce((acc, p) => {
    const cat = p.category || "Uncategorized";

    if (!acc[cat]) acc[cat] = [];

    acc[cat].push(p);

    return acc;
  }, {});

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Categories
      </h1>

      {Object.entries(grouped).map(
        ([cat, items]) => (
          <div
            key={cat}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h2 className="font-semibold mb-2">
              {cat} ({items.length})
            </h2>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

              {items.map((p) => (
                <div
                  key={p.id}
                  className="border p-3 rounded"
                >
                  {p.name}
                </div>
              ))}

            </div>
          </div>
        )
      )}

    </div>
  );
}
    