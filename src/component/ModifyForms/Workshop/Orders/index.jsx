import React, { useEffect, useState } from 'react';
import { Checkbox, Col, Modal, Row, Typography } from 'antd';
import { paymentStatus, reservationStatus } from '../../../../constants/order';
import dayjs from 'dayjs';
import CreateButton from '../../../Button/CreateButton';
import OrderItem from './OrderItem';
import SelectBox from '../../../Form/SelectBox';

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
    const [modifyStatus, setModifyStatus] = useState({
        reservationStatus: '',
        paymentStatus: '',
    });

    const removeItem = (index) => {
        Modal.confirm({
            centered: true,
            title: '????????? ????????? ???????????????. ?????????????????????????',
            content: '????????? ?????? ????????? ???????????????.',
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
                    <Typography.Title level={5}>?????? ?????? (??? {values.orders.length}???)</Typography.Title>
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
                        <Col>????????????</Col>
                    </Row>
                    <Row align="bottom" justify="end" style={{ flex: '0 0 500px' }}>
                        {checked.length > 0 && (
                            <Col flex={'0 0 310px'}>
                                <Row gutter={10} align="bottom">
                                    <Col flex={'0 0 150px'}>
                                        <SelectBox
                                            label="????????????"
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
                                            label="????????????"
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
                            <CreateButton onClick={() => onValueChange('orders', [...values.orders, initialOrder])} />
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

export default Orders;
