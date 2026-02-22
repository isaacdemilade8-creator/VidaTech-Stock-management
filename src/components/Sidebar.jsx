import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboard,
  Package,
  Layers,
  Menu,
  X,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import { Button } from "./ui";

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const isProductsRoute = location.pathname.startsWith("/products");

  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(isProductsRoute);

  useEffect(() => {
    setProductsOpen(isProductsRoute);
  }, [isProductsRoute]);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
      isActive
        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  const subLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition text-sm ${
      isActive
        ? "bg-purple-100 text-purple-700 font-medium"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  const productMenuItems = [
    { to: "/products/list", label: "Product List" },
    { to: "/products/add", label: "Add Product" },
    { to: "/products/categories", label: "Categories" },
    { to: "/products/units", label: "Units" },
    { to: "/products/brands", label: "Brands" },
    { to: "/products/suppliers", label: "Suppliers" },
    { to: "/products/stock", label: "Stock" },
    { to: "/products/sales", label: "Sales" },
    { to: "/products/purchases", label: "Purchases" },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-3 py-2.5">
          <h1 className="text-base md:text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Inventory
          </h1>
          <button
            onClick={() => setOpen(true)}
            className="p-1.5 md:p-2 hover:bg-slate-100 rounded-lg transition"
          >
            <Menu size={20} className="text-slate-700" />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-slate-200">
          <h2 className="text-sm md:text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            InvControl
          </h2>
          <button
            className="md:hidden p-1.5 md:p-2 hover:bg-slate-100 rounded-lg transition"
            onClick={() => setOpen(false)}
          >
            <X size={18} className="text-slate-700" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 md:p-4 space-y-1 overflow-y-auto">
          {/* Dashboard */}
          <NavLink
            to="/"
            end
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </NavLink>

          {/* Products Dropdown */}
          <div>
            <button
              className={`flex items-center w-full justify-between px-4 py-2.5 rounded-lg transition font-medium ${
                isProductsRoute
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
              onClick={() => setProductsOpen(!productsOpen)}
            >
              <span className="flex items-center gap-3">
                <Package size={20} />
                Products
              </span>
              <ChevronDown
                size={18}
                className={`transition ${productsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {productsOpen && (
              <div className="mt-2 ml-2 pl-2 border-l-2 border-purple-200 space-y-1">
                {productMenuItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={subLinkClass}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Categories */}
          <NavLink
            to="/categories"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <Layers size={20} />
            <span className="font-medium">Categories</span>
          </NavLink>

          {/* Inventory */}
          <NavLink
            to="/inventory"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <Package size={20} />
            <span className="font-medium">Inventory</span>
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 space-y-2">
          <NavLink
            to="/profile"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <User size={20} />
            <span className="font-medium">Profile</span>
          </NavLink>
          <Button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            variant="destructive"
            className="w-full justify-start gap-3"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
    </>
  );
}