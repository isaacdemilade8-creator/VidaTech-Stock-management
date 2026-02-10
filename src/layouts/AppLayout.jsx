import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <Sidebar />

      <main className="flex-1 px-3 py-4 sm:px-4 md:px-6 pt-20 md:pt-6 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
