/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'dummyimage.com',
                port: '',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
