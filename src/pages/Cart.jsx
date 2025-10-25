import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null, title: "" });

  if (items.length === 0)
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-600">
          Go shopping
        </Link>
      </div>
    );

  const openConfirm = (id, title) => {
    setConfirmDelete({ show: true, id, title });
  };

  const handleContinue = () => {
    dispatch(removeFromCart(confirmDelete.id));
    toast.success(`✅ "${confirmDelete.title}" removed from cart!`);
    setConfirmDelete({ show: false, id: null, title: "" });
  };

  const handleCancel = () => {
    setConfirmDelete({ show: false, id: null, title: "" });
  };

  return (
    <div className="space-y-4">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <h2 className="text-2xl font-semibold">Your Cart</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded shadow">
            <div>
              <div className="font-semibold">{item.title}</div>
              <div className="text-gray-500 text-sm">
                ${item.price.toFixed(2)} × {item.qty}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(decreaseQty(item.id))}
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <button
                onClick={() => dispatch(increaseQty(item.id))}
                className="px-2 py-1 border rounded"
              >
                +
              </button>

              <button
                onClick={() => openConfirm(item.id, item.title)}
                className="px-3 py-1 border rounded text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow flex items-center justify-between">
        <div>
          <div className="text-lg">
            Total: <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => dispatch(clearCart())}
            className="px-3 py-2 border rounded"
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>

      {/* Custom confirmation modal */}
      {confirmDelete.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Remove item?</h3>
            <p className="mb-4">
              Are you sure you want to remove <strong>{confirmDelete.title}</strong> from the cart?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
