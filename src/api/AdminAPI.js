import { toQueryObject } from '../utils/queryString';
import api from './';

export const fetchAdmins = ({ page, limit, name, email }) => {
    return api.get('/admins', { params: toQueryObject({ page, limit, name, email }) }).then((res) => res.data);
};

export const login = ({ email, password }) => {
    return api.post('/admins/login', { email, password }).then((res) => res.data);
};

export const signup = ({ email, password, name, mobile }) => {
    return api.post('/admins/register', { email, password, name, mobile }).then((res) => res.data);
};

export const logout = () => {
    return api.post('/admins/logout', {}).then((res) => res.data);
};

export const fetchMe = () => {
    return api.get('/admins/me').then((res) => res.data);
};

export const approveAdmin = (adminId) => {
    return api.put(`/admins/approve/${adminId}`).then((res) => res.data);
};

export const updateAdmin = (adminId, { name, email, mobile }) => {
    return api.put(`/admins/${adminId}`, { name, email, mobile }).then((res) => res.data);
};
