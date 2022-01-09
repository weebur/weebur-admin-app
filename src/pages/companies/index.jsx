import ContentLayout from '../../component/Layout/ContentLayout';
import useCompaniesStore from '../../stores/companies';
import { companyCategories } from '../../constants/company';
import SearchList from '../../component/page-components/SearchList';
import { useEffect } from 'react';
import { SEARCH_LIMIT } from '../../constants';
import CompaniesSearchForm from '../../component/SearchForms/Companies';
import { toQueryObject } from '../../utils/queryString';
import { useRouter } from 'next/router';
import AppLayout from '../../component/Layout';

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
    const fetchCompanies = useCompaniesStore((state) => state.fetchCompanies);
    const resetCompanies = useCompaniesStore((state) => state.resetCompanies);
    const companies = useCompaniesStore((state) => state.companies);
    const { hasNext, totalResults, result, page, loading, next } = companies;

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

    const fetchNext = () => {
        fetchCompanies(
            { ...searchQueries, page: next, limit: SEARCH_LIMIT },
            true,
        );
    };

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
                    loading={loading}
                    nextPage={next}
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
