// app/order/page.tsx

import React, { Suspense } from "react";
import ClientOrderForm from "./ClientOrderForm";

export const dynamic = "force-dynamic";

export default function OrderPage() {
  return (
    <section className="relative bg-gray-50 dark:bg-gray-900">
      {/* Top fade: gray-50 → transparent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-900" />

      <main className="min-h-screen flex items-start justify-center py-16 px-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
          {/* Header */}
          <div className="p-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Place Your Order
            </h1>
            <p className="mt-2 text-gray-600">
              Fill in your details and confirm to proceed to payment.
            </p>
          </div>

          {/* Client-only form */}
          <Suspense fallback={<p className="p-8 text-center">Loading order form…</p>}>
            <ClientOrderForm />
          </Suspense>
        </div>
      </main>

      {/* Bottom fade: gray-50 → transparent */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-900" />
    </section>
  );
}
