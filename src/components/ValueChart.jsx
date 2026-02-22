import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ValueChart({ products }) {
  const data = products.map((p) => ({
    name: p.name,
    value: p.price * p.quantity,
  }));

  if (products.length === 0) return null;

  return (
    <div className="bg-white p-3 md:p-4 rounded-xl shadow w-full">
      <h2 className="font-bold text-lg md:text-xl mb-3 md:mb-4">Inventory Value by Product</h2>
      <div className="w-full h-[200px] sm:h-[250px] md:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6B5BFF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}