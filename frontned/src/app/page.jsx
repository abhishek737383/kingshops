// app/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

const SKELETON_COUNT = 8;

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`)
      .then(res => {
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-gray-100 to-white py-8 px-2 sm:px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-8">
        Explore Our <span className="text-indigo-600">Premium Collection</span>
      </h1>

      {loading && (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading products…</p>
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 mt-12">{error}</p>
      )}

      {loading && !error && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-3xl shadow-md p-4">
              <div className="bg-gray-200 rounded-2xl w-full aspect-square mb-4"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && (
        products.length === 0 ? (
          <p className="text-center text-gray-600 mt-12">
            No products available.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
            {products.map(p => (
              <ProductCard
                key={p._id}
                name={p.name}
                price={p.price}
                size={p.size}
                imageUrls={p.imageUrls}
              />
            ))}
          </div>
        )
      )}
    </main>
  );
}
