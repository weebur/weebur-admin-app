import api from './';

export const fetchCompanies = ({ page, limit, name, category, from, to }) => {
    return api
        .get('/companies', {
            params: { page, limit, name, category, from, to },
        })
        .then((res) => res.data);
};
