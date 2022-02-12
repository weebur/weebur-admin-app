import qs from 'query-string';

export const toQueryObject = (obj) => {
    return qs.parse(
        qs.stringify(obj, {
            skipNull: true,
            skipEmptyString: true,
        }),
    );
};
