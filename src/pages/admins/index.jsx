import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { SEARCH_LIMIT } from '../../constants';
import ContentLayout from '../../component/Layout/ContentLayout';
import AdminsSearchForm from '../../component/SearchForms/Admins';
import { toQueryObject } from '../../utils/queryString';
import useAdminsStore from '../../stores/admins';
import SearchList from '../../component/page-components/SearchList';
import { adminRoles } from '../../constants/admin';
import { Button, message } from 'antd';
import { withToken } from '../../services/SsrService';
import Input from '../../component/Form/Input';
import InlineUpdateInput from '../../component/InlineUpdateInput';

function Admins({ name, email }) {
    const router = useRouter();

    const searchQueries = { name, email };
    const fetchAdmins = useAdminsStore((state) => state.fetchAdmins);
    const resetAdmins = useAdminsStore((state) => state.resetAdmins);
    const updateAdmin = useAdminsStore((state) => state.updateAdmin);
    const admins = useAdminsStore((state) => state.admins);
    const me = useAdminsStore((state) => state.me);
    const approveAdmin = useAdminsStore((state) => state.approveAdmin);
    const { hasNext, totalResults, result, page, next } = admins;

    const headers = [
        {
            key: 'name',
            label: '이름',
            span: 6,
            render: ({ _id, name, email, mobile }) => (
                <InlineUpdateInput
                    value={name}
                    editable={me?.role === 'MASTER'}
                    onSave={(v) => {
                        return updateAdmin(_id, { name: v, email, mobile });
                    }}
                />
            ),
        },
        { key: 'role', label: '등급', span: 3, render: ({ role }) => adminRoles[role].label },
        {
            key: 'email',
            label: '이메일',
            span: 5,
        },
        {
            key: 'mobile',
            label: '모바일',
            span: 7,
            render: ({ _id, name, email, mobile }) => (
                <InlineUpdateInput
                    value={mobile}
                    editable={me?.role === 'MASTER'}
                    onSave={(v) => {
                        return updateAdmin(_id, { name, email, mobile: v });
                    }}
                />
            ),
        },
        {
            key: 'approved',
            label: '승인여부',
            span: 2,
            render: ({ _id, approved }) => {
                if (!approved) {
                    return (
                        <Button
                            disabled={me?.role !== adminRoles.MASTER.key}
                            onClick={async () => {
                                try {
                                    await approveAdmin(_id);
                                    message.success('승인이 완료되었습니다.');
                                } catch (e) {
                                    message.error('승인을 실패하였습니다.');
                                }
                            }}
                        >
                            승인
                        </Button>
                    );
                }
                return '승인완료';
            },
        },
    ];

    const adminList = result?.map((admin) => {
        return {
            id: admin._id,
            rows: headers.map(({ key, span, render }) => {
                return {
                    key,
                    Component: render ? render(admin) : admin[key],
                    span,
                };
            }),
        };
    });

    const fetchNext = () => {
        fetchAdmins({ ...searchQueries, page: next, limit: SEARCH_LIMIT }, true);
    };

    useEffect(() => {
        if (admins.result) return;

        fetchAdmins({ ...searchQueries, page: 1, limit: SEARCH_LIMIT });
    }, [name, email]);

    return (
        <>
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
                    onItemClick={() => {}}
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
        </>
    );
}

export const getServerSideProps = withToken((ctx) => {
    const { email = '', name = '' } = ctx.query;
    return {
        props: {
            email,
            name,
        },
    };
});

export default Admins;
