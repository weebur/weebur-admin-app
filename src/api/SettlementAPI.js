import api from './index';
import { toQueryObject } from '../utils/queryString';

export const fetchOrdersBySupplierAndYearMonth = ({ supplierId, year, month }) => {
    return api.get('/settlements/orders', { params: toQueryObject({ supplierId, year, month }) });
};
