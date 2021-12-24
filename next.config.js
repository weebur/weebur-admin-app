module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
                source: '/api/:path*',
            },
        ];
    },
};
