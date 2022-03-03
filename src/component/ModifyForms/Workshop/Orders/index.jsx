import React from 'react';
import { SubTitle } from '../styles';
import { Modal, Typography } from 'antd';
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
        summary: {
            total: 0,
            totalIncome: 0,
            totalSettlement: 0,
            vat: 0,
            tax: 0,
            finalSettlement: 0,
        },
    },
    onlineInfo: {
        details: '',
        fileUrl: '',
    },
};

function Orders({ onValueChange, values, onChange, initialValues }) {
    const removeItem = (index) => {
        Modal.confirm({
            centered: true,
            title: '선택한 주문이 삭제됩니다. 진행하시겠습니까?',
            content: '저장을 해야 삭제가 완료됩니다.',
            onOk() {
                onValueChange(
                    'orders',
                    values.orders.filter((order, i) => i !== index),
                );
            },
        });
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
                        initialValues={initialValues}
                    />
                );
            })}
        </>
    );
}

export default Orders;
