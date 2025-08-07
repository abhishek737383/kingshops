// components/ProductCard.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductCard({ name, price, size, imageUrls }) {
  const [current, setCurrent] = useState(0);
  const total = imageUrls.length;
  const router = useRouter();

  const prev = () => setCurrent(c => (c === 0 ? total - 1 : c - 1));
  const next = () => setCurrent(c => (c === total - 1 ? 0 : c + 1));

  const handleOrder = () => {
    const params = new URLSearchParams();
    params.set("name", name);
    params.set("price", price.toString());
    params.set("size", size);
    imageUrls.forEach(url => params.append("allImages", url));
    params.set("index", current.toString());
    router.push(`/order?${params.toString()}`);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg transition-shadow hover:shadow-2xl">
      {/* Image Slider */}
      <div className="relative w-full aspect-square overflow-hidden">
        <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-105">
          <Image
            src={imageUrls[current]}
            alt={`${name} ${current + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
              aria-label="Next"
            >
              ›
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
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
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}
