import { toQueryObject } from '../utils/queryString';
import api from './';

export const fetchOrders = ({
    page,
    limit,
    name,
    company,
    mobile,
    email,
    from,
    to,
}) => {
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

export const createOrder = ({
    reservationStatus,
    paymentStatus,
    statusDetails,
    product,
    supplier,
    reservationDate,
    participants,
    onlineInfo,
    payment,
    workshop,
}) => {
    return api
        .post('/orders', {
            reservationStatus,
            paymentStatus,
            statusDetails,
            product,
            supplier,
            reservationDate,
            participants,
            onlineInfo,
            payment,
            workshop,
        })
        .then((res) => res.data);
};

export const updateOrder = (
    orderId,
    {
        reservationStatus,
        paymentStatus,
        statusDetails,
        product,
        supplier,
        reservationDate,
        participants,
        onlineInfo,
        payment,
        workshop,
    },
) => {
    return api
        .put(`/orders/${orderId}`, {
            reservationStatus,
            paymentStatus,
            statusDetails,
            product,
            supplier,
            reservationDate,
            participants,
            onlineInfo,
            payment,
            workshop,
        })
        .then((res) => res.data);
};
