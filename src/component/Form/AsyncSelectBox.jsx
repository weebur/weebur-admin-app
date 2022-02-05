import { Spin } from 'antd';
import debounce from 'lodash/debounce';
import { useEffect, useMemo, useRef, useState } from 'react';
import SelectBox from './SelectBox';

function AsyncSelectBox({ initialOptions = [], fetchOptions, debounceTimeout = 300, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState(initialOptions);
    const fetchRef = useRef(0);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);

            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    // useEffect(() => {
    //     console.log(initialOptions);
    //     setOptions(initialOptions);
    // }, [initialOptions]);

    return (
        <SelectBox
            showSearch
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            options={options}
            {...props}
        />
    );
}

export default AsyncSelectBox;
