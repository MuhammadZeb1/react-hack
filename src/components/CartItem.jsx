import React from "react";

export default function CartItem({ item, onInc, onDec, onRemove }) {
  return (
    <div className="flex gap-4 items-center bg-white p-3 rounded shadow-sm">
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-contain"
      />
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{item.title}</div>
        <div className="text-sm text-gray-600">${item.price.toFixed(2)}</div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onDec(item.id)}
          className="px-2 py-1 border rounded"
        >
          -
        </button>
        <div className="px-3">{item.qty}</div>
        <button
          onClick={() => onInc(item.id)}
          className="px-2 py-1 border rounded"
        >
          +
        </button>
      </div>
      <div className="w-28 text-right font-semibold">
        ${(item.price * item.qty).toFixed(2)}
      </div>
      <button onClick={() => onRemove(item.id)} className="ml-2 text-red-600">
        Remove
      </button>
    </div>
  );
}
