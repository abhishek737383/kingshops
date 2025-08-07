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

      {/* 3. (Optional) your existing SEO metadata lives in layout.metadata */}
      <title>TechSphere | Modern Electronics Store</title>
      <meta
        name="description"
        content="Your premier destination for cutting-edge electronics and gadgets"
      />
      <meta
        name="keywords"
        content="electronics, gadgets, tech, smartphones, laptops"
      />
    </>
  );
}
