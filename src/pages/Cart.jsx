import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
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

  if (items.length === 0)
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-600">
          Go shopping
        </Link>
      </div>
    );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Your Cart</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onInc={(id) => dispatch(increaseQty(id))}
            onDec={(id) => dispatch(decreaseQty(id))}
            onRemove={(id) => dispatch(removeFromCart(id))}
          />
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
    </div>
  );
}
