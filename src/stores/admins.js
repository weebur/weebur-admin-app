import create from 'zustand';
import { approveAdmin, fetchAdmins, fetchMe, login, logout, signup } from '../api/AdminAPI';
import produce from 'immer';

const useAdminsStore = create((set) => ({
    admins: {},
    me: null,
    loading: false,
    error: null,
    fetchAdmins: async ({ name, email, page, limit }, loadMore) => {
        try {
            set({ loading: true });

            const admins = await fetchAdmins({ name, email, page, limit });

            if (loadMore) {
                set((state) => ({
                    admins: {
                        ...admins,
                        result: [...(state.admins?.result || []), ...admins.result],
                    },
                }));
            } else {
                set({ admins });
            }

            set({ loading: false });
        } catch (error) {
            set({ error });
            set({ loading: false });
        }
    },
    resetAdmins: () => {
        set({ admins: {} });
    },
    login: async ({ email, password }) => {
        const admin = await login({ email, password });

        set({ me: admin });

        return admin;
    },
    signup: async ({ email, password, name }) => {
        const { accessToken } = await signup({ email, password, name });

        return { accessToken };
    },
    logout: async () => {
        const { success } = await logout();

        set({ me: null });

        return success;
    },
    fetchMe: async () => {
        const me = await fetchMe();

        set({ me });
    },
    approveAdmin: async (adminId) => {
        const admin = await approveAdmin(adminId);

        set(
            produce((state) => {
                const index = state.admins.result.findIndex((item) => item._id === adminId);
                state.admins.result[index] = admin;
            }),
        );
    },
}));

export default useAdminsStore;
