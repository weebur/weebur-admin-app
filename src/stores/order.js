import create from 'zustand';
import { createOrder, updateOrder } from '../api/OrderAPI';
import { paymentStatus, reservationStatus } from '../constants/order';
import { productTypes } from '../constants/product';
import { supplierTypes } from '../constants/supplier';
import dayjs from 'dayjs';

const defaultValues = {
    reservationStatus: reservationStatus.CONFIRM_SCHEDULE.key,
    paymentStatus: paymentStatus.WAITING.key,
    statusDetails: '',
    productId: '',
    productName: '',
    productType: productTypes.OFFLINE.key,
    productFee: 0,
    supplierId: '',
    supplierName: '',
    supplierType: supplierTypes.CORPORATION.key,
    mainTeacherId: '',
    mainTeacherName: '',
    mainTeacherMobile: '',
    reservationDate: dayjs().toISOString(),
    participants: 0,
    onlineInfo: {
        details: '',
        fileUrl: '',
    },
    payment: null,
    workshop: '',
};

const useOrdersStore = create((set) => ({
    order: null,
    createOrder: async ({
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
        const order = await createOrder({
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
        });

        set({ order });
    },
    updateOrder: async (
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
        const order = await updateOrder(orderId, {
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
        });

        set({ order });
    },
}));

export default useOrdersStore;
