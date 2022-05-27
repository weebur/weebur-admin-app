import nookies from 'nookies';

export const withToken = (
    fn = () => ({
        props: {},
    }),
) => {
    return (ctx) => {
        const cookies = nookies.get(ctx);
        const accessToken = cookies['x-access-token'];

        if (!accessToken) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }

        return fn(ctx);
    };
};
