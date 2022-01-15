import { useRouter } from 'next/router';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { SEARCH_LIMIT } from '../../constants';
import ContentLayout from '../../component/Layout/ContentLayout';
import ClientSearchForm from '../../component/SearchForms/Clients';
import { toQueryObject } from '../../utils/queryString';
import useClientStore from '../../stores/clients';
import SearchList from '../../component/page-components/SearchList';
import { clientsTypes } from '../../constants/client';
import { COMMON_FORMAT } from '../../constants/date';
import AppLayout from '../../component/Layout';

const headers = [
    {
        key: 'company',
        label: '회사명',
        span: 4,
        render: (company) => company.name,
    },
    { key: 'name', label: '회원명', span: 2 },
    { key: 'mobile', label: '모바일', span: 3 },
    { key: 'phoneNumber', label: '유선', span: 3 },
    { key: 'email', label: '이메일', span: 5 },
    {
        key: 'type',
        label: '담당분류',
        span: 2,
        render: (type) => clientsTypes[type].label,
    },
    { key: 'inflowPath', label: '유입경로', span: 2 },
    {
        key: 'createdAt',
        label: '가입일',
        span: 2,
        render: (createdAt) => dayjs(createdAt).format(COMMON_FORMAT),
    },
];

function Client({ name, company, mobile, email, from, to }) {
    const router = useRouter();

    const searchQueries = {
        name,
        company,
        mobile,
        email,
        from,
        to,
    };
    const fetchClients = useClientStore((state) => state.fetchClients);
    const resetClients = useClientStore((state) => state.resetClients);
    const clients = useClientStore((state) => state.clients);
    const { hasNext, totalResults, result, page, next } = clients;

    const clientList = result?.map((result) => {
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
        fetchClients(
            { ...searchQueries, page: next, limit: SEARCH_LIMIT },
            true,
        );
    };

    useEffect(() => {
        if (clients.result) return;
        fetchClients({ ...searchQueries, page: 1, limit: SEARCH_LIMIT });
    }, [searchQueries]);

    return (
        <AppLayout>
            <ContentLayout>
                <SearchList
                    title="회원 검색"
                    headers={headers}
                    items={clientList}
                    totalLength={totalResults || 0}
                    hasNext={hasNext}
                    searchQueries={searchQueries}
                    fetchData={fetchNext}
                    initialPage={page}
                    nextPage={next}
                    createButtonText="회원생성"
                >
                    <ClientSearchForm
                        initialValues={searchQueries}
                        onSubmit={(values) => {
                            resetClients();
                            router.push({
                                pathname: '/clients',
                                query: toQueryObject(values),
                            });
                        }}
                    />
                </SearchList>
            </ContentLayout>
        </AppLayout>
    );
}

export const getServerSideProps = (ctx) => {
    const {
        name = '',
        company = '',
        mobile = '',
        email = '',
        from = '',
        to = '',
    } = ctx.query;

    return {
        props: {
            name,
            company,
            mobile,
            email,
            from,
            to,
        },
    };
};

export default Client;
