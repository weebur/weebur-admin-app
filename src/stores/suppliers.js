import create from 'zustand';
import { fetchSuppliers } from '../api/SupplierAPI';

const useSuppliersStore = create((set) => ({
    suppliers: {},
    loading: false,
    error: null,
    fetchSuppliers: async (
        {
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
        },
        loadMore,
    ) => {
        try {
            set({ loading: true });

            const suppliers = await fetchSuppliers({
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
            });

            if (loadMore) {
                set((state) => ({
                    suppliers: {
                        ...suppliers,
                        result: [
                            ...(state.suppliers?.result || []),
                            ...suppliers.result,
                        ],
                    },
                }));
            } else {
                set({ suppliers });
            }

            set({ loading: false });
        } catch (error) {
            set({ error });
            set({ loading: false });
        }
    },
    resetSuppliers: () => {
        set({ suppliers: {} });
    },
}));

export default useSuppliersStore;
