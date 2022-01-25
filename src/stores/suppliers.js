import create from 'zustand';
import { fetchSupplier, fetchSuppliers } from '../api/SupplierAPI';
import { supplierTypes } from '../constants/supplier';
import dayjs from 'dayjs';

const defaultValues = {
    name: '',
    type: supplierTypes.CORPORATION.key,
    representative: '',
    mainTeacher: null,
    teachers: [],
    accountBank: '',
    accountNumber: '',
    registrationNumber: '',
    active: true,
    details: '',
    contractDate: dayjs().toISOString(),
};

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
    resetSupplier: () => {
        set({ supplier: null });
    },
    initializeSupplier: () => {
        set({ supplier: defaultValues });
    },
    fetchSupplier: async (supplierId) => {
        const supplier = await fetchSupplier(supplierId);

        set({ supplier });
    },
    createSupplier: async ({
        name,
        type,
        fee,
        active,
        url,
        details,
        prices,
        supplierIds,
    }) => {
        const product = await create({
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
    updateSupplier: async (
        productId,
        { name, type, fee, active, url, details, prices, supplierIds },
    ) => {
        const product = await updateSupplier(productId, {
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

export default useSuppliersStore;
