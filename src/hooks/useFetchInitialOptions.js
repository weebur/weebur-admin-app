import { useEffect, useState } from 'react';

function UseFetchInitialOptions(fetchItems, id) {
    const [options, setOptions] = useState([]);
    useEffect(() => {
        if (id) {
            fetchItems(id)
                .then((item) =>
                    setOptions([
                        {
                            label: item.name,
                            value: item._id,
                            key: item._id,
                        },
                    ]),
                )
                .catch(() => setOptions([]));
        }
    }, [id]);

    return { options };
}

export default UseFetchInitialOptions;
