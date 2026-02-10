import EditProductModal from "./EditProductModal";

export default function ProductCard({
  product,
  onRestock,
  onSell,
  onDelete,
  onUpdate,
}) {
  const lowStock = product.quantity <= 10;

  return (
    <div
      className={`bg-white p-5 rounded-xl shadow-md flex flex-col justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl ${
        product.quantity <= 5 ? "animate-pulse" : ""
      }`}
    >
      <div>
        <h3 className="font-bold text-2xl text-blue-800">{product.name}</h3>
        <p className="text-md text-slate-600">Qty: {product.quantity}</p>
        <p className="text-md text-purple-600 font-semibold">
          #{product.price.toFixed(2)}
        </p>
        {product.category && (
          <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
            {product.category}
          </span>
        )}

        {lowStock && (
          <span className="inline-block mt-2 px-2 py-1 text-xs font-bold bg-red-100 text-red-700 rounded-full">
            Low Stock
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => onRestock(product.id)}
            className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
          >
            Restock
          </button>
          <button
            onClick={() => onSell(product.id)}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Sell
          </button>
        </div>

        <EditProductModal product={product} onUpdate={onUpdate} />
        <button
          onClick={() => onDelete(product.id)}
          className="w-full border border-red-300 text-red-600 py-2 rounded-lg hover:bg-red-50 transition"
        >
          Delete Product
        </button>
      </div>
    </div>
  );
}
