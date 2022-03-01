import create from 'zustand';
import {
    fetchOrdersBySupplierAndYearMonth,
    fetchSettlement,
    fetchSettlements,
    updateSettlement,
    updateSettlements,
} from '../api/SettlementAPI';

const useSettlementStore = create((set, get) => ({
    settlements: [],
    settlement: {},
    fetchSettlements: async ({ supplierName, supplierType, isPaid, isCompleted, year, month }) => {
        const settlements = await fetchSettlements({ supplierName, supplierType, isPaid, isCompleted, year, month });

        set({ settlements });
    },
    updateSettlements: async ({ supplierName, supplierType, isPaid, isCompleted, year, month }) => {
        await updateSettlements({ year, month });
        await get().fetchSettlements({ supplierName, supplierType, isPaid, isCompleted, year, month });
    },
    fetchSettlement: async (settlementId) => {
        const settlement = await fetchSettlement(settlementId);

        set({ settlement });
    },
    updateSettlement: async (settlementId, payload) => {
        await updateSettlement(settlementId, payload);
        await get().fetchSettlement(settlementId);
        // set({ settlement });
    },
}));

export default useSettlementStore;
