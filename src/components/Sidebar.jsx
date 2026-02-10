import { LayoutDashboard, Boxes } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
        <h2 className="font-bold">Inventory</h2>

        <button onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    <aside className="w-64 bg-white border-r min-h-screen p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-primary mb-10 bg-gradient-to-r from-indigo-500 to-pink-600 text-transparent bg-clip-text inline-block">
          {user ? user.storeName : "StoreKeeper"}
        </h1>

        <nav className="space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "block text-primary font-medium"
                : "block text-slate-600"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              isActive
                ? "block text-primary font-medium"
                : "block text-slate-600"
            }
          >
            Inventory
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive
                ? "block text-primary font-medium"
                : "block text-slate-600"
            }
          >
            Categories
          </NavLink>
        </nav>
      </div>
      

      {user && (
        <button
          onClick={logout}
          className="mt-10 w-full bg-red-500 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      )}
    </aside>
    </>
  );
}
