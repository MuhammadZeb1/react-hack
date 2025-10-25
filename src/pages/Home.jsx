import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import Hero from "../components/Hero";
import { motion } from "framer-motion";
import { Search, Filter, DollarSign } from "lucide-react";

export default function Home() {
  const dispatch = useDispatch();
  const { items, status, maxPrice } = useSelector((state) => state.products);

  const [priceFilter, setPriceFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Update max price filter on data load
  useEffect(() => {
    if (maxPrice) setPriceFilter(maxPrice);
  }, [maxPrice]);

  // Fetch products on initial load
  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  // Extract unique categories
  const categories = useMemo(() => {
    const all = items.map((item) => item.category);
    return ["All", ...new Set(all)];
  }, [items]);

  // Filter products based on search, category, and price
  const filtered = useMemo(() => {
    return items
      .filter((p) => p.price <= priceFilter)
      .filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((p) =>
        selectedCategory === "All" ? true : p.category === selectedCategory
      );
  }, [items, priceFilter, searchQuery, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      {/* Hero Section */}
      <Hero />

      {/* Filter Products Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 shadow-lg rounded-lg space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Filter Products
        </h2>
      </motion.div>

      {/* Search, Category, and Price Slider */}
      <div className="rounded-lg bg-white p-4 shadow-lg flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 items-center">
        {/* Search */}
        <div className="flex items-center flex-1 border border-gray-300 rounded-xl px-3 py-2 focus-within:ring focus-within:ring-indigo-300">
          <Search className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="flex items-center w-full sm:w-60 border border-gray-300 rounded-xl px-3 py-2 focus-within:ring focus-within:ring-indigo-300">
          <Filter className="text-gray-400 mr-2" size={18} />
          <select
            className="flex-1 outline-none bg-transparent text-gray-700"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Price Slider */}
        <div className="flex items-center flex-1 sm:flex-none w-full sm:w-60">
          <div className="flex items-center gap-2 w-full">
            <DollarSign className="text-gray-400" size={18} />
            <label className="block text-sm font-medium text-gray-700">
              Max Price: <span className="font-semibold">${priceFilter}</span>
            </label>
          </div>
          <input
            type="range"
            min="0"
            max={maxPrice || 1000}
            value={priceFilter}
            onChange={(e) => setPriceFilter(Number(e.target.value))}
            className="w-full mt-1 accent-indigo-500"
          />
        </div>
      </div>

      {/* Product Grid */}
      {status === "loading" ? (
        <div className="text-center py-20 text-lg text-gray-700">
          Loading...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-xl font-semibold text-gray-500">
          ❌ No products found. Try another filter.
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filtered.map((product) => (
            <motion.div
              key={product.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard
                product={product}
                onAdd={(p) => dispatch(addToCart(p))}
                className="bg-white text-gray-700"
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
