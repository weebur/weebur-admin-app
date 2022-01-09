import { toQueryObject } from '../utils/queryString';
import api from '.';

export const fetchSuppliers = ({
    from,
    to,
    active,
    name,
    teacher,
    type,
    product,
    teacherMobile,
    teacherEmail,
    page,
    limit,
}) => {
    return api
        .get('/suppliers', {
            params: toQueryObject({
                from,
                to,
                active,
                name,
                teacher,
                type,
                product,
                teacherMobile,
                teacherEmail,
                page,
                limit,
            }),
        })
        .then((res) => res.data);
};

export const fetchSupplier = (id) => {
    return api.get(`/suppliers/${id}`).then((res) => res.data);
};