import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((s, i) => s + i.qty, 0)
  );
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-bold">
          Mini Store
        </NavLink>
        <nav className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-blue-600" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "text-blue-600" : "")}
          >
            Cart{" "}
            {totalItems > 0 && (
              <span className="ml-1 inline-block bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                {totalItems}
              </span>
            )}
          </NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) => (isActive ? "text-blue-600" : "")}
          >
            Checkout
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
    