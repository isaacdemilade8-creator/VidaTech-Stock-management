import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ValueChart({ products }) {
  const data = products.map((p) => ({
    name: p.name,
    value: p.price * p.quantity,
  }));

  if (products.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-bold text-xl mb-4">Inventory Value by Product</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#6B5BFF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}