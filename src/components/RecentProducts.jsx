import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from "./ui";

export default function RecentProducts({ products }) {
  const recent = [...products].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Products</CardTitle>
        <CardDescription>Latest products added to inventory</CardDescription>
      </CardHeader>
      <CardContent>
        {recent.length === 0 ? (
          <p className="text-slate-500 text-sm">No products added yet.</p>
        ) : (
          <div className="space-y-3">
            {recent.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
              >
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{p.name}</p>
                  <p className="text-xs text-slate-500">Category: {p.category || "Uncategorized"}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{p.quantity} pcs</Badge>
                  <p className="text-sm font-semibold text-slate-700 mt-1">${(p.price * p.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}