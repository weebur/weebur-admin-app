import create from 'zustand';
import { fetchAdmins } from '../api/AdminAPI';

export const useAdminsStore = create((set) => ({
    admins: [],
    pageInfo: {},
    loading: false,
    error: null,
    fetchAdmins: async ({ page, limit }) => {
        try {
            set(() => ({ loading: true }));
            const { result: admins, ...pageInfo } = await fetchAdmins({
                page,
                limit,
            });

            set(() => ({ admins, pageInfo, loading: false }));
        } catch (error) {
            set(() => ({ error }));
        }
    },
}));
