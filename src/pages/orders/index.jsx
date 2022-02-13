import React, { useEffect, useState } from 'react';
import ContentLayout from '../../component/Layout/ContentLayout';
import useOrdersStore from '../../stores/order';
import { message, Tooltip } from 'antd';
import { SEARCH_LIMIT } from '../../constants';
import SearchList from '../../component/page-components/SearchList';
import { useRouter } from 'next/router';
import { toQueryObject } from '../../utils/queryString';
import OrdersSearchForm from '../../component/SearchForms/Orders';
import dayjs from 'dayjs';
import { COMMON_FORMAT } from '../../constants/date';
import { get } from 'lodash-es';
import { paymentStatus, reservationStatus } from '../../constants/order';
import { paymentMethods } from '../../constants/Workshop';
import BasicModal from '../../component/Modal';
import OrderStatusModifyForm from '../../component/ModifyForms/OrderStatus';

const headers = [
    { key: 'workshop.adminName', label: '담당자', span: 2 },
    {
        key: 'reservationStatus',
        label: '예약',
        span: 2,
        render: (order) => (
            <Tooltip title={dayjs(order.latestReservationStatusUpdatedAt).format(COMMON_FORMAT)}>
                <u>{reservationStatus[order.reservationStatus].label}</u>
            </Tooltip>
        ),
    },
    { key: 'workshop.companyName', label: '회사명', span: 2 },
    { key: 'workshop.clientName', label: '회원명', span: 2 },
    {
        key: 'workshop.createdAt',
        label: '문의일',
        span: 2,
        render: ({ workshop }) => dayjs(workshop.createdAt).format(COMMON_FORMAT),
    },
    { key: 'productName', label: '상품명', span: 2 },
    {
        key: 'reservationDate',
        label: '진행일',
        span: 2,
        render: ({ reservationDate }) => dayjs(reservationDate).format(COMMON_FORMAT),
    },
    { key: 'participants', label: '인원', span: 1, render: ({ participants }) => participants.toLocaleString() },
    { key: 'salesTotal', label: '총 비용', span: 2, render: ({ salesTotal }) => salesTotal.toLocaleString() },
    {
        key: 'paymentStatus',
        label: '결제',
        span: 2,
        render: (order) => (
            <Tooltip title={dayjs(order.latestPaymentStatusUpdatedAt).format(COMMON_FORMAT)}>
                <u>{paymentStatus[order.paymentStatus].label}</u>
            </Tooltip>
        ),
    },
    {
        key: 'workshop.paymentMethod',
        label: '수단',
        span: 2,
        render: ({ workshop }) => paymentMethods[workshop.paymentMethod].label,
    },
    { key: 'statusDetails', label: '상태설명', span: 2 },
];

function Orders({
    createdStartAt,
    createdEndAt,
    reservedStartAt,
    reservedEndAt,
    adminName,
    companyName,
    clientName,
    reservationStatus,
    paymentStatus,
    productName,
    productType,
}) {
    const searchQueries = {
        createdStartAt,
        createdEndAt,
        reservedStartAt,
        reservedEndAt,
        adminName,
        companyName,
        clientName,
        reservationStatus,
        paymentStatus,
        productName,
        productType,
    };
    const router = useRouter();

    const [showOrderStatusModal, setShowOrderStatusModal] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);

    const fetchOrders = useOrdersStore((state) => state.fetchOrders);
    const resetOrders = useOrdersStore((state) => state.resetOrders);
    const updateOrderStatus = useOrdersStore((state) => state.updateOrderStatus);
    const orders = useOrdersStore((state) => state.orders);

    const { hasNext, totalResults, result, page, next } = orders;

    const orderList = result?.map((result) => {
        return {
            id: result._id,
            rows: headers.map(({ key, span, render }) => {
                return {
                    key,
                    Component: render ? render(result) : get(result, key),
                    span,
                };
            }),
        };
    });

    const fetchMore = async (init = false) => {
        try {
            if (init) {
                await fetchOrders({
                    ...searchQueries,
                    page: 1,
                    limit: SEARCH_LIMIT,
                });
                return;
            }

            await fetchOrders({ ...searchQueries, page: next, limit: SEARCH_LIMIT }, true);
        } catch (e) {
            message.error('리스트를 불러오는 데 실피하였습니다.');
        }
    };

    const handleOrderItemClick = async (orderId) => {
        const order = result.find((order) => order._id === orderId);

        if (!order) {
            message.warn('워크샵을 찾을 수 없습니다.');
            return;
        }

        router.push(`/workshops/${order.workshop._id}`);
    };

    const handleOrderStatusFormSubmit = async (type, values) => {
        try {
            await updateOrderStatus({ orderIds: checkedItems, type, ...values });
            message.success('상태 변경을 완료하였습니다.');
        } catch (e) {
            console.log(e);
            message.error('상태 변경을 실패하였습니다.');
        }
    };

    useEffect(() => {
        if (orders.result) return;
        fetchMore(true);
    }, [searchQueries]);

    return (
        <>
            <ContentLayout>
                <SearchList
                    title="주문 검색"
                    withCheckBox
                    headers={headers}
                    items={orderList}
                    totalLength={totalResults || 0}
                    hasNext={hasNext}
                    searchQueries={searchQueries}
                    fetchData={fetchMore}
                    initialPage={page}
                    nextPage={next}
                    modifyButtonText={checkedItems.length > 0 ? '상태변경' : ''}
                    onItemClick={handleOrderItemClick}
                    onCheckedItemChange={(v) => setCheckedItems(v)}
                    onModifyButtonClick={() => setShowOrderStatusModal(true)}
                >
                    <OrdersSearchForm
                        initialValues={searchQueries}
                        onSubmit={(values) => {
                            resetOrders();
                            router.push({
                                pathname: '/orders',
                                query: toQueryObject(values),
                            });
                        }}
                    />
                </SearchList>
            </ContentLayout>
            <BasicModal
                defaultBackground
                title={'상태변경'}
                isOpen={showOrderStatusModal}
                onClose={() => setShowOrderStatusModal(false)}
            >
                <OrderStatusModifyForm
                    submitButtonLabel={'변경하기'}
                    initialValues={{
                        reservationStatus: '',
                        paymentStatus: '',
                        latestReservationStatusUpdatedAt: dayjs().startOf('day').toISOString(),
                        latestPaymentStatusUpdatedAt: dayjs().startOf('day').toISOString(),
                    }}
                    onSubmit={handleOrderStatusFormSubmit}
                    onClose={() => setShowOrderStatusModal(false)}
                />
            </BasicModal>
        </>
    );
}

export const getServerSideProps = (ctx) => {
    const {
        createdStartAt = '',
        createdEndAt = '',
        reservedStartAt = '',
        reservedEndAt = '',
        adminName = '',
        companyName = '',
        clientName = '',
        reservationStatus = '',
        paymentStatus = '',
        productName = '',
        productType = '',
    } = ctx.query;

    return {
        props: {
            createdStartAt,
            createdEndAt,
            reservedStartAt,
            reservedEndAt,
            adminName,
            companyName,
            clientName,
            reservationStatus,
            paymentStatus,
            productName,
            productType,
        },
    };
};

export default Orders;
