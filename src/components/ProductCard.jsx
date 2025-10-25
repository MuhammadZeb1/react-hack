import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="h-full flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-full object-contain p-4"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-md font-semibold mb-2 line-clamp-2">
          {product.title}
        </h3>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold">${product.price}</span>
          <button
            onClick={() => onAdd(product)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
