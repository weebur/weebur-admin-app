import ContentLayout from '../../component/Layout/ContentLayout';
import useCompaniesStore from '../../stores/companies';
import { companyCategories } from '../../constants/company';
import SearchList from '../../component/page-components/SearchList';
import { useEffect, useState } from 'react';
import { SEARCH_LIMIT } from '../../constants';
import CompaniesSearchForm from '../../component/SearchForms/Companies';
import { toQueryObject } from '../../utils/queryString';
import { useRouter } from 'next/router';
import BasicModal from '../../component/Modal';
import ModifyCompanyForm from '../../component/ModifyForms/Company';
import { message } from 'antd';

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

function Companies() {
    const router = useRouter();

    const { name, category, from, to } = router.query;
    const searchQueries = { name, category, from, to };
    const [createMode, setCreateMode] = useState(true);

    const fetchCompanies = useCompaniesStore((state) => state.fetchCompanies);
    const resetCompanies = useCompaniesStore((state) => state.resetCompanies);
    const resetCompany = useCompaniesStore((state) => state.resetCompany);
    const createCompany = useCompaniesStore((state) => state.createCompany);
    const updateCompany = useCompaniesStore((state) => state.updateCompany);
    const fetchCompany = useCompaniesStore((state) => state.fetchCompany);
    const initializeCompany = useCompaniesStore((state) => state.initializeCompany);
    const company = useCompaniesStore((state) => state.company);
    const companies = useCompaniesStore((state) => state.companies);

    const { hasNext, totalResults, result, page, next } = companies;

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
        try {
            if (createMode) {
                await createCompany(values);
                await fetchCompanies({
                    page: 1,
                    limit: SEARCH_LIMIT,
                });
            } else {
                await updateCompany(company._id, values);
            }

            resetCompany();
            message.success('저장을 완료하였습니다.');
        } catch (e) {
            message.error('저장에 실패하였습니다.');
            message.error(e.response.data.message);
        }
    };

    const handleCompanyClick = async (id) => {
        try {
            await fetchCompany(id);
            setCreateMode(false);
        } catch (e) {
            message.error('회원 정보를 불러올 수 없습니다.');
            message.error(e.response.data.message);
        }
    };

    const fetchMore = async (init = false) => {
        try {
            if (init) {
                await fetchCompanies({
                    ...searchQueries,
                    page: 1,
                    limit: SEARCH_LIMIT,
                });
                return;
            }

            await fetchCompanies({ ...searchQueries, page: next, limit: SEARCH_LIMIT }, true);
        } catch (e) {
            message.error('리스트를 불러오는 데 실피하였습니다.');
        }
    };

    useEffect(() => {
        const { init, ...query } = router.query;

        if (!!init || !companies.result) {
            fetchMore(true);
            router.replace({ pathname: router.pathname, query });
        }
    }, [name, category, from, to]);

    return (
        <>
            <ContentLayout>
                <SearchList
                    title="회사 검색"
                    headers={headers}
                    items={companyList}
                    totalLength={totalResults || 0}
                    hasNext={hasNext}
                    searchQueries={searchQueries}
                    fetchData={fetchMore}
                    initialPage={page}
                    nextPage={next}
                    createButtonText="회사생성"
                    onCreateButtonClick={() => {
                        initializeCompany();
                        setCreateMode(true);
                    }}
                    onItemClick={handleCompanyClick}
                >
                    <CompaniesSearchForm
                        initialValues={{ name, category, from, to }}
                        onSubmit={({ name, category, from, to }) => {
                            resetCompanies();
                            router.replace({
                                pathname: '/companies',
                                query: toQueryObject({
                                    name,
                                    category,
                                    from,
                                    to,
                                }),
                            });
                        }}
                        onReset={() => {
                            router.replace({ pathname: '/companies', query: { init: true } });
                        }}
                    />
                </SearchList>
            </ContentLayout>
            <BasicModal
                title={createMode ? '회사 생성' : '회사 수정'}
                isOpen={!!company}
                onClose={() => {
                    resetCompany();
                }}
            >
                <ModifyCompanyForm
                    submitButtonLabel={createMode ? '생성하기' : '수정하기'}
                    initialValues={company}
                    onSubmit={handleSubmit}
                />
            </BasicModal>
        </>
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
