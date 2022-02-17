import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { SEARCH_LIMIT } from '../../constants';
import ContentLayout from '../../component/Layout/ContentLayout';
import ClientSearchForm from '../../component/SearchForms/Clients';
import { toQueryObject } from '../../utils/queryString';
import useClientStore from '../../stores/clients';
import SearchList from '../../component/page-components/SearchList';
import { clientsTypes } from '../../constants/client';
import { COMMON_FORMAT } from '../../constants/date';
import BasicModal from '../../component/Modal';
import ModifyClientForm from '../../component/ModifyForms/Client';
import { message } from 'antd';

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
    const [createMode, setCreateMode] = useState(true);

    const createClient = useClientStore((state) => state.createClient);
    const updateClient = useClientStore((state) => state.updateClient);
    const fetchClients = useClientStore((state) => state.fetchClients);
    const fetchClient = useClientStore((state) => state.fetchClient);
    const resetClients = useClientStore((state) => state.resetClients);
    const resetClient = useClientStore((state) => state.resetClient);
    const initializeClient = useClientStore((state) => state.initializeClient);
    const client = useClientStore((state) => state.client);
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

    const handleSubmit = async (values) => {
        try {
            if (createMode) {
                await createClient(values);
                await fetchClients({
                    page: 1,
                    limit: SEARCH_LIMIT,
                });
            } else {
                await updateClient(client._id, values);
            }

            resetClient();
            message.success('저장을 완료하였습니다.');
        } catch (e) {
            message.error('저장에 실패하였습니다.');
            message.error(e.response.data.message);
        }
    };

    const handleClientClick = async (id) => {
        try {
            await fetchClient(id);
            setCreateMode(false);
        } catch (e) {
            message.error('회원 정보를 불러올 수 없습니다.');
            message.error(e.response.data.message);
        }
    };

    const fetchMore = async (init = false) => {
        try {
            if (init) {
                await fetchClients({
                    ...searchQueries,
                    page: 1,
                    limit: SEARCH_LIMIT,
                });
                return;
            }
            await fetchClients({ ...searchQueries, page: next, limit: SEARCH_LIMIT }, true);
        } catch (e) {
            message.error('리스트를 불러오는 데 실피하였습니다.');
        }
    };

    useEffect(() => {
        if (clients.result) return;
        fetchMore(true);
    }, [searchQueries]);

    return (
        <>
            <ContentLayout>
                <SearchList
                    title="회원 검색"
                    headers={headers}
                    items={clientList}
                    totalLength={totalResults || 0}
                    hasNext={hasNext}
                    searchQueries={searchQueries}
                    fetchData={fetchMore}
                    initialPage={page}
                    nextPage={next}
                    createButtonText="회원생성"
                    onCreateButtonClick={() => {
                        initializeClient();
                        setCreateMode(true);
                    }}
                    onItemClick={handleClientClick}
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
            <BasicModal
                title={createMode ? '회원 생성' : '회원 수정'}
                isOpen={!!client}
                onClose={() => {
                    resetClient();
                }}
            >
                <ModifyClientForm
                    submitButtonLabel={createMode ? '생성하기' : '수정하기'}
                    initialValues={client}
                    onSubmit={handleSubmit}
                />
            </BasicModal>
        </>
    );
}

export const getServerSideProps = (ctx) => {
    const { name = '', company = '', mobile = '', email = '', from = '', to = '' } = ctx.query;

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
