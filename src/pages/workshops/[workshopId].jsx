import React, { useEffect, useState } from 'react';
import ContentLayout from '../../component/Layout/ContentLayout';
import WorkshopForm from '../../component/ModifyForms/Workshop';
import useWorkshopsStore from '../../stores/workshop';
import { message, Modal, Typography } from 'antd';
import useOrdersStore from '../../stores/order';
import { getTotalsByOrders } from '../../services/OrderService';
import Tab from '../../component/Tab';
import OrderClipboard from '../../component/page-components/Workshops/OrderClipboard';
import { removeWorkshop } from '../../api/WorkshopAPI';
import { useRouter } from 'next/router';
import SendEmailTemplate from '../../component/page-components/Workshops/SendEmailTemplate';
import { sendReservationEmail } from '../../api/OrderAPI';
import { sendEmail } from '../../api/EmailAPI';

const tabs = [
    { key: 'workshop', label: '워크샵' },
    { key: 'teacher', label: '강사용' },
    { key: 'user', label: '회원용' },
];

function WorkshopDetail({ workshopId }) {
    const router = useRouter();
    const [active, setActive] = useState(tabs[0].key);
    const [isDirty, setIsDirty] = useState(false);

    const workshop = useWorkshopsStore((state) => state.workshop);
    const fetchWorkshop = useWorkshopsStore((state) => state.fetchWorkshop);
    const updateWorkshop = useWorkshopsStore((state) => state.updateWorkshop);
    const updateOrdersByWorkshop = useOrdersStore((state) => state.updateOrdersByWorkshop);

    const initializeWorkshop = async (workshopId) => {
        try {
            await fetchWorkshop(workshopId);
        } catch (e) {
            message.warn('워크샵이 존재하지 않습니다.');
            router.replace('/orders');
        }
    };

    const handleSubmit = async (values) => {
        try {
            await updateWorkshop(workshopId, values);
            updateOrdersByWorkshop(values, getTotalsByOrders(values.orders));
            message.success('저장이 완료되었습니다.');
        } catch (e) {
            message.error('저장을 실패하였습니다.');
        }
    };

    const handleRemove = async () => {
        try {
            await removeWorkshop(workshopId);
            message.success('삭제가 완료되었습니다.');
            router.replace('/orders');
        } catch (e) {
            message.error('워크샵 삭제를 실패하였습니다.');
        }
    };

    const handleSendEmail = async ({
        senderName,
        senderAddress,
        senderPassword,
        receiver,
        subject,
        textBody,
        htmlBody,
        fileKeys,
    }) => {
        Modal.confirm({
            content: '이메일을 발송하시겠습니까?',
            onOk: async () => {
                try {
                    await sendEmail({
                        senderName,
                        senderAddress,
                        senderPassword,
                        receiver,
                        subject,
                        textBody,
                        htmlBody,
                        fileKeys,
                    });
                    message.success('이메일 발송이 완료되었습니다.');
                } catch (e) {
                    message.error('이메일 발송을 실패하였습니다.');
                }
            },
        });
    };

    useEffect(() => {
        if (workshopId) {
            initializeWorkshop(workshopId);
        }
    }, [workshopId]);

    return (
        <ContentLayout>
            <Typography.Title level={4}>워크샵수정</Typography.Title>
            <Tab
                tabs={tabs}
                active={active}
                onChange={(v) => {
                    if (isDirty) {
                        Modal.confirm({
                            centered: true,
                            content: '저장하지 않은 워크샵 정보가 있습니다. 그래도 이동하시겠습니까?',
                            okText: '이동',
                            cancelText: '닫기',
                            onOk() {
                                setActive(v);
                            },
                        });
                        return;
                    }
                    setActive(v);
                }}
            />
            {workshop && active === tabs[0].key && (
                <WorkshopForm
                    initialValues={workshop}
                    onSubmit={handleSubmit}
                    onRemove={handleRemove}
                    onDirtyChange={(v) => setIsDirty(v)}
                />
            )}
            {active === tabs[1].key && <OrderClipboard workshop={workshop} />}
            {active === tabs[2].key && <SendEmailTemplate workshop={workshop} onSendEmail={handleSendEmail} />}
        </ContentLayout>
    );
}

export const getServerSideProps = (ctx) => {
    return {
        props: {
            workshopId: ctx.params.workshopId || '',
        },
    };
};

export default WorkshopDetail;
