import create from 'zustand';
import {
    createSupplier,
    fetchProductsBySupplier,
    fetchSupplier,
    fetchSuppliers,
    updateSupplier,
} from '../api/SupplierAPI';
import { supplierTypes } from '../constants/supplier';
import dayjs from 'dayjs';
import produce from 'immer';

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
    supplier: null,
    products: [],
    loading: false,
    error: null,
    fetchSuppliers: async (
        { from, to, active, name, teacher, type, product, teacherMobile, teacherEmail, page, limit },
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
                        result: [...(state.suppliers?.result || []), ...suppliers.result],
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
    fetchProductsBySupplier: async (supplierId) => {
        const products = await fetchProductsBySupplier(supplierId);
        set({ products });
    },
    createSupplier: async ({
        name,
        type,
        representative,
        mainTeacher,
        teachers,
        accountBank,
        accountNumber,
        registrationNumber,
        active,
        details,
        contractDate,
    }) => {
        const product = await createSupplier({
            name,
            type,
            representative,
            mainTeacher,
            teachers,
            accountBank,
            accountNumber,
            registrationNumber,
            active,
            details,
            contractDate,
        });

        set({ product });
    },
    updateSupplier: async (
        supplierId,
        {
            name,
            type,
            representative,
            mainTeacher,
            teachers,
            accountBank,
            accountNumber,
            registrationNumber,
            active,
            details,
            contractDate,
        },
    ) => {
        const supplier = await updateSupplier(supplierId, {
            name,
            type,
            representative,
            mainTeacher,
            teachers,
            accountBank,
            accountNumber,
            registrationNumber,
            active,
            details,
            contractDate,
        });

        set({ supplier });
        set(
            produce((state) => {
                const index = state.suppliers.result.findIndex((item) => item._id === supplier._id);
                state.suppliers.result[index] = supplier;
            }),
        );
    },
}));

export default useSuppliersStore;
