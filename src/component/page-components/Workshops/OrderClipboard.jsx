import React, { useState } from 'react';
import styled from 'styled-components';
import SelectBox from '../../Form/SelectBox';
import CommonButton from '../../Button';
import dayjs from 'dayjs';
import { COMMON_FORMAT } from '../../../constants/date';

const FieldSection = styled.div`
    width: 100%;
    display: flex;
    margin-top: 30px;
    align-items: flex-end;
    padding: 33px 42px 44px 38px;
    background: #ffffff;
    gap: 20px;
    border-radius: 20px;
`;

const getLabel = (order) =>
    `${dayjs(order.reservationDate).format(COMMON_FORMAT)} | ${order.productName} | ${order.supplierName}`;

function OrderClipboard({ workshop, forUser, forTeacher }) {
    const [order, setOrder] = useState('');
    console.log(workshop);
    return (
        <div>
            <FieldSection>
                <SelectBox
                    label="대상 상품 선택"
                    name={'order'}
                    value={order}
                    onChange={(_, v) => setOrder(v)}
                    options={workshop.orders.map((order) => ({
                        key: order._id,
                        label: getLabel(order),
                        value: order._id,
                    }))}
                />
                <CommonButton>클립보드 복사</CommonButton>
            </FieldSection>
            <FieldSection></FieldSection>
        </div>
    );
}

export default OrderClipboard;
