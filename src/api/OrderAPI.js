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

export const updateOrderReservationStatus = ({
    orderIds,
    reservationStatus,
    latestReservationStatusUpdatedAt,
    cancellationReason,
}) => {
    return api
        .put('/orders/status/reservation', {
            orderIds,
            reservationStatus,
            latestReservationStatusUpdatedAt,
            cancellationReason,
        })
        .then((res) => res.data);
};

export const updateOrderPaymentStatus = ({ orderIds, paymentStatus, latestPaymentStatusUpdatedAt }) => {
    return api
        .put('/orders/status/payment', {
            orderIds,
            paymentStatus,
            latestPaymentStatusUpdatedAt,
        })
        .then((res) => res.data);
};

export const fetchOrderSchedules = ({ year, month, supplierId }) => {
    return api
        .get('/orders/calendar', {
            params: toQueryObject({
                year,
                month,
                supplierId,
            }),
        })
        .then((res) => res.data);
};

export const downloadOrders = ({
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
}) => {
    return api
        .get('/orders/download', {
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
            }),
        })
        .then((res) => res.data);
};
