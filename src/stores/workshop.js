import create from 'zustand';
import { createWorkshop, fetchWorkshop, updateWorkshop } from '../api/WorkshopAPI';
import { fetchOrderSchedules } from '../api/OrderAPI';
import produce from 'immer';

const useWorkshopsStore = create((set, get) => ({
    workshop: null,
    workshopSchedules: [],
    fetchWorkshop: async (workshopId) => {
        set({ workshop: null });
        const workshop = await fetchWorkshop(workshopId);
        set({ workshop });
    },
    createWorkshop: async (workshop) => {
        const newWorkshop = await createWorkshop(workshop);
        set({ workshop: newWorkshop });
        return newWorkshop;
    },
    updateWorkshop: async (workshopId, workshop) => {
        const newWorkshop = await updateWorkshop(workshopId, workshop);
        set({ workshop: newWorkshop });
    },
    fetchOrderSchedules: async ({ year, month, supplierId }) => {
        const workshopSchedules = await fetchOrderSchedules({ year, month, supplierId });

        set({ workshopSchedules });
    },
    updateWorkshopDocuments: (docType, docs) => {
        if (!get().workshop) return;
        set(
            produce((state) => {
                state.workshop[docType] = docs;
            }),
        );
    },
}));

export default useWorkshopsStore;
