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
    productId: '',
    productName: '',
    productType: '',
    supplierId: '',
    supplierName: '',
    supplierType: '',
    productFee: 0,
    mainTeacherId: '',
    mainTeacherName: '',
    mainTeacherMobile: '',
    reservationDate: dayjs().toISOString(),
    participants: 0,
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
    onlineInfo: {
        details: '',
        fileUrl: '',
    },
};

function Orders({ onValueChange, values, onChange }) {
    const removeItem = (index) => {
        onValueChange(
            'orders',
            values.orders.filter((order, i) => i !== index),
        );
    };
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
                        removeItem={removeItem}
                    />
                );
            })}
        </>
    );
}

export default Orders;
