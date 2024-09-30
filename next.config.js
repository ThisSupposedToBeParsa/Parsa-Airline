/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async headers() {
    return [
      // Set CORS headers to allow cross-origin requests
      {
        source: "/api/messages",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Update with specific origins if required
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, PATCH, DELETE, X-Api-Key", // Add other allowed methods if necessary
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-API-Key, Content-Type", // Add other allowed headers if necessary
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
