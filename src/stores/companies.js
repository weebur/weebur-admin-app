import create from 'zustand';
import produce from 'immer';
import {
    createCompany,
    fetchCompanies,
    updateCompany,
} from '../api/companyAPI';

const useCompaniesStore = create((set) => ({
    companies: {},
    currentCompany: {},
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
    createCompany: async ({ name, category, details, partner }) => {
        try {
            set({ loading: true });

            const company = await createCompany({
                name,
                category,
                details,
                partner,
            });

            set({ currentCompany: company });
            set({ loading: false });
        } catch (error) {
            set({ error });
            set({ loading: false });
        }
    },
    updateCompany: async (companyId, { name, category, details, partner }) => {
        try {
            set({ loading: true });

            const company = await updateCompany(companyId, {
                name,
                category,
                details,
                partner,
            });

            set({ currentCompany: company });
            set(
                produce((state) => {
                    const index = state.companies.result.findIndex(
                        (item) => item._id === company._id,
                    );
                    state.companies.result[index] = company;
                }),
            );
            set({ loading: false });
        } catch (error) {
            set({ error });
            set({ loading: false });
        }
    },
}));

export default useCompaniesStore;
