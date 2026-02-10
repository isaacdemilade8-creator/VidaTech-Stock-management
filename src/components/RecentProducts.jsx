export default function RecentProducts({ products }) {
  const recent = [...products].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-bold text-xl mb-4">Recent Products</h2>
      {recent.length === 0 && (
        <p className="text-slate-500 text-sm">No products added yet.</p>
      )}
      <ul className="space-y-2">
        {recent.map((p) => (
          <li
            key={p.id}
            className="flex justify-between border-b border-slate-200 pb-1"
          >
            <span className="font-medium text-blue-800">{p.name}</span>
            <span className="text-slate-600">{p.quantity} pcs</span>
          </li>
        ))}
      </ul>
    </div>
  );
}