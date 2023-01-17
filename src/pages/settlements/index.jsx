import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import useSettlementStore from '../../stores/settlement';
import ContentLayout from '../../component/Layout/ContentLayout';
import SearchList from '../../component/page-components/SearchList';
import { get, omit } from 'lodash-es';
import { supplierTypes } from '../../constants/supplier';
import SettlementsSearchForm from '../../component/SearchForms/Settlements';
import { useRouter } from 'next/router';
import { toQueryObject } from '../../utils/queryString';
import { Button, message } from 'antd';
import { withToken } from '../../services/SsrService';
import BasicModal from '../../component/Modal';
import SettlementModifyForm from '../../component/ModifyForms/Settlement';
import Settlement from '../../component/page-components/Workshops/Estimate/Settlement';

const headers = (onClick) => [
    {
        key: 'supplier.name',
        label: '업체명',
        span: 5,
    },
    {
        key: 'supplier.type',
        label: '업체형태',
        span: 2,
        render: (type) => supplierTypes[type].label,
    },
    {
        key: 'orders',
        label: '판매수',
        span: 2,
        render: (orders) => orders.length,
    },
    {
        key: 'totalSettlement',
        label: '총 정산액',
        span: 2,
        render: (totalSettlement) => totalSettlement.toLocaleString(),
    },
    {
        key: 'isPaid',
        label: '정산확인',
        span: 2,
        render: (isPaid) => (isPaid ? '완료' : '미완료'),
    },
    {
        key: 'latestPayment',
        label: '정산확인금액',
        span: 3,
        render: (latestPayment, data) => (
            <Button
                type={'secondary'}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(data);
                }}
            >
                {latestPayment.toLocaleString()}
            </Button>
        ),
    },
    {
        key: 'isCompleted',
        label: '입금확인',
        span: 2,
        render: (isCompleted) => (isCompleted ? '완료' : '미완료'),
    },
    {
        key: 'latestCompletedAmount',
        label: '입금확인금액',
        span: 3,
        render: (latestCompletedAmount, data) => (
            <Button
                type={'secondary'}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(data);
                }}
            >
                {latestCompletedAmount.toLocaleString()}
            </Button>
        ),
    },
    {
        key: 'details',
        label: '비고',
        span: 3,
    },
];

function SettlementsPage({ supplierName, supplierType, isPaid, isCompleted, year, month }) {
    const router = useRouter();
    const [openSettlementModal, setOpenSettlementModal] = useState(false);
    const [openSettlementDoc, setOpenSettlementDoc] = useState(false);

    const searchQueries = {
        supplierName,
        supplierType,
        isPaid,
        isCompleted,
        year,
        month,
    };

    const fetchSettlements = useSettlementStore((state) => state.fetchSettlements);
    const settlements = useSettlementStore((state) => state.settlements);
    const updateSettlements = useSettlementStore((state) => state.updateSettlements);
    const updateSettlement = useSettlementStore((state) => state.updateSettlement);
    const fetchSettlement = useSettlementStore((state) => state.fetchSettlement);
    const settlement = useSettlementStore((state) => state.settlement);

    const lists = useMemo(() => {
        const onItemClick = async (data) => {
            await fetchSettlement(data._id);
            setOpenSettlementModal(true);
        };
        return headers(onItemClick);
    }, [settlements]);

    const supplierList = settlements?.map((result) => {
        return {
            id: result._id,
            rows: lists.map(({ key, span, render }) => {
                return {
                    key,
                    Component: render ? render(get(result, key), result) : get(result, key),
                    span,
                };
            }),
        };
    });

    const totalSettlement = useMemo(
        () => settlement?.orders?.reduce((acc, order) => acc + order.totalSettlement, 0),
        [settlement],
    );

    const handleSubmit = async (values) => {
        try {
            await updateSettlement(settlement._id, values);
            setOpenSettlementModal(false);
            message.success('저장을 완료하였습니다.');
        } catch (e) {
            console.log(e);
            message.error('저장을 실패하였습니다.');
        }
    };

    const handleLoadSettlements = async ({ supplierName, supplierType, isPaid, isCompleted, year, month }) => {
        try {
            await fetchSettlements({ supplierName, supplierType, isPaid, isCompleted, year, month });
            message.success(`${year}년 ${month}월 정산내역을 불러오는데 성공하였습니다.`);
        } catch (e) {
            message.error('정산내역을 불러오는데 실패하였습니다.');
        }
    };

    const handleModifyButtonClick = async () => {
        try {
            await updateSettlements(searchQueries);

            router.replace({
                pathname: '/settlements',
                query: toQueryObject(searchQueries),
            });

            message.success(`${year}년 ${month}월 정산내역 갱신을 성공하였습니다.`);
        } catch (e) {
            message.error('정산내역 갱신을 실패하였습니다.');
        }
    };

    useEffect(() => {
        handleLoadSettlements({ supplierName, supplierType, isPaid, isCompleted, year, month });
    }, [supplierName, supplierType, isPaid, isCompleted, year, month]);

    return (
        <ContentLayout>
            <SearchList
                title="정산내역"
                headers={lists}
                items={supplierList}
                totalLength={settlements.length || 0}
                modifyButtonText={'정산내역 갱신하기'}
                onModifyButtonClick={handleModifyButtonClick}
                onItemClick={(id) => {
                    router.push({
                        pathname: `/settlements/${id}`,
                        as: '/settlements/[settlementsId]',
                    });
                }}
            >
                <SettlementsSearchForm
                    initialValues={searchQueries}
                    onSubmit={(values) => {
                        router.replace({
                            pathname: '/settlements',
                            query: toQueryObject(values),
                        });
                    }}
                    onReset={() => {
                        router.replace({ pathname: '/settlements' });
                    }}
                />
            </SearchList>
            <BasicModal
                title={'정산 확인'}
                isOpen={openSettlementModal}
                onClose={() => {
                    setOpenSettlementModal(false);
                }}
            >
                <SettlementModifyForm
                    totalSettlement={totalSettlement}
                    initialValues={omit(settlement, ['orders'])}
                    onSubmit={handleSubmit}
                    onDocButtonClick={() => setOpenSettlementDoc(true)}
                />
            </BasicModal>
            <BasicModal isOpen={openSettlementDoc} onClose={() => setOpenSettlementDoc(false)}>
                <Settlement settlement={settlement} />
            </BasicModal>
        </ContentLayout>
    );
}

export const getServerSideProps = withToken((ctx) => {
    const now = dayjs();
    const {
        year = now.year(),
        month = now.month() + 1,
        supplierType = '',
        supplierName = '',
        isPaid = null,
        isCompleted = null,
    } = ctx.query;

    return {
        props: { supplierName, supplierType, isPaid, isCompleted, year, month },
    };
});

export default SettlementsPage;
