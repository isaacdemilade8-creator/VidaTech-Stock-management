import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui";
import { Warehouse, TrendingUp, AlertTriangle } from "lucide-react";
import { useStore } from "../../context/useStore";

export default function Stock() {
  const { products } = useStore();

  const lowStockProducts = products.filter((p) => p.quantity < 10);
  const outOfStockProducts = products.filter((p) => p.quantity === 0);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Inventory Stock</h1>
        <p className="text-slate-600 mt-1">Monitor current inventory levels and stock status</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Products</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{products.length}</p>
              </div>
              <Warehouse className="h-10 w-10 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Stock Value</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">${totalValue.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Low Stock Items</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{lowStockProducts.length}</p>
              </div>
              <AlertTriangle className="h-10 w-10 text-orange-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Warehouse className="h-5 w-5 text-purple-600" />
            Stock Summary
          </CardTitle>
          <CardDescription>Detailed inventory breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <Warehouse className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">No products yet</p>
              <p className="text-slate-400 text-sm">Add products to track inventory</p>
            </div>
          ) : (
            <div className="space-y-4">
              {outOfStockProducts.length > 0 && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <p className="font-semibold text-red-900 mb-3">Out of Stock ({outOfStockProducts.length})</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {outOfStockProducts.map((p) => (
                      <div key={p.id} className="bg-white p-3 rounded border border-red-200">
                        <p className="font-semibold text-slate-900">{p.name}</p>
                        <p className="text-xs text-red-600 mt-1">Quantity: 0</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {lowStockProducts.length > 0 && (
                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                  <p className="font-semibold text-orange-900 mb-3">Low Stock Items ({lowStockProducts.length})</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {lowStockProducts.filter((p) => p.quantity > 0).map((p) => (
                      <div key={p.id} className="bg-white p-3 rounded border border-orange-200">
                        <p className="font-semibold text-slate-900">{p.name}</p>
                        <p className="text-xs text-orange-600 mt-1">Quantity: {p.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {outOfStockProducts.length === 0 && lowStockProducts.length === 0 && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                  <p className="text-green-900 font-semibold">✓ All items in stock</p>
                  <p className="text-green-800 text-sm mt-1">No inventory concerns detected</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
