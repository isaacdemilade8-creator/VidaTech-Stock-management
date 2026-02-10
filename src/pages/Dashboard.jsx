import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import DashboardStats from "../components/DashboardStats";
import RecentProducts from "../components/RecentProducts";
import CategoryChart from "../components/CategoryChart";
import ValueChart from "../components/ValueChart";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user) return;
    const allProducts = JSON.parse(localStorage.getItem("storeProducts")) || {};
    setProducts(allProducts[user.storeName] || []);
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user?.storeName}!
      </h1>

      {/* Stats */}
      <DashboardStats products={products} />

      {/* Recent Products */}
      <RecentProducts products={products} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <CategoryChart products={products} />
        <ValueChart products={products} />
      </div>
    </div>
  );
}