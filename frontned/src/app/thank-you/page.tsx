// app/thank-you/page.tsx
"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ClipboardDocumentIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function ThankYouPage() {
  const params   = useSearchParams();
  const router   = useRouter();
  const orderId  = params.get("orderId") ?? "—";
  const txnId    = params.get("txnId")   ?? "—";

  const whatsappText = encodeURIComponent(
    `Hello! 👋\n` +
    `I just completed my payment.\n` +
    `Order ID: ${orderId}\n` +
    `Transaction ID: ${txnId}\n\n` +
    `Please share my tracking details. Thanks!`
  );
  const whatsappUrl = `https://wa.me/919140726581?text=${whatsappText}`;

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-start justify-center py-20 px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 space-y-8">
        {/* Success Banner */}
        <div className="flex flex-col items-center text-center space-y-2">
          <CheckCircleIcon className="h-12 w-12 text-green-500" />
          <h1 className="text-4xl font-extrabold text-gray-900">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. We’re verifying your payment now.
          </p>
        </div>

        {/* IDs Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { label: "Order ID", value: orderId },
            { label: "Transaction ID", value: txnId },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 p-4 rounded-lg relative">
              <p className="text-sm text-gray-500">{label}</p>
              <p className="font-mono mt-1">{value}</p>
              <ClipboardDocumentIcon
                className="h-5 w-5 text-gray-400 absolute top-4 right-4 cursor-pointer hover:text-gray-600"
                onClick={() => copyToClipboard(value)}
              />
            </div>
          ))}
        </div>

        {/* WhatsApp & Home CTA */}
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              For order details & real-time tracking, message us on WhatsApp:
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.52 3.48A11.865 11.865 0 0012 0C5.373 0 0 5.373 0 12c0 2.113.551 4.186 1.597 5.983L0 24l6.301-1.582A11.92 11.92 0 0012 24c6.627 0 12-5.373 12-12 0-3.197-1.249-6.205-3.48-8.52zM12 22a9.89 9.89 0 01-5.032-1.353l-.36-.217-3.744.94.994-3.644-.23-.374A9.957 9.957 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm5.5-7.5c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.15-.198.297-.77.967-.944 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.786-1.48-1.758-1.655-2.055-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.297.298-.496.099-.198.05-.372-.025-.52-.075-.148-.672-1.618-.92-2.217-.242-.583-.487-.504-.672-.513l-.57-.01c-.198 0-.52.074-.792.372-.273.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.877 1.213 3.074.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.695.626.712.226 1.36.194 1.872.118.571-.085 1.758-.718 2.005-1.41.248-.694.248-1.29.173-1.41-.074-.122-.273-.198-.57-.347z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    </main>
  );
}
