import api from './index';
import { toQueryObject } from '../utils/queryString';

export const fetchOrdersBySupplierAndYearMonth = ({ supplierId, year, month }) => {
    return api
        .get('/settlements/orders', { params: toQueryObject({ supplierId, year, month }) })
        .then((res) => res.data);
};

export const fetchSettlements = ({ supplierName, supplierType, isCompleted, isPaid, year, month }) => {
    return api
        .get('/settlements', {
            params: toQueryObject({ supplierName, supplierType, isCompleted, isPaid, year, month }),
        })
        .then((res) => res.data);
};

export const updateSettlements = ({ year, month }) => {
    return api.post('/settlements', { year, month }).then((res) => res.data);
};

export const fetchSettlement = (id) => {
    return api.get(`/settlements/${id}`).then((res) => res.data);
};

export const updateSettlement = (id, settlement) => {
    return api.put(`/settlements/${id}`, settlement).then((res) => res.data);
};
