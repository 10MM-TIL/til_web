/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  images: {
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'api.surfit.io',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
};

module.exports = nextConfig;
