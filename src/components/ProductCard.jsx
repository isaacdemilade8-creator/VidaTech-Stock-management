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
  <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden border group">

    <div className="h-40 bg-slate-100 overflow-hidden relative">

      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
          No Image
        </div>
      )}

    </div>


    <div className="p-4 space-y-2">

      <h3 className="font-semibold text-lg truncate">
        {product.name}
      </h3>

      <p className="text-sm text-slate-500">
        {product.category}
      </p>

      <div className="flex justify-between items-center text-sm mt-2">

        <span className="font-bold text-indigo-600">
          ₦{product.price}
        </span>

        <span
          className={`px-2 py-1 rounded-full text-xs font-medium
          ${
            product.quantity <= 5
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {product.quantity} left
        </span>

      </div>


      <div className="flex gap-2 mt-3">

        <button
          onClick={() => onSell(product.id)}
          className="bg-yellow-600 text-white w-[30%] px-4 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200"
        >
          Sell
        </button>

        <button
          onClick={() => onRestock(product.id)}
          className="bg-purple-600 text-white px-4 w-[50%] py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200"
        >
          Restock
        </button>

        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-600 text-white px-4 py-2 w-[20%] rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200"
        >
          Delete
        </button>

      </div>

    </div>

  </div>
);

}
