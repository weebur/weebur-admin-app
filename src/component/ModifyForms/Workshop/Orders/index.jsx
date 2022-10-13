import React, { useEffect, useState } from 'react';
import { Checkbox, Col, Modal, Row, Typography } from 'antd';
import { paymentStatus, reservationStatus } from '../../../../constants/order';
import dayjs from 'dayjs';
import CreateButton from '../../../Button/CreateButton';
import OrderItem from './OrderItem';
import SelectBox from '../../../Form/SelectBox';
import Button from '../../../Button';
import styled from 'styled-components';

const initialOrder = {
    reservationStatus: reservationStatus.REQUIRED.key,
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

function Orders({ onValueChange, values, onChange, initialValues, errors }) {
    const [checked, setChecked] = useState([]);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [sortType, setSortType] = useState('');
    const [modifyStatus, setModifyStatus] = useState({
        reservationStatus: '',
        paymentStatus: '',
    });

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

    const handleCheckAllChange = (e) => {
        const checked = e.target.checked;

        setChecked(checked ? values.orders.map((_, i) => i) : []);
        setIndeterminate(false);
        setCheckAll(checked);
    };

    const handleCheckBoxChange = (v) => {
        setChecked(v);
        setIndeterminate(values.orders.length > v.length && v.length > 0);
        setCheckAll(values.orders.length === v.length);
    };

    useEffect(() => {
        const isCanceled = values.orders.every(
            (order) => order.reservationStatus === reservationStatus.CANCEL_RESERVATION.key,
        );

        onValueChange(`isCanceled`, isCanceled);
    }, [values.orders]);

    return (
        <>
            <div>
                <Row>
                    <Typography.Title level={5}>주문 정보 (총 {values.orders.length}건)</Typography.Title>
                </Row>
                <Row gutter={10} align="bottom" justify="space-between" style={{ height: 70 }}>
                    <Row gutter={10} align="bottom" style={{ paddingLeft: 30 }}>
                        <Col>
                            <Checkbox
                                indeterminate={indeterminate}
                                onChange={handleCheckAllChange}
                                checked={checkAll}
                            />
                        </Col>
                        <Col>전체선택</Col>
                    </Row>
                    <Row align="bottom" justify="end" style={{ flex: '0 0 500px' }}>
                        {checked.length > 0 && (
                            <Col flex={'0 0 310px'}>
                                <Row gutter={10} align="bottom">
                                    <Col flex={'0 0 150px'}>
                                        <SelectBox
                                            label="예약상태"
                                            name="reservationStatus"
                                            value={modifyStatus.reservationStatus}
                                            onChange={(_, v) => {
                                                setModifyStatus((status) => ({
                                                    ...status,
                                                    reservationStatus: v,
                                                }));
                                                checked.forEach((i) => {
                                                    onValueChange(`orders.${i}.reservationStatus`, v);
                                                });
                                            }}
                                            options={Object.values(reservationStatus)}
                                        />
                                    </Col>
                                    <Col flex={'0 0 150px'}>
                                        <SelectBox
                                            label="결제상태"
                                            name="paymentStatus"
                                            value={modifyStatus.paymentStatus}
                                            onChange={(_, v) => {
                                                setModifyStatus((status) => ({
                                                    ...status,
                                                    paymentStatus: v,
                                                }));
                                                checked.forEach((i) => {
                                                    onValueChange(`orders.${i}.paymentStatus`, v);
                                                });
                                            }}
                                            options={Object.values(paymentStatus)}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        )}
                        <Col>
                            <OrderActions>
                                <SelectBox
                                    label="정렬"
                                    name="sort"
                                    value={sortType}
                                    onChange={(_, v) => {
                                        const sorted = values.orders.slice().sort((a, b) => {
                                            if (v === 'RESERVATION_ASC') {
                                                return new Date(a.reservationDate) - new Date(b.reservationDate);
                                            }
                                            if (v === 'RESERVATION_DESC') {
                                                return new Date(b.reservationDate) - new Date(a.reservationDate);
                                            }
                                            if (v === 'SALES_ASC') {
                                                return a.payment.summary.total - b.payment.summary.total;
                                            }
                                            if (v === 'SALES_DESC') {
                                                return b.payment.summary.total - a.payment.summary.total;
                                            }
                                            return 0;
                                        });

                                        onValueChange('orders', sorted);
                                        setSortType(v);
                                    }}
                                    options={[
                                        { label: '진행일 내림차순', value: 'RESERVATION_DESC' },
                                        { label: '진행일 오름차순', value: 'RESERVATION_ASC' },
                                        { label: '판매가 내림차순', value: 'SALES_DESC' },
                                        { label: '판매가 오름차순', value: 'SALES_ASC' },
                                    ]}
                                />
                                <CreateButton
                                    onClick={() => onValueChange('orders', [initialOrder, ...values.orders])}
                                />
                            </OrderActions>
                        </Col>
                    </Row>
                </Row>
            </div>
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
                        checked={checked}
                        onCheckedChange={handleCheckBoxChange}
                        errors={errors}
                    />
                );
            })}
        </>
    );
}

const OrderActions = styled.div`
    display: flex;
    gap: 8px;
    align-items: flex-end;
    width: 400px;
    & span {
        font-size: ${({ theme }) => theme.fontSize.normal};
    }
`;

export default Orders;
