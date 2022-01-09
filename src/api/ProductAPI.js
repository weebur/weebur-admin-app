import { toQueryObject } from '../utils/queryString';
import api from '.';

export const fetchProducts = ({ page, limit, name, category, from, to }) => {
    return api
        .get('/products', {
            params: toQueryObject({ page, limit, name, category, from, to }),
        })
        .then((res) => res.data);
};

export const fetchProduct = (id) => {
    return api.get(`/products/${id}`).then((res) => res.data);
};
