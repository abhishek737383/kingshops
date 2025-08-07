// app/thank-you/page.tsx
import React, { Suspense } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import ClientThankYou from "./ClientThankYou";

// Force dynamic rendering so Next.js doesn’t try to statically export
export const dynamic = "force-dynamic";

export default function ThankYouPage() {
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

        {/* Client-only section */}
        <Suspense fallback={<p className="text-center">Loading details…</p>}>
          <ClientThankYou />
        </Suspense>
      </div>
    </main>
  );
}
