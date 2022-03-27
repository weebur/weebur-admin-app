import create from 'zustand';
import {
    getSalesByClientType,
    getSalesByCompanyCategory,
    getSalesByProduct,
    getSalesByRange,
    getSalesBySupplier,
} from '../api/AnalyticsAPI';
import dayjs from 'dayjs';
import { companyCategories } from '../constants/company';
import { clientsTypes } from '../constants/client';

const useAnalyticsStore = create((set, get) => ({
    salesByRange: null,
    salesByCompanyCategory: null,
    salesByClientType: null,
    salesByProduct: null,
    salesBySupplier: null,
    initialFactors: {
        from: dayjs().subtract(1, 'year').endOf('month').toISOString(),
        to: dayjs().endOf('month').toISOString(),
        companyCategory: companyCategories.LARGE.key,
        clientType: clientsTypes.HR.key,
        fromMonth: dayjs().subtract(1, 'month').startOf('day').toISOString(),
        toMonth: dayjs().endOf('month').toISOString(),
    },
    fetchSalesByRange: async (from, to) => {
        const salesByRange = await getSalesByRange(from, to);
        set({ salesByRange });
    },
    fetchSalesByCompanyCategory: async (from, to, companyCategory) => {
        const salesByCompanyCategory = await getSalesByCompanyCategory(from, to, companyCategory);
        set({ salesByCompanyCategory });
    },
    fetchSalesByClientType: async (from, to, clientType) => {
        const salesByClientType = await getSalesByClientType(from, to, clientType);
        set({ salesByClientType });
    },
    fetchSalesByProduct: async (from, to) => {
        const salesByProduct = await getSalesByProduct(from, to);
        set({ salesByProduct });
    },
    fetchSalesBySupplier: async (from, to) => {
        const salesBySupplier = await getSalesBySupplier(from, to);
        set({ salesBySupplier });
    },
    refresh: () => {
        set({
            salesByRange: null,
            salesByCompanyCategory: null,
            salesByClientType: null,
            salesByProduct: null,
            salesBySupplier: null,
        });

        const { from, to, companyCategory, clientType, fromMonth, toMonth } = get().initialFactors;
        get().fetchSalesByRange(from, to);
        get().fetchSalesByCompanyCategory(from, to, companyCategory);
        get().fetchSalesByClientType(from, to, clientType);
        get().fetchSalesByProduct(fromMonth, toMonth);
        get().fetchSalesBySupplier(fromMonth, toMonth);
    },
}));

export default useAnalyticsStore;
