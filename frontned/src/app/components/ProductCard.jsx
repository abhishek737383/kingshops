// components/ProductCard.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductCard({ name, price, size, imageUrls }) {
  const [current, setCurrent] = useState(0);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const total = imageUrls.length;
  const router = useRouter();

  const prev = () => {
    if (loadingOrder) return;
    setCurrent(c => (c === 0 ? total - 1 : c - 1));
  };
  const next = () => {
    if (loadingOrder) return;
    setCurrent(c => (c === total - 1 ? 0 : c + 1));
  };

  const handleOrder = () => {
    if (loadingOrder) return;
    setLoadingOrder(true);

    // Build query params:
    const params = new URLSearchParams();
    params.set("name", name);
    params.set("price", price.toString());
    params.set("size", size);
    imageUrls.forEach(url => params.append("allImages", url));
    params.set("index", current.toString());

    // tiny delay so overlay is visible, then navigate to order page with fragment
     setTimeout(() => {
      router.push(`/order?${params.toString()}#order-top`);
    }, 250);
  };

  return (
    <div className="relative group w-full bg-white rounded-3xl overflow-hidden shadow-lg transition-shadow hover:shadow-2xl">
      {/* Loading overlay */}
      {loadingOrder && (
        <div className="absolute inset-0 bg-white/80 z-20 flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin mb-3"></div>
          <p className="text-gray-700 font-medium">Ordering…</p>
        </div>
      )}

      {/* Image Slider */}
      <div className="relative w-full aspect-square overflow-hidden">
        <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-105">
          <Image
            src={imageUrls[current]}
            alt={`${name} ${current + 1}`}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {total > 1 && (
          <>
            <button
              onClick={prev}
              disabled={loadingOrder}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow disabled:opacity-50"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={next}
              disabled={loadingOrder}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow disabled:opacity-50"
              aria-label="Next"
            >
              ›
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {imageUrls.map((_, i) => (
                <span
                  key={i}
                  className={`block w-2 h-2 rounded-full ${
                    i === current ? "bg-indigo-600" : "bg-white"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Details & Order */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
        <p className="mt-1 text-gray-600">
          Size: <span className="font-medium">{size}</span>
        </p>
        <p className="mt-4 text-xl font-bold text-green-600">
          ₹{price.toFixed(2)}
        </p>
        <button
          onClick={handleOrder}
          disabled={loadingOrder}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition"
        >
          {loadingOrder ? "Ordering…" : "Order Now"}
        </button>
      </div>
    </div>
  );
}
