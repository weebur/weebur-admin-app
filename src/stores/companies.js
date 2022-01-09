import create from 'zustand';
import { fetchCompanies } from '../api/companyAPI';
import { toQueryObject } from '../utils/queryString';

const useCompaniesStore = create((set) => ({
    companies: {},
    loading: false,
    error: null,
    fetchCompanies: async (
        { name, category, from, to, page, limit },
        loadMore,
    ) => {
        try {
            set({ loading: true });

            const companies = await fetchCompanies(
                toQueryObject({ name, category, from, to, page, limit }),
            );

            if (loadMore) {
                set((state) => ({
                    companies: {
                        ...companies,
                        result: [
                            ...(state.companies?.result || []),
                            ...companies.result,
                        ],
                    },
                }));
            } else {
                set({ companies });
            }

            set({ loading: false });
        } catch (error) {
            set({ error });
            set({ loading: false });
        }
    },
    resetCompanies: () => {
        set({ companies: {} });
    },
}));

export default useCompaniesStore;
