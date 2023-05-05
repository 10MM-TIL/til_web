/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
    removeConsole: process.env.NODE_ENV === 'production',
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
    domains: ['search.pstatic.net'],
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
  webpack: (config) => {
    // 아래를 추가합니다.
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  trailingSlash: true,
  rewrites: () => [
    {
      source: '/oauth2/v1/:path*', // url이 source에 해당될 경우
      destination: 'https://www.googleapis.com/oauth2/v1/:path*', // destination으로 redirect
    },
  ],
};

module.exports = nextConfig;
