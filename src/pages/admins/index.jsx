import { Typography } from 'antd';
import { useEffect } from 'react';
import ContentLayout from '../../component/Layout/ContentLayout';
import ContentSpace from '../../component/Layout/ContentSpace';
import AdminsSearchForm from '../../component/SearchForms/Admins';
import { useAdminsStore } from '../../stores/admins';

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
            <ContentSpace>
                <div>검색 영역</div>
                <div>
                    <AdminsSearchForm />
                </div>
            </ContentSpace>
        </ContentLayout>
    );
}

export default Admins;
