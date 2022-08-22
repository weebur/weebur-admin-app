import create from 'zustand';
import {
    getSalesByClientType,
    getSalesByCompanyCategory,
    getSalesByProduct,
    getSalesByRange,
    getSalesBySupplier,
    getBuyers,
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
    isLoading: false,
    fetchSalesByRange: async (from, to) => {
        set({ isLoading: true });
        const salesByRange = await getSalesByRange(from, to);
        set({ salesByRange, isLoading: false });
    },
    fetchSalesByCompanyCategory: async (from, to, companyCategory) => {
        set({ isLoading: true });
        const salesByCompanyCategory = await getSalesByCompanyCategory(from, to, companyCategory);
        set({ salesByCompanyCategory, isLoading: false });
    },
    fetchSalesByClientType: async (from, to, clientType) => {
        set({ isLoading: true });
        const salesByClientType = await getSalesByClientType(from, to, clientType);
        set({ salesByClientType, isLoading: false });
    },
    fetchSalesByProduct: async (from, to) => {
        set({ isLoading: true });
        const salesByProduct = await getSalesByProduct(from, to);
        set({ salesByProduct, isLoading: false });
    },
    fetchSalesBySupplier: async (from, to) => {
        set({ isLoading: true });
        const salesBySupplier = await getSalesBySupplier(from, to);
        set({ salesBySupplier, isLoading: false });
    },
    fetchBuyers: async (from, to) => {
        set({ isLoading: true });
        const buyers = await getBuyers(from, to);
        set({ buyers, isLoading: false });
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
