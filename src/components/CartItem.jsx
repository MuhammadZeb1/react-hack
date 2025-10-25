import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({ item, onInc, onDec, onRemove }) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
      
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded"
      />

      {/* Product Info */}
      <div className="flex-1 min-w-0 flex flex-col sm:ml-4">
        <div className="font-semibold truncate text-gray-800">{item.title}</div>
        <div className="text-gray-500 text-sm mt-1">${item.price.toFixed(2)}</div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <button
          onClick={() => onDec(item.id)}
          className="p-2 border rounded-full hover:bg-gray-100 transition"
        >
          <Minus size={16} />
        </button>
        <div className="px-3 font-medium">{item.qty}</div>
        <button
          onClick={() => onInc(item.id)}
          className="p-2 border rounded-full hover:bg-gray-100 transition"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Total Price */}
      <div className="w-full sm:w-28 text-right font-semibold mt-2 sm:mt-0">
        ${(item.price * item.qty).toFixed(2)}
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="mt-2 sm:mt-0 ml-auto sm:ml-2 text-red-600 hover:text-red-800 transition"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}
