/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "domki.szurag.pl",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
