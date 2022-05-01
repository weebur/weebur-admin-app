import React, { useState } from 'react';
import ContentLayout from '../../component/Layout/ContentLayout';
import WorkshopForm from '../../component/ModifyForms/Workshop';
import useWorkshopsStore from '../../stores/workshop';
import { message, Typography } from 'antd';
import { useRouter } from 'next/router';

function NewWorkshop() {
    const router = useRouter();

    const createWorkshop = useWorkshopsStore((state) => state.createWorkshop);

    const handleSubmit = async (values) => {
        try {
            const workshop = await createWorkshop(values);
            router.push(`/workshops/${workshop._id}`);
            message.success('저장이 완료되었습니다.');
        } catch (e) {
            message.error(JSON.stringify(e));
        }
    };
    return (
        <ContentLayout>
            <Typography.Title level={4}>워크샵생성</Typography.Title>
            <WorkshopForm onSubmit={handleSubmit} />
        </ContentLayout>
    );
}

export default NewWorkshop;
