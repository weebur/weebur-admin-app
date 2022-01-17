import create from 'zustand';
import produce from 'immer';
import {
    createCompany,
    fetchCompanies,
    fetchCompany,
    updateCompany,
} from '../api/companyAPI';
import { companyCategoryOptions } from '../constants/company';

const defaultValues = {
    name: '',
    category: companyCategoryOptions.ETC,
    partner: false,
    details: '',
};

const useCompaniesStore = create((set) => ({
    companies: {},
    company: null,
    fetchCompanies: async (
        { name, category, from, to, page, limit },
        loadMore,
    ) => {
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
    },
    resetCompanies: () => {
        set({ companies: {} });
    },
    resetCompany: () => {
        set({ company: null });
    },
    initializeCompany: () => {
        set({ company: defaultValues });
    },
    fetchCompany: async (companyId) => {
        const company = await fetchCompany(companyId);

        set({ company });
    },
    createCompany: async ({ name, category, details, partner }) => {
        const company = await createCompany({
            name,
            category,
            details,
            partner,
        });

        set({ company });
    },
    updateCompany: async (companyId, { name, category, details, partner }) => {
        const company = await updateCompany(companyId, {
            name,
            category,
            details,
            partner,
        });

        set({ company });
        set(
            produce((state) => {
                const index = state.companies.result.findIndex(
                    (item) => item._id === company._id,
                );
                state.companies.result[index] = company;
            }),
        );
    },
}));

export default useCompaniesStore;
