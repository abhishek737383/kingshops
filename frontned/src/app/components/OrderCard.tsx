// components/OrderCard.tsx
import React from "react";
import Image from "next/image";

export type Order = {
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

export default function OrderCard({ order }: { order: Order }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image src={order.image} alt={order.productName} fill className="object-cover rounded" />
      </div>
      <div className="flex-1 grid grid-cols-2 gap-2 text-sm">
        <div><strong>Product:</strong> {order.productName}</div>
        <div><strong>Price:</strong> ₹{order.price.toFixed(2)}</div>
        <div><strong>Size:</strong> {order.size}</div>
        <div><strong>Color:</strong> {order.color}</div>
        <div><strong>Name:</strong> {order.fullName}</div>
        <div><strong>Contact:</strong> {order.contactNo}</div>
        <div className="col-span-2">
          <strong>Address:</strong> {order.address}, {order.city}, {order.state} – {order.pincode}
        </div>
      </div>
      <time className="text-xs text-gray-500 mt-2 md:mt-0">
        {new Date(order.createdAt).toLocaleString()}
      </time>
    </div>
  );
}
