import { toQueryObject } from '../utils/queryString';
import api from './';

export const fetchClients = ({ page, limit, name, company, mobile, email, from, to }) => {
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

export const fetchClient = (id) => {
    return api.get(`/clients/${id}`).then((res) => res.data);
};

export const createClient = ({ name, company, mobile, phoneNumber, email, inflowPath, type, details }) => {
    return api
        .post('/clients', {
            name,
            company,
            mobile,
            phoneNumber,
            email,
            inflowPath,
            type,
            details,
        })
        .then((res) => res.data);
};

export const updateClient = (id, { name, company, mobile, phoneNumber, email, inflowPath, type, details }) => {
    return api
        .put(`/clients/${id}`, {
            name,
            company,
            mobile,
            phoneNumber,
            email,
            inflowPath,
            type,
            details,
        })
        .then((res) => res.data);
};

export const downLoadClients = ({ name, company, mobile, email, from, to }) => {
    return api
        .get('/clients/download', {
            params: toQueryObject({
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
