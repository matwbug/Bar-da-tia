/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
       ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                hostname: 'utfs.io'
            }
        ]
    }
};

export default nextConfig;
