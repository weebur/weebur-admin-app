import create from 'zustand';
import {
    createProduct,
    fetchProduct,
    fetchProducts,
    updateProduct,
} from '../api/ProductAPI';
import produce from 'immer';
import dayjs from 'dayjs';

const defaultValues = {
    active: false,
    createdAt: dayjs().toISOString(),
    details: '',
    fee: 0.3,
    name: '',
    prices: null,
    suppliers: [],
    type: 'OFFLINE',
    url: '',
};

const useProductsStore = create((set) => ({
    products: {},
    product: null,
    loading: false,
    error: null,
    fetchProducts: async (
        { active, name, supplierName, type, page, limit },
        loadMore,
    ) => {
        const products = await fetchProducts({
            active,
            name,
            supplierName,
            type,
            page,
            limit,
        });

        if (loadMore) {
            set((state) => ({
                products: {
                    ...products,
                    result: [
                        ...(state.products?.result || []),
                        ...products.result,
                    ],
                },
            }));
        } else {
            set({ products });
        }
    },
    resetProducts: () => {
        set({ products: {} });
    },
    resetProduct: () => {
        set({ product: null });
    },
    initializeProduct: () => {
        set({ product: defaultValues });
    },
    fetchProduct: async (productId) => {
        const product = await fetchProduct(productId);

        set({ product });
    },
    createProduct: async ({
        name,
        type,
        fee,
        active,
        url,
        details,
        prices,
        supplierIds,
    }) => {
        const product = await createProduct({
            name,
            type,
            fee,
            active,
            url,
            details,
            prices,
            supplierIds,
        });

        set({ product });
    },
    updateProduct: async (
        productId,
        { name, type, fee, active, url, details, prices, supplierIds },
    ) => {
        const product = await updateProduct(productId, {
            name,
            type,
            fee,
            active,
            url,
            details,
            prices,
            supplierIds,
        });

        set({ product });
        set(
            produce((state) => {
                const index = state.products.result.findIndex(
                    (item) => item._id === product._id,
                );
                state.products.result[index] = product;
            }),
        );
    },
}));

export default useProductsStore;
