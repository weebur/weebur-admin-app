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
    experimental: {
        // ssr and displayName are configured by default
        styledComponents: true,
        scrollRestoration: true,
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/admins',
                permanent: true,
            },
        ];
    },
};
