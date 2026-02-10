import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Layers,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive
      ? "bg-purple-600 text-white"
      : "text-slate-600 hover:bg-purple-100"
    }`;

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-white shadow px-4 py-3">
        <h1 className="font-bold text-purple-700 text-lg">
          Inventory
        </h1>

        <button onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
      </header>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:static top-0 left-0 h-screen w-64 bg-white shadow z-50
        transform transition-transform duration-300 ease-in-out
        ${open
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
          }
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-purple-700">
            Dashboard
          </h2>

          <button
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <nav className="p-4 space-y-2">
          <NavLink
            to="/"
            end
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/inventory"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <Package size={18} />
            Inventory
          </NavLink>

          <NavLink
            to="/categories"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <Layers size={18} />
            Categories
          </NavLink>
          <NavLink
            to="/history"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <Layers size={18} /> History
          </NavLink>
          <NavLink
  to="/profile"
  className="block px-4 py-2 hover:bg-purple-500 hover:text-black rounded absolute bottom-5 bg-purple-700 text-white"
>
  User-profile
</NavLink>
        </nav>
      </aside>
    </>
  );
}
