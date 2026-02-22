import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui";
import { Package, TrendingDown, AlertCircle } from "lucide-react";

export default function Purchases() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">Purchases</h1>
        <p className="text-xs md:text-sm text-slate-600 mt-1">View and manage your purchase history</p>
      </div>

      {/* Content Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Package className="h-4 md:h-5 w-4 md:w-5 text-indigo-600" />
            Purchase History
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">Track all incoming inventory purchases</CardDescription>
        </CardHeader>
        <CardContent className="p-3 md:p-6">
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-3 md:p-6 flex flex-col sm:flex-row items-start gap-3 md:gap-4">
            <AlertCircle className="h-5 md:h-6 w-5 md:w-6 text-indigo-600 flex-shrink-0 mt-0.5 md:mt-1" />
            <div className="w-full">
              <p className="font-semibold text-sm md:text-base text-indigo-900">Coming Soon</p>
              <p className="text-xs md:text-sm text-indigo-800 mt-1.5 md:mt-2">
                The purchase management system will help you:
              </p>
              <ul className="mt-3 md:mt-4 space-y-1.5 md:space-y-2 text-xs md:text-sm text-indigo-800">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full flex-shrink-0 mt-1"></span>
                  <div>
                    <strong>Record Purchases</strong>
                    <span className="block text-indigo-700 font-normal">Log all supplier purchases with details</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full flex-shrink-0 mt-1"></span>
                  <div>
                    <strong>Track Costs</strong>
                    <span className="block text-indigo-700 font-normal">Monitor purchase costs and expenses</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full flex-shrink-0 mt-1"></span>
                  <div>
                    <strong>Manage Suppliers</strong>
                    <span className="block text-indigo-700 font-normal">Link purchases to suppliers</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full flex-shrink-0 mt-1"></span>
                  <div>
                    <strong>View Analytics</strong>
                    <span className="block text-indigo-700 font-normal">Analyze purchase patterns and trends</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
