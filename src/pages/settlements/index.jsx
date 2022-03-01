import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import useSettlementStore from '../../stores/settlement';
import ContentLayout from '../../component/Layout/ContentLayout';
import SearchList from '../../component/page-components/SearchList';
import { get } from 'lodash-es';
import { supplierTypes } from '../../constants/supplier';
import SettlementsSearchForm from '../../component/SearchForms/Settlements';
import { useRouter } from 'next/router';
import { toQueryObject } from '../../utils/queryString';
import { message } from 'antd';

const headers = [
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
        span: 2,
        render: (latestPayment) => latestPayment.toLocaleString(),
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
        span: 2,
        render: (latestCompletedAmount) => latestCompletedAmount.toLocaleString(),
    },
    {
        key: 'details',
        label: '비고',
        span: 5,
    },
];

function SettlementsPage({ supplierName, supplierType, isPaid, isCompleted, year, month }) {
    const router = useRouter();
    const [checkedItems, setCheckedItems] = useState([]);

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

    const supplierList = settlements?.map((result) => {
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
                headers={headers}
                items={supplierList}
                totalLength={settlements.length || 0}
                modifyButtonText={'정산내역 갱신하기'}
                onModifyButtonClick={handleModifyButtonClick}
                onItemClick={(id) => {
                    console.log(id);
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
                />
            </SearchList>
        </ContentLayout>
    );
}

export const getServerSideProps = (ctx) => {
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
};

export default SettlementsPage;
