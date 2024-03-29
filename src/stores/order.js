import create from 'zustand';
import { fetchProduct, fetchProducts } from '../api/ProductAPI';
import produce from 'immer';
import { fetchSuppliers } from '../api/SupplierAPI';
import { fetchOrders, updateOrderPaymentStatus, updateOrderReservationStatus } from '../api/OrderAPI';
import { cloneDeep } from 'lodash-es';

const useOrdersStore = create((set) => ({
    orders: {},
    order: null,
    formData: {
        products: [],
        suppliers: [],
        product: {},
    },
    fetchOrders: async (
        {
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
        },
        loadMore,
    ) => {
        const orders = await fetchOrders({
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
        });

        if (loadMore) {
            set((state) => ({
                orders: {
                    ...orders,
                    result: [...(state.orders?.result || []), ...orders.result],
                },
            }));
        } else {
            set({ orders });
        }
    },
    resetOrders: () => {
        set({ orders: {} });
    },
    fetchProducts: async (name) => {
        const products = await fetchProducts({ page: 1, limit: 10, name, active: true });

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
    addOrdersByWorkshop: (workshop, salesTotal) => {
        const { _id, clientName, companyName, adminName, createdAt, paymentMethod } = workshop;
        set(
            produce((state) => {
                const orders = cloneDeep(workshop.orders).map((order, i) => {
                    order.salesTotal = salesTotal[i];
                    order.workshop = {
                        _id,
                        clientName,
                        companyName,
                        adminName,
                        createdAt,
                        paymentMethod,
                    };

                    return order;
                });
                state.orders.result = [...orders, ...(state.orders.result || [])];
                state.orders.result.sort((a, b) => {
                    if (a.contactedDate > b.contactedDate) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
            }),
        );
    },
    updateOrdersByWorkshop: (workshop, salesTotal) => {
        const { _id, clientName, companyName, adminName, createdAt, paymentMethod, orders } = workshop;
        set(
            produce((state) => {
                orders.forEach((order, i) => {
                    const target = state.orders.result?.find((item) => item._id === order._id);

                    if (target) {
                        target._id = order._id;
                        target.createdAt = order.createdAt;
                        target.reservationStatus = order.reservationStatus;
                        target.reservationDate = order.reservationDate;
                        target.paymentStatus = order.paymentStatus;
                        target.productName = order.productName;
                        target.productType = order.productType;
                        target.latestReservationStatusUpdatedAt = order.latestReservationStatusUpdatedAt;
                        target.latestPaymentStatusUpdatedAt = order.latestPaymentStatusUpdatedAt;
                        target.participants = order.participants;
                        target.statusDetails = order.statusDetails;
                        target.salesTotal = salesTotal[i];
                        target.contactedDate = workshop.createdAt;
                        target.workshop = {
                            _id,
                            clientName,
                            companyName,
                            adminName,
                            createdAt,
                            paymentMethod,
                        };
                    }
                });

                state.orders.result?.sort((a, b) => {
                    if (a.contactedDate > b.contactedDate) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
            }),
        );
    },
    updateOrderStatus: async ({
        type,
        orderIds,
        reservationStatus,
        latestPaymentStatusUpdatedAt,
        paymentStatus,
        latestReservationStatusUpdatedAt,
        cancellationReason,
    }) => {
        if (type === 'reservation') {
            await updateOrderReservationStatus({
                orderIds,
                reservationStatus,
                latestReservationStatusUpdatedAt,
                cancellationReason,
            });
        }
        if (type === 'payment') {
            await updateOrderPaymentStatus({
                orderIds,
                latestPaymentStatusUpdatedAt,
                paymentStatus,
            });
        }

        set(
            produce((state) => {
                orderIds.forEach((id) => {
                    const target = state.orders.result?.find((item) => item._id === id);

                    if (target) {
                        if (type === 'reservation') {
                            target.reservationStatus = reservationStatus;
                            target.latestReservationStatusUpdatedAt = latestReservationStatusUpdatedAt;
                        }

                        if (type === 'payment') {
                            target.paymentStatus = paymentStatus;

                            target.latestPaymentStatusUpdatedAt = latestPaymentStatusUpdatedAt;
                        }
                    }
                });
            }),
        );
    },
}));

export default useOrdersStore;
