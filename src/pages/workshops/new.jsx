import React from 'react';
import ContentLayout from '../../component/Layout/ContentLayout';
import WorkshopForm from '../../component/ModifyForms/Workshop';
import useWorkshopsStore from '../../stores/workshop';
import { message } from 'antd';

function NewWorkshop() {
    const createWorkshop = useWorkshopsStore((state) => state.createWorkshop);

    const handleSubmit = async (values) => {
        try {
            await createWorkshop(values);
            message.success('저장이 완료되었습니다.');
        } catch (e) {
            message.error('저장을 실패하였습니다.');
        }
    };
    return (
        <ContentLayout>
            <WorkshopForm onSubmit={handleSubmit} />
        </ContentLayout>
    );
}

export default NewWorkshop;
