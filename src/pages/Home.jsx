import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import Hero from "../components/Hero";
export default function Home() {
  const dispatch = useDispatch();
  const { items, status, maxPrice } = useSelector((state) => state.products);
  const [priceFilter, setPriceFilter] = useState(0);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  useEffect(() => {
    if (maxPrice) setPriceFilter(maxPrice);
  }, [maxPrice]);

  const filtered = useMemo(
    () => items.filter((p) => p.price <= priceFilter),
    [items, priceFilter]
  );

  return (
    <div className="space-y-10">

      {/* ✅ Hero Section */}
      <section className="">
        <Hero />
      </section>

      {/* ✅ Price Filter Section */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Products</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <div className="flex-1">
            <label className="text-sm">
              Max price: <span className="font-semibold">${priceFilter}</span>
            </label>
            <input
              type="range"
              min="0"
              max={maxPrice || 1000}
              value={priceFilter}
              onChange={(e) => setPriceFilter(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="mt-3 sm:mt-0">
            <div className="text-sm text-gray-600">
              Showing {filtered.length} of {items.length} products
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Products Grid */}
      {status === "loading" ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={(p) => dispatch(addToCart(p))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
