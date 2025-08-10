import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

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
  title: "NovaShops",
  description:
    "NovaShops: Your destination for the latest trending shirts, tees, and fashion for boys. Shop stylish, high-quality apparel at unbeatable prices.",
  keywords:
    "NovaShops, boys fashion, trending shirts, boys tees, youth apparel, stylish shirts",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "NovaShops",
    description:
      "Discover NovaShops: fresh styles in boys’ shirts, tees, and fashion essentials. Shop now for exclusive deals!",
    url: "https://novashops.netlify.app",
    images: ["/logo.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaShops",
    description:
      "Shop the latest boys’ shirts & fashion at NovaShops. Quality apparel, fresh designs, great prices.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-N9HTBW4S');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>

      <body className="antialiased flex flex-col min-h-screen bg-white dark:bg-gray-900">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N9HTBW4S"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <LayoutWrapper>
          <main className="flex-grow w-full px-0 sm:px-2 md:px-4 lg:px-6 py-0">
            {children}
          </main>
        </LayoutWrapper>
      </body>
    </html>
  );
}
