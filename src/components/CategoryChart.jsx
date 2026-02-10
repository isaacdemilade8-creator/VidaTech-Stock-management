// src/components/CategoryChart.jsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function CategoryChart({ products }) {
  // Group products by category
  const categoryData = Object.values(
    products.reduce((acc, p) => {
      if (!acc[p.category]) acc[p.category] = { name: p.category, value: 0 };
      acc[p.category].value += 1;
      return acc;
    }, {})
  );

  const colors = ["#6B5BFF", "#4F46E5", "#8B5CF6", "#6366F1", "#A78BFA"];

  if (products.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-bold text-xl mb-4">Category Distribution</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {categoryData.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}