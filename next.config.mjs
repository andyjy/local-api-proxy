const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          // match all routes except _next and api
          source: "/:path((?!_next|api/).*)*",
          destination: "/api/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
