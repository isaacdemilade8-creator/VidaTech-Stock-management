import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui";
import { Package, TrendingDown, AlertCircle } from "lucide-react";

export default function Purchases() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Purchases</h1>
        <p className="text-slate-600 mt-1">View and manage your purchase history</p>
      </div>

      {/* Content Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-indigo-600" />
            Purchase History
          </CardTitle>
          <CardDescription>Track all incoming inventory purchases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6 flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-indigo-900">Coming Soon</p>
              <p className="text-indigo-800 mt-2">
                The purchase management system will help you:
              </p>
              <ul className="mt-4 space-y-2 text-indigo-800">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
                  <strong>Record Purchases</strong> - Log all supplier purchases with details
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
                  <strong>Track Costs</strong> - Monitor purchase costs and expenses
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
                  <strong>Manage Suppliers</strong> - Link purchases to suppliers
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
                  <strong>View Analytics</strong> - Analyze purchase patterns and trends
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
