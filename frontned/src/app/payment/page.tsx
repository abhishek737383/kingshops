// app/payment/page.tsx

import React, { Suspense } from "react";
import ClientPaymentForm from "./ClientPaymentForm";

export const dynamic = "force-dynamic";

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-start justify-center py-16 px-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-xl w-full p-8 space-y-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Complete Your Payment
        </h1>

        {/* Quick Guide */}
        <div className="bg-gray-100 p-4 rounded-lg space-y-2">
          <p className="font-semibold text-gray-800">How to Pay</p>
          <ul className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Copy the UPI ID or scan the QR code below.</li>
            <li>Open your UPI app and send the exact amount.</li>
            <li>Copy the transaction ID from your UPI app.</li>
            <li>Paste the transaction ID and upload your screenshot.</li>
          </ul>
        </div>

        <Suspense fallback={<p className="text-center">Loading payment form…</p>}>
          <ClientPaymentForm />
        </Suspense>

        <p className="text-center text-gray-600 text-sm">
          Once we verify your payment, we’ll confirm your order.
        </p>
      </div>
    </main>
  );
}
