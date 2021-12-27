import { Typography } from 'antd';
import { useEffect } from 'react';
import styled from 'styled-components';
import ContentLayout from '../../component/Layout/ContentLayout';
import ContentSpace from '../../component/Layout/ContentSpace';
import AdminsSearchForm from '../../component/SearchForms/Admins';
import { useAdminsStore } from '../../stores/admins';

const SearchFormWrapper = styled.div`
    padding: 20px 0;
`;

function Admins() {
    const { admins, pageInfo, loading, error, fetchAdmins } = useAdminsStore(
        (state) => state,
    );

    console.log(admins, pageInfo, loading, error);

    useEffect(() => {
        fetchAdmins({ page: 0, limit: 10 });
    }, []);

    return (
        <ContentLayout title="어드민 목록">
            <Typography.Title level={5}>어드민 검색</Typography.Title>
            <ContentSpace align="center">
                <SearchFormWrapper>
                    <AdminsSearchForm />
                </SearchFormWrapper>
            </ContentSpace>
        </ContentLayout>
    );
}

export default Admins;
