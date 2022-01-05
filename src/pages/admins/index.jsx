import { Typography } from 'antd';
import styled from 'styled-components';
import ContentLayout from '../../component/Layout/ContentLayout';
import ContentSpace from '../../component/Layout/ContentSpace';
import AdminsSearchForm from '../../component/SearchForms/Admins';

import { useRouter } from 'next/router';
import { toQueryObject } from '../../utils/queryString';
import { useEffect, useRef, useState } from 'react';
import useAdminsStore from '../../stores/admins';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import List from '../../component/List';
import Summary from '../../component/List/Summary';
import Loader from '../../component/Loader';

const limit = 15;

const SearchFormWrapper = styled.div`
    padding: 50px 0;
`;

const SummaryWrapper = styled.div`
    margin: 55px 0 30px;
`;

const SearchFormTitle = styled.div`
    margin-bottom: 18px;
`;

function Admins({ name, email }) {
    const router = useRouter();

    const ref = useRef();

    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAdmins = useAdminsStore((state) => state.fetchAdmins);
    const admins = useAdminsStore((state) => state.admins);
    const { hasNext } = admins;

    const loadAdmins = async (more) => {
        setIsLoading(true);

        await fetchAdmins({ page: more ? page : 0, limit, name, email }, more);

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
        setPage(0);
    }, [name, email]);

    useEffect(() => {
        if (isLoading || !page) return;
        loadAdmins(true);
    }, [page]);

    return (
        <ContentLayout>
            <SearchFormTitle>
                <Typography.Title level={4}>어드민 검색</Typography.Title>
            </SearchFormTitle>

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
