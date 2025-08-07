// app/payment/ClientPaymentForm.tsx
"use client";

import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useCallback,
} from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

export default function ClientPaymentForm() {
  const params    = useSearchParams();
  const router    = useRouter();
  const orderId   = params.get("orderId") || "";

  const [txnId, setTxnId]           = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const [upiId, setUpiId]         = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  // Fetch UPI settings at mount
  useEffect(() => {
    fetch(`${BASE}/settings`)
      .then(res => res.json())
      .then((s: { upiId: string; qrCodeUrl: string }) => {
        setUpiId(s.upiId);
        setQrCodeUrl(s.qrCodeUrl);
      })
      .catch(() => {
        // optional error handling
      });
  }, []);

  // File picker logic
  const fileInputRef = useRef<HTMLInputElement>(null);
  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setScreenshot(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSubmit = async () => {
    if (!orderId) {
      setError("Missing order ID in URL.");
      return;
    }
    if (!txnId.trim() || !screenshot) {
      setError("Please complete all steps.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("orderId", orderId);
      form.append("transactionId", txnId);
      form.append("screenshot", screenshot);

      const res = await fetch(`${BASE}/payments`, {
        method: "POST",
        body:   form,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || `Status ${res.status}`);
      }

      router.push(`/thank-you?orderId=${orderId}&txnId=${txnId}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Step 1: UPI Info */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Step 1: Make Payment via UPI</h2>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <p className="font-mono bg-gray-100 p-3 rounded text-center">
              {upiId || "Loading UPI..."}
            </p>
            {upiId && (
              <button
                onClick={() => navigator.clipboard.writeText(upiId)}
                className="mt-2 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 transition"
              >
                Copy UPI ID
              </button>
            )}
          </div>
          <div className="flex-1">
            {qrCodeUrl ? (
              <Image
                src={qrCodeUrl}
                alt="UPI QR Code"
                width={300}
                height={300}
                unoptimized
                className="mx-auto"
              />
            ) : (
              <p className="text-center text-gray-400">Loading QR code…</p>
            )}
          </div>
        </div>
      </section>

      {/* Step 2: Transaction ID */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Step 2: Enter Transaction ID</h2>
        <input
          type="text"
          placeholder="Transaction ID"
          value={txnId}
          onChange={e => setTxnId(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
      </section>

      {/* Step 3: Screenshot Upload */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Step 3: Upload Payment Screenshot</h2>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div
          onClick={openFilePicker}
          className={`cursor-pointer border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition hover:bg-indigo-50 ${
            error && !screenshot ? "border-red-400" : "border-indigo-300"
          }`}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-48 rounded-lg shadow-md"
            />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-indigo-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h10a4 4 0 004-4M16 7l-4-4m0 0L8 7m4-4v11"
                />
              </svg>
              <p className="text-indigo-600">Click here to upload</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
            </>
          )}
        </div>
      </section>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
      >
        {submitting ? "Submitting…" : "Submit Payment"}
      </button>
    </>
  );
}
