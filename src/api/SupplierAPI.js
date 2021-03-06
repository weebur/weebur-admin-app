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

export const fetchSupplier = (id, withoutToken) => {
    return api.get(`/suppliers/${id}`, { params: { withoutToken } }).then((res) => res.data);
};

export const fetchProductsBySupplier = (id) => {
    return api.get(`/suppliers/${id}/products`).then((res) => res.data);
};

export const createSupplier = ({
    name,
    type,
    representative,
    mainTeacher,
    teachers,
    accountBank,
    accountNumber,
    registrationNumber,
    active,
    details,
    contractDate,
}) => {
    return api
        .post('/suppliers', {
            name,
            type,
            representative,
            mainTeacher,
            teachers,
            accountBank,
            accountNumber,
            registrationNumber,
            active,
            details,
            contractDate,
        })
        .then((res) => res.data);
};

export const updateSupplier = (
    supplierId,
    {
        name,
        type,
        representative,
        mainTeacher,
        teachers,
        accountBank,
        accountNumber,
        registrationNumber,
        active,
        details,
        contractDate,
    },
) => {
    return api
        .put(`/suppliers/${supplierId}`, {
            name,
            type,
            representative,
            mainTeacher,
            teachers,
            accountBank,
            accountNumber,
            registrationNumber,
            active,
            details,
            contractDate,
        })
        .then((res) => res.data);
};

export const downloadSuppliers = ({ from, to, active, name, teacher, type, product, teacherMobile, teacherEmail }) => {
    return api
        .get('/suppliers/download', {
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
            }),
        })
        .then((res) => res.data);
};
