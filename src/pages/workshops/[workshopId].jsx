import React, { useEffect } from 'react';
import ContentLayout from '../../component/Layout/ContentLayout';
import WorkshopForm from '../../component/ModifyForms/Workshop';
import useWorkshopsStore from '../../stores/workshop';
import { message } from 'antd';
import useOrdersStore from '../../stores/order';
import { getTotalsByOrders } from '../../services/OrderService';

function WorkshopDetail({ workshopId }) {
    const workshop = useWorkshopsStore((state) => state.workshop);
    const fetchWorkshop = useWorkshopsStore((state) => state.fetchWorkshop);
    const updateWorkshop = useWorkshopsStore((state) => state.updateWorkshop);
    const updateOrdersByWorkshop = useOrdersStore((state) => state.updateOrdersByWorkshop);

    const handleSubmit = async (values) => {
        try {
            await updateWorkshop(workshopId, values);
            updateOrdersByWorkshop(values, getTotalsByOrders(values.orders));
            message.success('저장이 완료되었습니다.');
        } catch (e) {
            message.error('저장을 실패하였습니다.');
        }
    };

    useEffect(() => {
        if (workshopId) {
            fetchWorkshop(workshopId);
        }
    }, [workshopId]);

    return (
        <ContentLayout>{workshop && <WorkshopForm initialValues={workshop} onSubmit={handleSubmit} />}</ContentLayout>
    );
}

export const getServerSideProps = (ctx) => {
    return {
        props: {
            workshopId: ctx.query.workshopId || '',
        },
    };
};

export default WorkshopDetail;
