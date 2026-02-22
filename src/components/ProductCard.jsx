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


    <div className="p-3 md:p-4 space-y-2">

      <h3 className="font-semibold text-base md:text-lg truncate">
        {product.name}
      </h3>

      <p className="text-xs md:text-sm text-slate-500 truncate">
        {product.category}
      </p>

      <div className="flex justify-between items-center text-xs md:text-sm mt-2 gap-1">

        <span className="font-bold text-indigo-600 text-sm md:text-base">
          ₦{product.price}
        </span>

        <span
          className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap
          ${
            product.quantity <= 5
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {product.quantity} left
        </span>

      </div>


      <div className="flex gap-1 md:gap-2 mt-3">

        <button
          onClick={() => onSell(product.id)}
          className="bg-yellow-600 text-white text-xs md:text-sm flex-1 px-2 md:px-3 py-1.5 md:py-2 rounded-lg hover:bg-yellow-700 hover:scale-105 transition-all duration-200"
        >
          Sell
        </button>

        <button
          onClick={() => onRestock(product.id)}
          className="bg-purple-600 text-white text-xs md:text-sm flex-1.5 px-2 md:px-3 py-1.5 md:py-2 rounded-lg hover:bg-purple-700 hover:scale-105 transition-all duration-200"
        >
          Restock
        </button>

        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-600 text-white text-xs md:text-sm flex-1 px-2 md:px-3 py-1.5 md:py-2 rounded-lg hover:bg-red-700 hover:scale-105 transition-all duration-200"
        >
          Delete
        </button>

      </div>

    </div>

  </div>
);

}
