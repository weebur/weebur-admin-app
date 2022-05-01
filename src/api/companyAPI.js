import { toQueryObject } from '../utils/queryString';
import api from './';

export const fetchCompanies = ({ page, limit, name, category, from, to }) => {
    return api
        .get('/companies', {
            params: toQueryObject({ page, limit, name, category, from, to }),
        })
        .then((res) => res.data);
};

export const fetchCompany = (id) => {
    return api.get(`/companies/${id}`).then((res) => res.data);
};

export const createCompany = ({ name, category, details, partner }) => {
    return api.post('/companies', { name, category, details, partner }).then((res) => res.data);
};

export const updateCompany = (companyId, { name, category, details, partner }) => {
    return api.put(`/companies/${companyId}`, { name, category, details, partner }).then((res) => res.data);
};

export const downloadCompanies = ({ name, category, from, to }) => {
    return api
        .get('/companies/download', {
            params: toQueryObject({
                name,
                category,
                from,
                to,
            }),
        })
        .then((res) => res.data);
};
