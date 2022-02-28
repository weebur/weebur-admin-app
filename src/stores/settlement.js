import create from 'zustand';
import { fetchOrdersBySupplierAndYearMonth, fetchSettlements } from '../api/SettlementAPI';

const useSettlementStore = create((set) => ({
    settlements: [],
    settlementsByOrders: [],
    fetchSettlements: async ({ supplierName, supplierType, isPaid, isCompleted, year, month }) => {
        const settlements = await fetchSettlements({ supplierName, supplierType, isPaid, isCompleted, year, month });

        set({ settlements });
    },
    fetchOrdersBySupplierAndYearMonth: async ({ supplierId, year, month }) => {
        const settlementsByOrders = await fetchOrdersBySupplierAndYearMonth({ supplierId, year, month });

        set({ settlementsByOrders });
    },
}));

export default useSettlementStore;
