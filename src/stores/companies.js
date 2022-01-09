import create from 'zustand';
import { fetchCompanies } from '../api/companyAPI';

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

            const companies = await fetchCompanies({
                name,
                category,
                from,
                to,
                page,
                limit,
            });

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
