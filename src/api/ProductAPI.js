import { toQueryObject } from '../utils/queryString';
import api from '.';

export const fetchProducts = ({ active, name, supplierName, type, page, limit }) => {
    return api
        .get('/products', {
            params: toQueryObject({
                active,
                name,
                supplierName,
                type,
                page,
                limit,
            }),
        })
        .then((res) => res.data);
};

export const fetchProduct = (id) => {
    return api.get(`/products/${id}`).then((res) => res.data);
};

export const createProduct = ({ name, type, fee, active, url, details, prices, supplierIds }) => {
    return api
        .post('/products', {
            name,
            type,
            fee,
            active,
            url,
            details,
            prices,
            supplierIds,
        })
        .then((res) => res.data);
};

export const updateProduct = (productId, { name, type, fee, active, url, details, prices, supplierIds }) => {
    return api
        .put(`/products/${productId}`, {
            name,
            type,
            fee,
            active,
            url,
            details,
            prices,
            supplierIds,
        })
        .then((res) => res.data);
};

export const downloadProducts = ({ active, name, supplierName, type }) => {
    return api
        .get('/products/download', {
            params: toQueryObject({
                active,
                name,
                supplierName,
                type,
            }),
        })
        .then((res) => res.data);
};
