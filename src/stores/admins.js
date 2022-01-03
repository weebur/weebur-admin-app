import create from 'zustand';
import { fetchAdmins } from '../api/AdminAPI';
import { toQueryObject } from '../utils/queryString';

const useAdminsStore = create((set) => ({
    admins: {},
    loading: false,
    error: null,
    fetchAdmins: async ({ name, email, page, limit }, loadMore) => {
        try {
            set({ loading: true });

            const admins = await fetchAdmins(
                toQueryObject({ name, email, page, limit }),
            );

            if (loadMore) {
                set((state) => ({
                    admins: {
                        ...admins,
                        result: [
                            ...(state.admins?.result || []),
                            ...admins.result,
                        ],
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
}));

export default useAdminsStore;
