// app/order/ClientOrderForm.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

type OrderForm = {
  fullName:  string;
  contactNo: string;
  city:      string;
  state:     string;
  pincode:   string;
  address:   string;
  size:      string;
  color:     string;
};

export default function ClientOrderForm() {
  const params     = useSearchParams();
  const router     = useRouter();
  const name       = params.get("name")  || "";
  const price      = Number(params.get("price") || 0);
  const imagesAll  = params.getAll("allImages");
  const images     = imagesAll.length > 0 ? imagesAll : [];
  const initialIdx = parseInt(params.get("index") || "0", 10);

  const [current, setCurrent]       = useState(initialIdx);
  const total                       = images.length;

  const [form, setForm]             = useState<OrderForm>({
    fullName:  "",
    contactNo: "",
    city:      "",
    state:     "",
    pincode:   "",
    address:   "",
    size:      "",
    color:     "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // If user navigated with #order-form, scroll it into view and focus first input
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#order-form" && wrapperRef.current) {
      // small delay so layout stabilizes, especially on mobile
      setTimeout(() => {
        wrapperRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        const first = wrapperRef.current?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
          "input, textarea, button"
        );
        first?.focus?.();

        // Clear fragment so refresh/back won't re-scroll
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }, 80);
    }
  }, []);

  const prev = () => setCurrent(c => (c === 0 ? total - 1 : c - 1));
  const next = () => setCurrent(c => (c === total - 1 ? 0 : c + 1));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.size.trim()) {
      setError("Please enter a size.");
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        productName: name,
        price,
        image:       images[current] || "",
        ...form,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`,
        {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(payload),
        }
      );
      const body = await res.json();
      if (!res.ok) throw new Error(body?.message || `Status ${res.status}`);

      // Build a query string for the payment page
      const q = new URLSearchParams();
      q.set("orderId", body._id);
      images.forEach(img => q.append("allImages", img));
      q.set("index", current.toString());

      // Navigate to payment page with fragment so it scrolls the payment form into view
      router.push(`/payment?${q.toString()}#payment-form`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* IMAGE SLIDER */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-indigo-400 to-purple-500 p-1">
        <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden">
          <Image
            src={images[current] || ""}
            alt={`${name} ${current + 1}`}
            fill
            className="object-cover"
          />
          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
              >
                ›
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`block w-3 h-3 rounded-full transition-colors ${
                      i === current ? "bg-indigo-600" : "bg-white opacity-60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* PRODUCT INFO & FORM */}
      <div ref={wrapperRef} id="order-form" className="p-8 space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-gray-900">{name}</h1>
          <p className="text-xl text-green-600 font-semibold">
            ₹{price.toFixed(2)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "fullName",  placeholder: "Full Name" },
            { name: "contactNo", placeholder: "Contact No" },
            { name: "city",      placeholder: "City" },
            { name: "state",     placeholder: "State" },
            { name: "pincode",   placeholder: "Pincode" },
            { name: "size",      placeholder: "Size (e.g. M, L, 6…)" },
          ].map(({ name, placeholder }) => (
            <input
              key={name}
              name={name}
              value={(form as any)[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="
                w-full
                p-3 
                border border-gray-300 
                rounded-lg 
                placeholder-gray-500 
                focus:ring-2 focus:ring-indigo-400 
                focus:outline-none
                text-gray-900
              "
            />
          ))}

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Full Address"
            rows={2}
            className="
              w-full
              p-3 
              border border-gray-300 
              rounded-lg 
              placeholder-gray-500 
              focus:ring-2 focus:ring-indigo-400 
              focus:outline-none
              text-gray-900
              md:col-span-2
            "
          />

          <input
            name="color"
            value={form.color}
            onChange={handleChange}
            placeholder="Color"
            className="
              w-full
              p-3 
              border border-gray-300 
              rounded-lg 
              placeholder-gray-500 
              focus:ring-2 focus:ring-indigo-400 
              focus:outline-none
              text-gray-900
              md:col-span-2
            "
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="
            w-full 
            bg-indigo-600 
            text-white 
            py-4 
            rounded-xl 
            text-lg 
            font-semibold 
            hover:bg-indigo-700 
            transition 
            disabled:opacity-50
          "
        >
          {submitting ? "Placing Order…" : "Confirm Order"}
        </button>
      </div>
    </>
  );
}
