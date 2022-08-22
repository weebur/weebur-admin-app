import { toQueryObject } from '../utils/queryString';
import api from './';

export const getSalesByRange = (from, to, toCsv) => {
    return api.get('/analytics/sales', { params: { from, to, toCsv } }).then((res) => res.data);
};

export const getSalesByCompanyCategory = (from, to, companyCategory, toCsv) => {
    return api
        .get('/analytics/sales/companyCategory', { params: { from, to, companyCategory, toCsv } })
        .then((res) => res.data);
};
export const getSalesByClientType = (from, to, clientType, toCsv) => {
    return api.get('/analytics/sales/clientType', { params: { from, to, clientType, toCsv } }).then((res) => res.data);
};
export const getSalesByProduct = (from, to, toCsv) => {
    return api.get('/analytics/sales/product', { params: { from, to, toCsv } }).then((res) => res.data);
};
export const getSalesBySupplier = (from, to, toCsv) => {
    return api.get('/analytics/sales/supplier', { params: { from, to, toCsv } }).then((res) => res.data);
};
export const getBuyers = (from, to, toCsv) => {
    return api.get('/analytics/buyers', { params: { from, to, toCsv } }).then((res) => res.data);
};
