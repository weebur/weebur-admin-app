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
