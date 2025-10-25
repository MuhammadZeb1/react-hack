import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Header() {
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.qty, 0)
  );

  const navLinkStyles = ({ isActive }) =>
    `transition hover:text-blue-600 ${
      isActive ? "text-blue-600 font-semibold" : "text-gray-700"
    }`;

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <NavLink
            to="/"
            className="text-2xl font-bold text-blue-600 tracking-wide"
          >
            MyStore
          </NavLink>
        </motion.div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <motion.div whileHover={{ scale: 1.1 }}>
            <NavLink to="/" className={navLinkStyles}>
              Home
            </NavLink>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }}>
            <NavLink to="/cart" className={navLinkStyles}>
              <div className="flex items-center gap-1">
                Cart
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </div>
            </NavLink>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }}>
            <NavLink to="/checkout" className={navLinkStyles}>
              Checkout
            </NavLink>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}
