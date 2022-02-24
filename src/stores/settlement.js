import create from 'zustand';
import { fetchOrdersBySupplierAndYearMonth } from '../api/SettlementAPI';

const useSettlementStore = create((set) => ({
    settlements: [],
    fetchOrdersBySupplierAndYearMonth: async ({ supplierId, year, month }) => {
        const settlements = await fetchOrdersBySupplierAndYearMonth({ supplierId, year, month });

        set({ settlements });
    },
}));

export default useSettlementStore;
