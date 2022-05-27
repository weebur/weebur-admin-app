import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import useSettlementStore from '../../stores/settlement';
import SettlementsSearchForm from '../../component/SearchForms/Settlements';
import SettlementModifyForm from '../../component/ModifyForms/Settlement';
import ContentLayout from '../../component/Layout/ContentLayout';
import List from '../../component/List';
import ContentSpace from '../../component/Layout/ContentSpace';
import { COMMON_FORMAT } from '../../constants/date';
import { get, isEmpty, omit } from 'lodash-es';
import { useRouter } from 'next/router';
import { Divider, message, Typography } from 'antd';
import BasicModal from '../../component/Modal';
import Settlement from '../../component/page-components/Workshops/Estimate/Settlement';
import { withToken } from '../../services/SsrService';

const headers = [
    {
        key: 'adminName',
        label: '담당자',
        span: 2,
    },
    {
        key: 'clientName',
        label: '회원명',
        span: 2,
    },
    {
        key: 'companyName',
        label: '회사명',
        span: 3,
    },
    {
        key: 'productName',
        label: '상품명',
        span: 5,
    },
    {
        key: 'reservationDate',
        label: '진행일',
        span: 4,
        render: (reservationDate) => dayjs(reservationDate).format('YYYY-MM-DD HH:ss'),
    },
    {
        key: 'totalIncome',
        label: '총 수수료',
        span: 2,
        render: (totalIncome) => totalIncome.toLocaleString(),
    },
    {
        key: 'totalSettlement',
        label: '총 정산액',
        span: 2,
        render: (totalSettlement) => totalSettlement.toLocaleString(),
    },
    {
        key: 'paymentNote',
        label: '정산비고',
        span: 3,
    },
];

function SettlementDetailPage({ settlementId, year, month }) {
    const router = useRouter();

    const [openSettlementDoc, setOpenSettlementDoc] = useState(false);

    const fetchSettlement = useSettlementStore((state) => state.fetchSettlement);
    const updateSettlement = useSettlementStore((state) => state.updateSettlement);
    const settlement = useSettlementStore((state) => state.settlement);

    const totalSettlement = useMemo(
        () => settlement.orders?.reduce((acc, order) => acc + order.totalSettlement, 0),
        [settlement],
    );

    const orderList = settlement.orders?.map((result) => {
        return {
            id: result._id,
            rows: headers.map(({ key, span, render }) => {
                return {
                    key,
                    Component: render ? render(get(result, key)) : get(result, key),
                    span,
                };
            }),
        };
    });

    const handleSubmit = async (values) => {
        try {
            await updateSettlement(settlementId, values);
            message.success('저장을 완료하였습니다.');
        } catch (e) {
            message.error('저장을 실패하였습니다.');
        }
    };

    useEffect(() => {
        fetchSettlement(settlementId);
    }, [settlementId, year, month]);

    return (
        <ContentLayout>
            <Typography.Title level={4}>정산 상세</Typography.Title>
            {!isEmpty(settlement) && (
                <SettlementModifyForm
                    totalSettlement={totalSettlement}
                    initialValues={omit(settlement, ['orders'])}
                    onSubmit={handleSubmit}
                    onDocButtonClick={() => setOpenSettlementDoc(true)}
                />
            )}
            <Divider />
            <Typography.Title level={5}>정산 상세 내역</Typography.Title>
            <ContentSpace>
                <List
                    useInfiniteScroll={false}
                    headers={headers}
                    data={orderList || []}
                    onItemClick={(id) => {
                        const target = settlement.orders.find((order) => order._id === id);
                        router.push(`/workshops/${target.workshopId}`);
                    }}
                />
            </ContentSpace>

            <BasicModal isOpen={openSettlementDoc} onClose={() => setOpenSettlementDoc(false)}>
                <Settlement settlement={settlement} />
            </BasicModal>
        </ContentLayout>
    );
}

export const getServerSideProps = withToken((ctx) => {
    const { settlementId } = ctx.params;

    return {
        props: { settlementId },
    };
});

export default SettlementDetailPage;
