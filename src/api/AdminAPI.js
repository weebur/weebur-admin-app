import api from './';

export const fetchAdmins = ({ page, limit }) => {
    return api
        .get('/admins', { params: { page, limit } })
        .then((res) => res.data);
};
