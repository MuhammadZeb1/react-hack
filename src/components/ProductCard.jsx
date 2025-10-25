import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ product, onAdd }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.97 }}
      className="h-full flex flex-col bg-white shadow-md rounded-lg overflow-hidden transition-shadow duration-300"
    >
      {/* Product Image */}
      <div className="h-48 w-full flex items-center justify-center bg-gray-50 p-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-md font-semibold mb-2 line-clamp-2 text-gray-800">
          {product.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4">{product.category}</p>

        <div className="mt-auto flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          <button
            onClick={() => onAdd(product)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition-colors duration-300 shadow-sm"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
