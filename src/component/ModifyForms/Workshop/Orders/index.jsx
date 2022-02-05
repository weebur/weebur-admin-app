import React from 'react';
import { SubTitle } from '../styles';
import { Typography } from 'antd';
import { paymentStatus, reservationStatus } from '../../../../constants/order';
import dayjs from 'dayjs';
import CreateButton from '../../../Button/CreateButton';
import OrderItem from './OrderItem';

const initialOrder = {
    reservationStatus: reservationStatus.CONFIRM_SCHEDULE.key,
    latestReservationStatusUpdatedAt: dayjs().startOf('day').toISOString(),
    paymentStatus: paymentStatus.WAITING.key,
    latestPaymentStatusUpdatedAt: dayjs().startOf('day').toISOString(),
    statusDetails: '',
    productId: '61f00add2ee7e334e580505a',
    productName: '상품1',
    productType: 'OFFLINE',
    supplierId: '61f171c4ae873b9f708bc031',
    supplierName: '테스트 업체',
    supplierType: 'CORPORATION',
    productFee: 0,
    mainTeacherId: '',
    mainTeacherName: '',
    mainTeacherMobile: '',
    reservationDate: dayjs().toISOString(),
    participants: 100,
    onlineInfo: '',
    payment: {
        personal: {
            total: 0,
            totalIncome: 0,
            totalSettlement: 0,
            statements: [],
        },
        session: {
            total: 0,
            totalIncome: 0,
            totalSettlement: 0,
            statements: [],
        },
        excursion: {
            total: 0,
            totalIncome: 0,
            totalSettlement: 0,
            statements: [],
        },
        delivery: {
            total: 0,
            totalIncome: 0,
            totalSettlement: 0,
            statements: [],
        },
        options: {
            total: 0,
            totalIncome: 0,
            totalSettlement: 0,
            statements: [],
        },
        note: '',
        discount: {
            amount: 0,
            discountedBySupplier: 0,
            discountedItemsBySupplier: '',
            note: '',
        },
    },
};

function Orders({ onValueChange, values, onChange }) {
    return (
        <>
            <SubTitle>
                <Typography.Title level={5}>주문 정보</Typography.Title>
                <div>
                    <CreateButton onClick={() => onValueChange('orders', [...values.orders, initialOrder])} />
                </div>
            </SubTitle>
            {values.orders.map((order, index) => {
                return (
                    <OrderItem
                        key={index}
                        order={order}
                        index={index}
                        onChange={onChange}
                        onValueChange={onValueChange}
                    />
                );
            })}
        </>
    );
}

export default Orders;
