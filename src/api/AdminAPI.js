import { toQueryObject } from '../utils/queryString';
import api from './';

export const fetchAdmins = ({ page, limit, name, email }) => {
    return api
        .get('/admins', { params: toQueryObject({ page, limit, name, email }) })
        .then((res) => res.data);
};
