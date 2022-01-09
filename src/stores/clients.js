import create from 'zustand';
import { fetchClients } from '../api/ClientAPI';

const useClientsStore = create((set) => ({
    clients: {},
    loading: false,
    error: null,
    fetchClients: async (
        { page, limit, name, company, mobile, email, from, to },
        loadMore,
    ) => {
        try {
            set({ loading: true });

            const clients = await fetchClients({
                page,
                limit,
                name,
                company,
                mobile,
                email,
                from,
                to,
            });

            if (loadMore) {
                set((state) => ({
                    clients: {
                        ...clients,
                        result: [
                            ...(state.clients?.result || []),
                            ...clients.result,
                        ],
                    },
                }));
            } else {
                set({ clients });
            }

            set({ loading: false });
        } catch (error) {
            set({ error });
            set({ loading: false });
        }
    },
    resetClients: () => {
        set({ clients: {} });
    },
}));

export default useClientsStore;
