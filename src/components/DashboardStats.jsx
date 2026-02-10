import CountUp from "react-countup";

export default function DashboardStats({ products }) {
  const totalProducts = products.length;
  const totalQuantity = products.reduce((acc, p) => acc + p.quantity, 0);
  const totalValue = products.reduce((acc, p) => acc + p.quantity * p.price, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-sm text-slate-500">Total Products</p>
        <p className="text-2xl font-bold text-blue-800">
          <CountUp end={totalProducts} duration={1.5} />
        </p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-sm text-slate-500">Total Quantity</p>
        <p className="text-2xl font-bold text-purple-600">
          <CountUp end={totalQuantity} duration={1.5} />
        </p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-sm text-slate-500">Total Inventory Value</p>
        <p className="text-2xl font-bold text-blue-700">
          $<CountUp end={totalValue} duration={1.5} decimals={2} />
        </p>
      </div>
    </div>
  );
}
