import create from 'zustand';
import { fetchProducts } from '../api/ProductAPI';

const useProductsStore = create((set) => ({
    products: {},
    loading: false,
    error: null,
    fetchProducts: async (
        {
            active,
            name,
            supplier,
            teacher,
            teacherMobile,
            teacherEmail,
            type,
            page,
            limit,
        },
        loadMore,
    ) => {
        try {
            set({ loading: true });

            const products = await fetchProducts({
                active,
                name,
                supplier,
                teacher,
                teacherMobile,
                teacherEmail,
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

            set({ loading: false });
        } catch (error) {
            set({ error });
            set({ loading: false });
        }
    },
    resetProducts: () => {
        set({ products: {} });
    },
}));

export default useProductsStore;
