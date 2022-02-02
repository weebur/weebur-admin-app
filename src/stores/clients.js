import create from 'zustand';
import { createClient, fetchClient, fetchClients, updateClient } from '../api/ClientAPI';
import produce from 'immer';
import { fetchCompany } from '../api/companyAPI';

const defaultValues = {
    name: '',
    company: '',
    mobile: '',
    phoneNumber: '',
    email: '',
    inflowPath: '',
    type: '',
    details: '',
};

const useClientsStore = create((set) => ({
    clients: {},
    client: null,
    fetchClients: async ({ page, limit, name, company, mobile, email, from, to }, loadMore) => {
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
                    result: [...(state.clients?.result || []), ...clients.result],
                },
            }));
            return;
        }

        set({ clients });
    },
    resetClients: () => {
        set({ clients: {} });
    },
    resetClient: () => {
        set({ client: null });
    },
    initializeClient: () => {
        set({ client: defaultValues });
    },
    fetchClient: async (clientId) => {
        const client = await fetchClient(clientId);

        set({ client });
    },
    createClient: async ({ name, company, mobile, phoneNumber, email, inflowPath, type, details }) => {
        const client = await createClient({
            name,
            company,
            mobile,
            phoneNumber,
            email,
            inflowPath,
            type,
            details,
        });

        set({ client });
    },
    updateClient: async (clientId, { name, company, mobile, phoneNumber, email, inflowPath, type, details }) => {
        const client = await updateClient(clientId, {
            name,
            company,
            mobile,
            phoneNumber,
            email,
            inflowPath,
            type,
            details,
        });

        const { _id: companyId, name: companyName } = await fetchCompany(client.company);

        set({ client });
        set(
            produce((state) => {
                const index = state.clients.result.findIndex((item) => item._id === client._id);

                state.clients.result[index] = {
                    ...client,
                    company: { _id: companyId, name: companyName },
                };
            }),
        );
    },
}));

export default useClientsStore;
