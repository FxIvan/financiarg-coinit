/** @type {import('next').NextConfig} */
const nextConfig = {
  //permitir imagen https://tailwindui.com
  images: {
    domains: [
      "tailwindui.com",
      "cdn.shopify.com",
      "https://tailwindui.com",
      "1.bp.blogspot.com",
      "www.creativefabrica.com",
    ],
  },
};

export default nextConfig;
