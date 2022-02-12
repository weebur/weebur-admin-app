import create from 'zustand';
import { fetchProduct, fetchProducts } from '../api/ProductAPI';
import produce from 'immer';
import { fetchSuppliers } from '../api/SupplierAPI';
import { fetchOrders } from '../api/OrderAPI';

const useOrdersStore = create((set) => ({
    orders: {},
    order: null,
    formData: {
        products: [],
        suppliers: [],
        product: {},
    },
    fetchOrders: async ({
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

        set({ orders });
    },
    resetOrders: () => {
        set({ orders: {} });
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
                        target.participants = order.participants;
                        target.statusDetails = order.statusDetails;
                        target.salesTotal = salesTotal[i];
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
            }),
        );
    },
}));

export default useOrdersStore;
