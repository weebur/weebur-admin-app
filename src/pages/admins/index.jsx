import { Spin, Typography } from 'antd';
import styled from 'styled-components';
import ContentLayout from '../../component/Layout/ContentLayout';
import ContentSpace from '../../component/Layout/ContentSpace';
import AdminsSearchForm from '../../component/SearchForms/Admins';

import { useRouter } from 'next/router';
import { toQueryObject } from '../../utils/queryString';
import { useCallback, useEffect, useRef, useState } from 'react';
import useAdminsStore from '../../stores/admins';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import List from '../../component/List';
import Summary from '../../component/List/Summary';
import Loader from '../../component/Loader';

const limit = 15;

const SearchFormWrapper = styled.div`
    padding: 20px 0;
`;

const SummaryWrapper = styled.div`
    padding: 20px 0;
    margin-top: 20px;
`;

function Admins({ name, email }) {
    const router = useRouter();

    const ref = useRef();

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAdmins = useAdminsStore((state) => state.fetchAdmins);
    const admins = useAdminsStore((state) => state.admins);
    const { hasNext } = admins;

    const loadAdmins = async (more) => {
        setIsLoading(true);

        await fetchAdmins({ page: more ? page : 1, limit, name, email }, more);

        setIsLoading(false);
    };

    useInfiniteScroll(
        () => {
            setPage((page) => page + 1);
        },
        ref.current,
        !hasNext,
    );

    useEffect(() => {
        loadAdmins();
    }, [name, email]);

    useEffect(() => {
        if (isLoading || page === 1) return;
        loadAdmins(true);
    }, [page]);

    return (
        <ContentLayout title="어드민 목록">
            <Typography.Title level={5}>어드민 검색</Typography.Title>
            <ContentSpace align="center">
                <SearchFormWrapper>
                    <AdminsSearchForm
                        defaultValues={{ name, email }}
                        onSubmit={({ name, email }) => {
                            router.push({
                                pathname: '/admins',
                                query: toQueryObject({ name, email }),
                            });
                        }}
                    />
                </SearchFormWrapper>
            </ContentSpace>

            <SummaryWrapper>
                <Summary total={admins.totalResults} />
            </SummaryWrapper>

            <ContentSpace>
                <List ref={ref} data={admins.result} />
                {isLoading && <Loader />}
            </ContentSpace>
        </ContentLayout>
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
