import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, ShoppingCart, CreditCard, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.qty, 0)
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-1 px-2 py-1 rounded transition ${
      isActive
        ? "text-blue-600 font-semibold"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <NavLink
            to="/"
            className="text-2xl font-bold text-blue-600 flex items-center gap-2"
          >
            <Home size={24} /> MyStore
          </NavLink>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          <motion.div whileHover={{ scale: 1.1 }}>
            <NavLink to="/" className={navLinkStyles}>
              <Home size={18} /> Home
            </NavLink>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} className="relative">
            <NavLink to="/cart" className={navLinkStyles}>
              <div className="flex items-center gap-1 relative">
                <ShoppingCart size={18} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                      className="absolute -top-3 -right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </NavLink>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }}>
            <NavLink to="/checkout" className={navLinkStyles}>
              <CreditCard size={18} /> Checkout
            </NavLink>
          </motion.div>
        </nav>

        {/* Hamburger Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-200"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white shadow-md overflow-hidden"
          >
            <div className="flex flex-col gap-2 px-6 py-4">
              <NavLink to="/" className={navLinkStyles} onClick={() => setMenuOpen(false)}>
                <Home size={18} /> Home
              </NavLink>

              <NavLink to="/cart" className={navLinkStyles} onClick={() => setMenuOpen(false)}>
                <div className="flex items-center gap-1 relative">
                  <ShoppingCart size={18} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </div>
                Cart
              </NavLink>

              <NavLink
                to="/checkout"
                className={navLinkStyles}
                onClick={() => setMenuOpen(false)}
              >
                <CreditCard size={18} /> Checkout
              </NavLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
