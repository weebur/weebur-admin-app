import { SWRConfig } from 'swr';

function WithFallback(Component) {
    const C = ({ fallback, ...pageProps }) => {
        console.log(pageProps);
        return (
            <SWRConfig value={{ fallback }}>
                <Component {...pageProps} />
            </SWRConfig>
        );
    };
    return C;
}

export default WithFallback;
