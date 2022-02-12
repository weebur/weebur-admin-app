import { toQueryObject } from '../utils/queryString';
import api from './';

export const fetchOrders = ({
    createdStartAt,
    createdEndAt,
    reservedStartAt,
    reservedEndAt,
    adminName,
    companyName,
    clientName,
    reservationStatus,
    paymentStatus,
    productName,
    productType,
    page,
    limit,
}) => {
    return api
        .get('/orders', {
            params: toQueryObject({
                createdStartAt,
                createdEndAt,
                reservedStartAt,
                reservedEndAt,
                adminName,
                companyName,
                clientName,
                reservationStatus,
                paymentStatus,
                productName,
                productType,
                page,
                limit,
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
