// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
// import Home from "./pages/home";
// import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";


export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </div>
  );
}
