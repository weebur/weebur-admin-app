import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { SEARCH_LIMIT } from '../../constants';
import ContentLayout from '../../component/Layout/ContentLayout';
import AdminsSearchForm from '../../component/SearchForms/Admins';
import { toQueryObject } from '../../utils/queryString';
import useAdminsStore from '../../stores/admins';
import SearchList from '../../component/page-components/SearchList';
import AppLayout from '../../component/Layout';

const headers = [
    { key: 'name', label: '이름', span: 7 },
    { key: 'class', label: '등급', span: 8 },
    { key: 'email', label: '이메일', span: 8 },
];

function Admins({ name, email }) {
    const router = useRouter();

    const searchQueries = { name, email };
    const fetchAdmins = useAdminsStore((state) => state.fetchAdmins);
    const resetAdmins = useAdminsStore((state) => state.resetAdmins);
    const admins = useAdminsStore((state) => state.admins);
    const { hasNext, totalResults, result, page, next } = admins;

    const adminList = result?.map((result) => {
        return {
            id: result._id,
            rows: headers.map(({ key, span }) => {
                return {
                    key,
                    Component: result[key],
                    span,
                };
            }),
        };
    });

    const fetchNext = () => {
        fetchAdmins(
            { ...searchQueries, page: next, limit: SEARCH_LIMIT },
            true,
        );
    };

    useEffect(() => {
        if (admins.result) return;

        fetchAdmins({ ...searchQueries, page: 1, limit: SEARCH_LIMIT });
    }, [name, email]);

    return (
        <AppLayout>
            <ContentLayout>
                <SearchList
                    title="어드민 검색"
                    headers={headers}
                    items={adminList}
                    totalLength={totalResults || 0}
                    hasNext={hasNext}
                    searchQueries={searchQueries}
                    fetchData={fetchNext}
                    initialPage={page}
                    nextPage={next}
                >
                    <AdminsSearchForm
                        initialValues={{ name, email }}
                        onSubmit={({ name, email }) => {
                            resetAdmins();
                            router.push({
                                pathname: '/admins',
                                query: toQueryObject({ name, email }),
                            });
                        }}
                    />
                </SearchList>
            </ContentLayout>
        </AppLayout>
    );
}

export const getServerSideProps = (ctx) => {
    const { email = '', name = '' } = ctx.query;
    return {
        props: {
            email,
            name,
        },
    };
};

export default Admins;
