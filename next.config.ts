const isProd = process.env.NODE_ENV === 'production';
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["andreisandu.net"],
    unoptimized: true,
  },
  reactStrictMode: true,
  basePath: isProd ? '/drupal_frontend' : '',
  assetPrefix: isProd ? '/drupal_frontend/' : '',
  // output: 'export',
};

module.exports = nextConfig;
