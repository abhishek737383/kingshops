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
