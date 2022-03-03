import create from 'zustand';
import { createWorkshop, fetchWorkshop, updateWorkshop } from '../api/WorkshopAPI';
import { fetchOrderSchedules } from '../api/OrderAPI';

const useWorkshopsStore = create((set) => ({
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
    fetchOrderSchedules: async ({ year, month }) => {
        const workshopSchedules = await fetchOrderSchedules({ year, month });

        set({ workshopSchedules });
    },
}));

export default useWorkshopsStore;
