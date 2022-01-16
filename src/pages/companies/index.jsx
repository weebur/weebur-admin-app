import ContentLayout from '../../component/Layout/ContentLayout';
import useCompaniesStore from '../../stores/companies';
import { companyCategories } from '../../constants/company';
import SearchList from '../../component/page-components/SearchList';
import { useEffect, useState } from 'react';
import { SEARCH_LIMIT } from '../../constants';
import CompaniesSearchForm from '../../component/SearchForms/Companies';
import { toQueryObject } from '../../utils/queryString';
import { useRouter } from 'next/router';
import AppLayout from '../../component/Layout';
import BasicModal from '../../component/Modal';
import ModifyCompanyForm from '../../component/ModifyForms/Company';

const headers = [
    { key: 'name', label: '회사명', span: 8 },
    {
        key: 'category',
        label: '등급',
        span: 4,
        render: (key) => companyCategories[key].label,
    },
    { key: 'details', label: '특징', span: 12 },
];

function Companies({ name, category, from, to }) {
    const router = useRouter();

    const searchQueries = { name, category, from, to };
    const [openCreateForm, setOpenCreateForm] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState('');

    const fetchCompanies = useCompaniesStore((state) => state.fetchCompanies);
    const resetCompanies = useCompaniesStore((state) => state.resetCompanies);
    const createCompany = useCompaniesStore((state) => state.createCompany);
    const updateCompany = useCompaniesStore((state) => state.updateCompany);
    const companies = useCompaniesStore((state) => state.companies);
    const { hasNext, totalResults, result, page, next } = companies;
    const initialValues = result?.find(
        (company) => company._id === selectedCompany,
    );

    const companyList = result?.map((result) => {
        return {
            id: result._id,
            rows: headers.map(({ key, span, render }) => {
                return {
                    key,
                    Component: render ? render(result[key]) : result[key],
                    span,
                };
            }),
        };
    });

    const handleSubmit = async (values) => {
        if (initialValues) {
            await updateCompany(initialValues._id, values);
        } else {
            await createCompany(values);
            await fetchCompanies({
                page: 1,
                limit: SEARCH_LIMIT,
            });
        }

        setSelectedCompany('');
        setOpenCreateForm(false);
    };

    const fetchNext = () => {
        fetchCompanies(
            { ...searchQueries, page: next, limit: SEARCH_LIMIT },
            true,
        );
    };

    useEffect(() => {
        if (selectedCompany) {
            setOpenCreateForm(true);
        }
    }, [selectedCompany]);

    useEffect(() => {
        if (companies.result) return;

        fetchCompanies({ ...searchQueries, page: 1, limit: SEARCH_LIMIT });
    }, [name, category, from, to]);

    return (
        <AppLayout>
            <ContentLayout>
                <SearchList
                    title="회사 검색"
                    headers={headers}
                    items={companyList}
                    totalLength={totalResults || 0}
                    hasNext={hasNext}
                    searchQueries={searchQueries}
                    fetchData={fetchNext}
                    initialPage={page}
                    nextPage={next}
                    createButtonText="회사생성"
                    onCreateButtonClick={() => setOpenCreateForm(true)}
                    onItemClick={(id) => setSelectedCompany(id)}
                >
                    <CompaniesSearchForm
                        initialValues={{ name, category, from, to }}
                        onSubmit={({ name, category, from, to }) => {
                            resetCompanies();
                            router.push({
                                pathname: '/companies',
                                query: toQueryObject({
                                    name,
                                    category,
                                    from,
                                    to,
                                }),
                            });
                        }}
                    />
                </SearchList>
            </ContentLayout>
            <BasicModal
                title={initialValues ? '회사 수정' : '회사 생성'}
                isOpen={openCreateForm}
                onClose={() => {
                    setOpenCreateForm(false);
                    setSelectedCompany('');
                }}
            >
                <ModifyCompanyForm
                    initialValues={
                        result?.find(
                            (company) => company._id === selectedCompany,
                        ) || {}
                    }
                    onSubmit={handleSubmit}
                />
            </BasicModal>
        </AppLayout>
    );
}

export const getServerSideProps = (ctx) => {
    const { name = '', category = '', from = '', to = '' } = ctx.query;

    return {
        props: {
            name,
            category,
            from,
            to,
        },
    };
};

export default Companies;
