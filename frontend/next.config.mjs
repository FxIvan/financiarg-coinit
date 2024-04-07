/** @type {import('next').NextConfig} */
const nextConfig = {
  //permitir imagen https://tailwindui.com
  images: {
    domains: [
      "tailwindui.com",
      "cdn.shopify.com",
      "https://tailwindui.com",
      "1.bp.blogspot.com",
      "creativefabrica.com",
    ],
  },
};

export default nextConfig;
