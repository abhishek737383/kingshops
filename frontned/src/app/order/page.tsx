// app/order/page.tsx

import React, { Suspense } from "react";
import ClientOrderForm from "./ClientOrderForm";

export const dynamic = "force-dynamic";

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-start justify-center py-16 px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* You can add a static header/banner here if you like */}
        <div className="p-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Place Your Order</h1>
          <p className="mt-2 text-gray-600">
            Fill in your details and confirm to proceed to payment.
          </p>
        </div>

        {/* Client-only form and slider */}
        <Suspense fallback={<p className="p-8 text-center">Loading order form…</p>}>
          <ClientOrderForm />
        </Suspense>
      </div>
    </main>
  );
}
