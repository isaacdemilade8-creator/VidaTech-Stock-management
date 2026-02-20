import CountUp from "react-countup";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "./ui";

export default function DashboardStats({ products }) {
  const totalProducts = products.length;
  const totalQuantity = products.reduce((acc, p) => acc + p.quantity, 0);
  const totalValue = products.reduce((acc, p) => acc + p.quantity * p.price, 0);

  const stats = [
    { label: "Total Products", value: totalProducts, color: "bg-blue-50", textColor: "text-blue-700" },
    { label: "Total Quantity", value: totalQuantity, color: "bg-purple-50", textColor: "text-purple-700" },
    { label: "Inventory Value", value: `$${totalValue.toFixed(2)}`, color: "bg-emerald-50", textColor: "text-emerald-700", isPrice: true },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} className={stat.color}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${stat.textColor}`}>
              {stat.isPrice ? stat.value : <CountUp end={stat.value} duration={1.5} />}
            </div>
            <Badge variant="success" className="mt-3 text-xs">↑ 12%</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
