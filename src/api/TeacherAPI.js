import { toQueryObject } from '../utils/queryString';
import api from '.';

export const fetchTeachers = ({ page, limit, name }) => {
    return api
        .get('/teachers', {
            params: toQueryObject({ page, limit, name }),
        })
        .then((res) => res.data);
};

export const fetchTeacher = (id) => {
    return api.get(`/teachers/${id}`).then((res) => res.data);
};
