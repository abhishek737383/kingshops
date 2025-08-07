// components/Header.jsx
import Image from "next/image";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-10">
      <div className="container mx-auto px-4 text-center">
        <h1
          className="opacity-0 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-lg animate-slide-down"
          style={{ animationDelay: "0.3s" }}
        >
          Get <span className="text-yellow-300">Free Fashion Trend</span> Updates on WhatsApp
        </h1>

        <p
          className="opacity-0 mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-white/90 animate-slide-down"
          style={{ animationDelay: "0.6s" }}
        >
          Join our style community for daily outfit inspirations, exclusive collection alerts,
          limited offers, and expert fashion tips directly on WhatsApp!
        </p>

        <div
          className="mt-10 inline-flex items-center justify-center gap-6 opacity-0 animate-slide-down"
          style={{ animationDelay: "0.9s" }}
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp Logo"
            width={55}
            height={55}
            priority
            unoptimized
            className="drop-shadow-2xl"
          />

          <a
            href="https://chat.whatsapp.com/GXzqDtFkjyG11O4CfGOZ3j"
            target="_self"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 font-semibold rounded-full shadow-lg bg-gradient-to-r from-red-400 via-red-500 to-blue-600 hover:scale-105 transition-transform duration-300"
            style={{ animationDelay: "1.2s" }}
          >
            <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-black" />
            <span className="text-lg text-black">Join Now</span>
          </a>
        </div>
      </div>
    </section>
  );
}
