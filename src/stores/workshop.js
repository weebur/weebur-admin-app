import create from 'zustand';
import { createWorkshop, fetchWorkshop, updateWorkshop } from '../api/WorkshopAPI';

const defaultValues = {};

const useWorkshopsStore = create((set) => ({
    workshop: null,
    fetchWorkshop: async (workshopId) => {
        const workshop = await fetchWorkshop(workshopId);
        set({ workshop });
    },
    resetWorkshop: () => set({ workshop: null }),
    initializeWorkshop: () => set({ workshop: defaultValues }),
    createWorkshop: async (workshop) => {
        const newWorkshop = await createWorkshop(workshop);
        set({ workshop: newWorkshop });
    },
    updateWorkshop: async (workshopId, workshop) => {
        const newWorkshop = await updateWorkshop(workshopId, workshop);
        set({ workshop: newWorkshop });
    },
}));

export default useWorkshopsStore;