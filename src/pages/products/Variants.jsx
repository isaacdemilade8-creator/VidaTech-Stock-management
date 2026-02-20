import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui";
import { Package, AlertCircle } from "lucide-react";

export default function Variants() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Variants</h1>
        <p className="text-slate-600 mt-1">Manage product variants like size, color, model, and version</p>
      </div>

      {/* Content Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-cyan-600" />
            Product Variants
          </CardTitle>
          <CardDescription>Configure variations for your products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-blue-900">Coming Soon</p>
              <p className="text-blue-800 mt-2">
                The variant management system will allow you to create and manage product variations such as:
              </p>
              <ul className="mt-4 space-y-2 text-blue-800">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-blue-600 rounded-full"></span>
                  <strong>Size</strong> - XS, S, M, L, XL, etc.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-blue-600 rounded-full"></span>
                  <strong>Color</strong> - Red, Blue, Green, Black, etc.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-blue-600 rounded-full"></span>
                  <strong>Model</strong> - Standard, Pro, Enterprise, etc.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-blue-600 rounded-full"></span>
                  <strong>Version</strong> - v1.0, v2.0, v3.0, etc.
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
