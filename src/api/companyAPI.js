import { toQueryObject } from '../utils/queryString';
import api from './';

export const fetchCompanies = ({ page, limit, name, category, from, to, businessId, sector, weeburId }) => {
    return api
        .get('/companies', {
            params: toQueryObject({ page, limit, name, category, from, to, businessId, sector, weeburId }),
        })
        .then((res) => res.data);
};

export const fetchCompany = (id) => {
    return api.get(`/companies/${id}`).then((res) => res.data);
};

export const createCompany = ({ name, category, details, partner, businessId, sector, weeburId }) => {
    return api
        .post('/companies', { name, category, details, partner, businessId, sector, weeburId })
        .then((res) => res.data);
};

export const updateCompany = (companyId, { name, category, details, partner, businessId, sector, weeburId }) => {
    return api
        .put(`/companies/${companyId}`, { name, category, details, partner, businessId, sector, weeburId })
        .then((res) => res.data);
};

export const downloadCompanies = ({ name, category, from, to, businessId, sector, weeburId }) => {
    return api
        .get('/companies/download', {
            params: toQueryObject({
                name,
                category,
                from,
                to,
                businessId,
                sector,
                weeburId,
            }),
        })
        .then((res) => res.data);
};
