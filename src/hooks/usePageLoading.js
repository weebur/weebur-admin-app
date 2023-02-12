import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const usePageLoading = () => {
    const router = useRouter();
    const [isRouting, setIsRouting] = useState(false);

    useEffect(() => {
        const handleRouteChange = () => {
            setIsRouting(true);
        };

        const handleRouteChangeEnd = () => {
            setIsRouting(false);
        };

        router.events.on('routeChangeStart', handleRouteChange);
        router.events.on('routeChangeComplete', handleRouteChangeEnd);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
            router.events.off('routeChangeComplete', handleRouteChangeEnd);
        };
    }, [setIsRouting]);

    return { isRouting };
};
