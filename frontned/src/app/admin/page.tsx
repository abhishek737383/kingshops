// app/admin/page.tsx
"use client";

import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import Image from "next/image";

// ─── TYPES ─────────────────────────────────────────────────────────────────────

type Product = {
  _id:       string;
  name:      string;
  price:     number;
  size:      string;
  imageUrls: string[];
};

type Order = {
  _id:         string;
  productName: string;
  price:       number;
  size:        string;
  image:       string;
  fullName:    string;
  contactNo:   string;
  city:        string;
  state:       string;
  pincode:     string;
  address:     string;
  color:       string;
  createdAt:   string;
};

type Payment = {
  _id:            string;
  orderId:        string;
  transactionId:  string;
  screenshotUrl:  string;
  createdAt:      string;
};

type Setting = {
  upiId:      string;
  qrCodeUrl:  string;
};

// ─── CONFIG ────────────────────────────────────────────────────────────────────

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const FRONTEND_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY!;

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

export default function AdminPage() {
  // — Auth state —
  const [key, setKey]               = useState("");
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("admin_auth") === "true") {
      setAuthorized(true);
    }
  }, []);

  function verifyKey(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!key.trim()) {
      alert("Enter secret key");
      return;
    }
    if (key === FRONTEND_SECRET) {
      localStorage.setItem("admin_auth", "true");
      setAuthorized(true);
    } else {
      alert("Invalid key");
    }
  }

  function handleLogout() {
    localStorage.removeItem("admin_auth");
    setAuthorized(false);
    setKey("");
  }

  // — Data state —
  const [products, setProducts]     = useState<Product[]>([]);
  const [loadingP, setLoadingP]     = useState(true);

  const [orders, setOrders]         = useState<Order[]>([]);
  const [loadingO, setLoadingO]     = useState(true);

  const [payments, setPayments]     = useState<Payment[]>([]);
  const [loadingPay, setLoadingPay] = useState(true);

  const [settings, setSettings]     = useState<Setting>({ upiId: "", qrCodeUrl: "" });
  const [qrFile, setQrFile]         = useState<File | null>(null);
  const [preview, setPreview]       = useState<string>("");
  const [saving, setSaving]         = useState(false);

  const [name, setName]             = useState("");
  const [price, setPrice]           = useState<number>(0);
  const [size, setSize]             = useState("");
  const [files, setFiles]           = useState<FileList | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const paymentsMap = payments.reduce<Record<string, Payment>>((acc, p) => {
    acc[p.orderId] = p;
    return acc;
  }, {});

  // — Fetch helpers —
  async function fetchProducts() {
    setLoadingP(true);
    try {
      const res = await fetch(`${BASE}/products`);
      setProducts(await res.json());
    } finally {
      setLoadingP(false);
    }
  }
  async function fetchOrders() {
    setLoadingO(true);
    try {
      const res = await fetch(`${BASE}/orders`);
      setOrders(await res.json());
    } finally {
      setLoadingO(false);
    }
  }
  async function fetchPayments() {
    setLoadingPay(true);
    try {
      const res = await fetch(`${BASE}/payments`);
      setPayments(await res.json());
    } finally {
      setLoadingPay(false);
    }
  }
  async function fetchSettings() {
    try {
      const res = await fetch(`${BASE}/settings`);
      const data: Setting = await res.json();
      setSettings(data);
      setPreview(data.qrCodeUrl);
    } catch {}
  }

  useEffect(() => {
    if (authorized) {
      fetchProducts();
      fetchOrders();
      fetchPayments();
      fetchSettings();
    }
  }, [authorized]);

  // — Form handlers —
  async function handleProductSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!files?.length) { alert("Select images"); return; }
    const form = new FormData();
    form.append("name", name);
    form.append("price", price.toString());
    form.append("size", size);
    Array.from(files).forEach(f => form.append("images", f));

    setSubmitting(true);
    try {
      const res = await fetch(`${BASE}/products`, {
        method: "POST",
        body:  form,
      });
      if (!res.ok) throw new Error("Upload failed");
      setName(""); setPrice(0); setSize(""); setFiles(null);
      await fetchProducts();
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteProduct(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch(`${BASE}/products/${id}`, { method: "DELETE" });
    fetchProducts();
  }

  function handleQrChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setQrFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  }

  async function saveSettings() {
    setSaving(true);
    try {
      const form = new FormData();
      form.append("upiId", settings.upiId);
      if (qrFile) form.append("qrCode", qrFile);

      const res = await fetch(`${BASE}/settings`, {
        method: "PUT",
        body:   form,
      });
      if (!res.ok) throw new Error("Save failed");
      const updated: Setting = await res.json();
      setSettings(updated);
      setPreview(updated.qrCodeUrl);
      alert("Settings saved");
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  }

  function copyOrder(o: Order) {
    const text = `
Product: ${o.productName}
Price: ₹${o.price}
Customer: ${o.fullName}
Contact: ${o.contactNo}
City: ${o.city}
State: ${o.state}
Pincode: ${o.pincode}
Size: ${o.size}
Color: ${o.color}
Address: ${o.address},

Ordered at: ${new Date(o.createdAt).toLocaleString()}`;
    navigator.clipboard.writeText(text).then(() => alert("Copied!"));
  }

  // ─── RENDER ──────────────────────────────────────────────────────────────────

  if (!authorized) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <form
          onSubmit={verifyKey}
          className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter Secret Key"
            value={key}
            onChange={e => setKey(e.target.value)}
            className="w-full p-4 border rounded-xl mb-4 focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Verify Key
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 lg:px-24 space-y-6">
      {/* Greeting & Logout */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Welcome, Admin
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Row 1: Add Product & Settings */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Add New Product */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
          <form onSubmit={handleProductSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="number"
              placeholder="Price"
              value={price || ""}
              onChange={e => setPrice(+e.target.value)}
              required
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              placeholder="Size"
              value={size}
              onChange={e => setSize(e.target.value)}
              required
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={e => setFiles(e.target.files)}
              required
              className="w-full"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              {submitting ? "Uploading…" : "Upload Product"}
            </button>
          </form>
        </div>

        {/* Payment Settings */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Payment Settings</h2>
          <div className="space-y-6">
            <label className="block">
              <span>UPI ID</span>
              <input
                value={settings.upiId}
                onChange={e =>
                  setSettings(s => ({ ...s, upiId: e.target.value }))
                }
                className="w-full p-4 mt-1 border rounded-xl focus:ring-2 focus:ring-indigo-400"
              />
            </label>
            <label className="block">
              <span>Upload QR Code</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleQrChange}
                className="w-full mt-1"
              />
            </label>
            {preview && (
              <div className="w-32 h-32 mx-auto relative">
                <Image
                  src={preview}
                  alt="QR preview"
                  fill
                  className="object-cover rounded-xl border"
                />
              </div>
            )}
            <button
              onClick={saveSettings}
              disabled={saving}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              {saving ? "Saving…" : "Save Settings"}
            </button>
          </div>
        </div>
      </section>

      {/* Row 2: Existing Products */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">Existing Products</h2>
        {loadingP ? (
          <p className="text-center text-gray-500">Loading products…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(p => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                <div
                  className="relative w-full h-56 cursor-pointer"
                  onClick={() => setSelectedImage(p.imageUrls[0])}
                >
                  <Image
                    src={p.imageUrls[0]}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="mt-2 text-green-600">₹{p.price}</p>
                  <p className="mt-1 text-gray-500">Size: {p.size}</p>
                  <button
                    onClick={() => handleDeleteProduct(p._id)}
                    className="mt-4 w-full bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Row 3: Recent Orders & Payments */}
      <section className="space-y-12">
        <h2 className="text-2xl font-bold text-center">Recent Orders & Payments</h2>
        {(loadingO || loadingPay) ? (
          <p className="text-center text-gray-500">Loading orders & payments…</p>
        ) : (
          <ul className="space-y-8">
            {orders.map(o => {
              const pay = paymentsMap[o._id];
              return (
                <li
                  key={o._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                >  
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Order Details */}
                    <div className="p-6 border-b lg:border-b-0 lg:border-r">
                      <div
                        className="relative w-full h-52 mb-4 cursor-pointer"
                        onClick={() => setSelectedImage(o.image)}
                      >
                        <Image
                          src={o.image}
                          alt={o.productName}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="mt-4 text-sm space-y-1">
                        <p><strong>Customer:</strong> {o.fullName}</p>
                        <p><strong>Contact:</strong> {o.contactNo}</p>
                        <p><strong>City:</strong> {o.city}</p>
                        <p><strong>State:</strong> {o.state}</p>
                        <p><strong>Pincode:</strong> {o.pincode}</p>
                        <p><strong>Address:</strong> {o.address}</p>
                        <p className="text-green-600 mt-1">₹{o.price}</p>
                        <p className="text-green-500 mt-1">
                          Size: {o.size}, Color: {o.color}
                        </p>
                      </div>
                      <time className="text-xs text-gray-400 block mt-2">
                        Ordered at {new Date(o.createdAt).toLocaleString()}
                      </time>
                      <button
                        onClick={() => copyOrder(o)}
                        className="mt-4 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
                        title="Copy order details"
                      >📋</button>
                    </div>
                    {/* Payment Details */}
                    <div className="p-6 bg-gray-50 flex flex-col items-center justify-center">
                      {pay ? (
                        <>
                          <div
                            className="relative w-32 h-32 mb-4 cursor-pointer"
                            onClick={() => setSelectedImage(pay.screenshotUrl)}
                          >
                            <Image
                              src={pay.screenshotUrl}
                              alt="Payment Screenshot"
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <p><strong>Txn ID:</strong> {pay.transactionId}</p>
                          <time className="text-xs text-gray-500 mt-1">
                            Paid on {new Date(pay.createdAt).toLocaleString()}
                          </time>
                        </>
                      ) : (
                        <p className="text-gray-500"><em>No payment received yet.</em></p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full view"
            className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </main>
  );
}
