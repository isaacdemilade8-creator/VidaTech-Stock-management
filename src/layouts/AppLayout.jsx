import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="h-screen bg-slate-50 md:flex overflow-auto">
      <Sidebar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 md:pt-0">
        <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
