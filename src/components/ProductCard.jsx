import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col hover:shadow-md transition">
      <div className="h-40 flex items-center justify-center mb-3">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-36 object-contain"
        />
      </div>
      <h3 className="text-sm font-medium mb-2 line-clamp-2">{product.title}</h3>
      <p className="text-gray-600 text-sm mb-3 truncate">{product.category}</p>
      <div className="mt-auto flex items-center justify-between">
        <div className="text-lg font-semibold">${product.price.toFixed(2)}</div>
        <button
          onClick={() => onAdd(product)}
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}
