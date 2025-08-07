// components/Footer.jsx
import React from "react";
import { MdCollections, MdLocalOffer, MdStyle } from "react-icons/md";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

function FeatureCard({ icon, title, description, accentClass }) {
  return (
    <div
      className={`
        flex flex-col items-center text-center
        bg-white rounded-2xl p-6
        shadow-2xl border border-gray-200
        transform transition-transform duration-300
        hover:scale-105
        ${accentClass}
      `}
    >
      <div className="p-4 rounded-full shadow-lg bg-white">
        <div className="h-9 w-10 flex items-center justify-center">{icon}</div>
      </div>
      <h3 className="mt-4 text-xl font-extrabold text-gray-900 leading-snug">
        {title}
      </h3>
      <p className="mt-2 text-sm sm:text-base text-gray-800 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function Footer() {
  return (
    <div className="bg-gray-50 pt-20 pb-8">
      {/* ↪ Use the same container/padding as your main pages */}
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          What We Offer / हम क्या पेश करते हैं?
        </h2>

        <div
          className="
            grid
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            gap-8
            w-full
          "
        >
          <FeatureCard
            icon={<MdCollections className="h-10 w-10 text-indigo-600" />}
            accentClass="bg-gradient-to-tr from-indigo-50 to-indigo-100"
            title="Top Brands / टॉप ब्रांड्स"
            description="Shirts, pants, टी-शर्ट्स और ट्रैकपैंट – ट्रेंडिंग कलेक्शन्स उपलब्ध हैं!"
          />

          <FeatureCard
            icon={<MdLocalOffer className="h-10 w-10 text-pink-600" />}
            accentClass="bg-gradient-to-tr from-pink-50 to-pink-100"
            title="Low-Budget Products"
            description="ब्रांडेड स्टाइल्स सिर्फ ₹299 से शुरू – जबरदस्त बचत!"
          />

          <FeatureCard
            icon={<MdStyle className="h-10 w-10 text-purple-600" />}
            accentClass="bg-gradient-to-tr from-purple-50 to-purple-100"
            title="High-Margin Wholesale"
            description="Retailers के लिए डिस्काउंट रेट्स – प्रॉफिट बढ़ाने का मौका!"
          />

          <FeatureCard
            icon={
              <ChatBubbleBottomCenterTextIcon className="h-10 w-10 text-yellow-600" />
            }
            accentClass="bg-gradient-to-tr from-yellow-50 to-yellow-100"
            title="Exclusive Deals"
            description="व्हाट्सएप ग्रुप में एक्सक्लूसिव डील्स और छूट – अभी जॉइन करें!"
          />

          <FeatureCard
            icon={<MdLocalOffer className="h-10 w-10 text-green-600" />}
            accentClass="bg-gradient-to-tr from-green-50 to-green-100"
            title="Fast Delivery & Easy Returns"
            description="तेज़ डिलीवरी और आसान रिटर्न – कस्टमर सैटिस्फैक्शन गारंटी!"
          />

          <FeatureCard
            icon={<MdCollections className="h-10 w-10 text-red-600" />}
            accentClass="bg-gradient-to-tr from-red-50 to-red-100"
            title="Direct WhatsApp Support"
            description="ऑर्डर या सवाल? हमें व्हाट्सएप पर सीधा मैसेज करें!"
          />
        </div>

        <footer
          className="relative z-10 mt-20 py-8 text-center text-sm text-gray-500"
        >
          <div className="space-x-6">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </div>
          <p className="mt-3">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
