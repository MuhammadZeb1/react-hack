import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl px-6 py-16 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* ✅ Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-4xl font-bold mb-4">Welcome to MyStore 🛒</h1>
          <p className="text-lg mb-6">
            Shop the latest products at unbeatable prices. Quality guaranteed!
          </p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-700 font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-100"
          >
            Shop Now
          </motion.button>
        </motion.div>

        {/* ✅ Right Side Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            alt="Shopping Banner"
            className="rounded-lg shadow-lg w-full max-w-md"
          />
        </motion.div>
      </div>
    </section>
  );
}
