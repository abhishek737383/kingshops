// app/head.jsx
export default function Head() {
  return (
    <>
      {/* 1. Let the viewport cover the full screen (under notches) */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />

      {/* 2. Force Android’s status-bar to white */}
      <meta name="theme-color" content="#ffffff" />

      {/* 3. Primary SEO tags */}
      <title>NovaShops </title>
      <meta
        name="description"
        content="NovaShops: Your destination for the latest trending shirts, tees, and fashion for boys. Shop stylish, high-quality apparel at unbeatable prices."
      />
      <meta
        name="keywords"
        content="NovaShops, boys fashion, trending shirts, boys tees, youth apparel, stylish shirts"
      />

      {/* 4. Favicon & Touch Icons */}
      <link rel="icon" href="/logo.png" />
      <link rel="shortcut icon" href="/logo.png" />
      <link rel="apple-touch-icon" href="/logo.png" />

      {/* 5. Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="NovaShops" />
      <meta
        property="og:description"
        content="Discover NovaShops: fresh styles in boys’ shirts, tees, and fashion essentials. Shop now for exclusive deals!"
      />
      <meta property="og:url" content="https://novashops.netlify.app" />
      <meta property="og:image" content="/logo.png" />

      {/* 6. Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="NovaShops" />
      <meta
        name="twitter:description"
        content="Shop the latest boys’ shirts & fashion at NovaShops. Quality apparel, fresh designs, great prices."
      />
      <meta name="twitter:image" content="/logo.png" />
    </>
  );
}
