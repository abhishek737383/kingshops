// app/layout.jsx
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata = {
  title:       "TechSphere | Modern Electronics Store",
  description: "Your premier destination for cutting-edge electronics and gadgets",
  keywords:    "electronics, gadgets, tech, smartphones, laptops",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="antialiased flex flex-col min-h-screen bg-white dark:bg-gray-900">
        <LayoutWrapper>
          <main className="flex-grow w-full px-0 sm:px-2 md:px-4 lg:px-6 py-8 md:py-12">
            {children}
          </main>
        </LayoutWrapper>
      </body>
    </html>
  );
}
