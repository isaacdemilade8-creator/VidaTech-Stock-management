// src/pages/products/ProductsLayout.jsx
import { Outlet, useLocation } from "react-router-dom";

export default function ProductsLayout() {
  const location = useLocation();

  // Automatically open the Products submenu if any /products/* route is active
  const isProductsRoute = location.pathname.startsWith("/products");

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Optional: Tabs or breadcrumbs */}
      <nav className="flex gap-4 mb-6 text-sm font-medium text-gray-500">
        <span className={location.pathname.endsWith("/list") ? "text-purple-700" : ""}>
          Product List
        </span>
        <span className={location.pathname.endsWith("/categories") ? "text-purple-700" : ""}>
          Categories
        </span>
        <span className={location.pathname.endsWith("/units") ? "text-purple-700" : ""}>
          Units
        </span>
        <span className={location.pathname.endsWith("/base-units") ? "text-purple-700" : ""}>
          Base Units
        </span>
        <span className={location.pathname.endsWith("/variants") ? "text-purple-700" : ""}>
          Variants
        </span>
        <span className={location.pathname.endsWith("/stock") ? "text-purple-700" : ""}>
          Stock
        </span>
        <span className={location.pathname.endsWith("/suppliers") ? "text-purple-700" : ""}>
          Suppliers
        </span>
        <span className={location.pathname.endsWith("/sales") ? "text-purple-700" : ""}>
          Sales
        </span>
        <span className={location.pathname.endsWith("/purchases") ? "text-purple-700" : ""}>
          Purchases
        </span>
      </nav>

      {/* Nested routes render here */}
      <div className="bg-white p-4 rounded-xl shadow min-h-[400px]">
        <Outlet />
      </div>
    </div>
  );
}
