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
