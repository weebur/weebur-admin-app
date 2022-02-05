import create from 'zustand';
import { createOrder, updateOrder } from '../api/OrderAPI';
import { paymentStatus, reservationStatus } from '../constants/order';
import { productTypes } from '../constants/product';
import { supplierTypes } from '../constants/supplier';
import dayjs from 'dayjs';
import { fetchProduct, fetchProducts } from '../api/ProductAPI';
import produce from 'immer';
import { fetchSuppliers } from '../api/SupplierAPI';

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
    formData: {
        products: [],
        suppliers: [],
        product: {},
    },
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
    fetchProducts: async (name) => {
        const products = await fetchProducts({ page: 1, limit: 10, name });

        set(
            produce((state) => {
                state.formData.products = products.result;
            }),
        );
        return products.result;
    },
    fetchSuppliersByProduct: async (productId) => {
        const suppliers = await fetchSuppliers({ page: 1, limit: 10, product: productId });

        set(
            produce((state) => {
                state.formData.suppliers = suppliers.result;
            }),
        );
        return suppliers.result;
    },
    fetchProduct: async (id) => {
        const product = await fetchProduct(id);

        set(
            produce((state) => {
                state.formData.product = product;
            }),
        );
    },
}));

export default useOrdersStore;
