import { useCallback, useEffect } from 'react';

const options = {
    threshold: 0.5,
};

function useInfiniteScroll(callback, target, disconnect, deps = []) {
    const handleObserver = useCallback(async (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            callback();
        }
    }, []);

    useEffect(() => {
        if (!target || disconnect) return;

        const observer = new IntersectionObserver(handleObserver, options);
        observer.observe(target);

        return () => {
            observer.disconnect();
        };
    }, [handleObserver, target, disconnect, ...deps]);

    return {};
}

export default useInfiniteScroll;
