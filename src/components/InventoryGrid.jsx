import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";

export default function InventoryGrid({ products, onRestock, onSell, onDelete, onUpdate }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <AnimatePresence>
        {products.length === 0 && (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="col-span-full text-center text-slate-500"
          >
            No products yet
          </motion.p>
        )}

        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <ProductCard
              key={product.id}
              product={product}
              onRestock={onRestock}
              onSell={onSell}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}