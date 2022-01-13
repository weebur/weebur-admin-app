import { toQueryObject } from '../utils/queryString';
import api from '.';

export const fetchProducts = ({
    active,
    name,
    supplier,
    teacher,
    teacherMobile,
    teacherEmail,
    type,
    page,
    limit,
}) => {
    return api
        .get('/products', {
            params: toQueryObject({
                active,
                name,
                supplier,
                teacher,
                teacherMobile,
                teacherEmail,
                type,
                page,
                limit,
            }),
        })
        .then((res) => res.data);
};

export const fetchProduct = (id) => {
    return api.get(`/products/${id}`).then((res) => res.data);
};
