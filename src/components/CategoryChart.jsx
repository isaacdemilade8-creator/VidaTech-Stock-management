// src/components/CategoryChart.jsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function CategoryChart({ products }) {
  if (!products || products.length === 0) return null;

  // Group products by category
  const categoryData = Object.values(
    products.reduce((acc, p) => {
      const cat = p.category || "Uncategorized";
      if (!acc[cat]) acc[cat] = { name: cat, value: 0 };
      acc[cat].value += 1;
      return acc;
    }, {})
  );

  const colors = ["#6B5BFF", "#4F46E5", "#8B5CF6", "#6366F1", "#A78BFA"];

  return (
    <div className="bg-white p-3 md:p-4 rounded-xl shadow w-full">
      <h2 className="font-bold text-lg md:text-xl mb-3 md:mb-4 text-center md:text-left">
        Category Distribution
      </h2>

      <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="70%"
              innerRadius={30} // optional donut style
              paddingAngle={2}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
