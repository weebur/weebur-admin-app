import { toQueryObject } from '../utils/queryString';
import api from './';

export const fetchOrders = ({
    page,
    limit,
    name,
    company,
    mobile,
    email,
    from,
    to,
}) => {
    return api
        .get('/clients', {
            params: toQueryObject({
                page,
                limit,
                name,
                company,
                mobile,
                email,
                from,
                to,
            }),
        })
        .then((res) => res.data);
};
