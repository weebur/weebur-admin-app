import { useEffect, useState } from 'react';

function UseMount(effect, deps) {
    const [mount, setMount] = useState(false);

    useEffect(() => {
        if (!mount) return;
        effect();
    }, deps);

    useEffect(() => {
        setMount(true);
    }, []);
}

export default UseMount;
