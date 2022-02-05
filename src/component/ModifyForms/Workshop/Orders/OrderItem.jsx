import React, { useState } from 'react';
import styled from 'styled-components';
import { Fields, OpenToggleButton } from '../styles';
import { DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { COMMON_FORMAT } from '../../../../constants/date';
import { getTotalPayment } from '../../../../services/OrderService';
import { paymentStatus, reservationStatus } from '../../../../constants/order';
import { Col, Row } from 'antd';
import Ellipsis from '../../../Text/Ellipsis';
import SelectBox from '../../../Form/SelectBox';
import TextInput from '../../../Form/Input';
import ProductFields from './ProductFields';
import DatePicker from '../../../Form/DatePicker';
import NumberInput from '../../../Form/NumberInput';
import PriceGenerator from './PriceGenerator';

const Order = styled.div`
    width: 100%;
    background: #ffffff;
    border-radius: 20px;
    padding: 20px 25px;
    font-size: ${({ theme }) => theme.fontSize.large};
`;

const Title = styled(Row)`
    width: 100%;
    justify-content: space-between;
`;

const TitleItem = styled(Col)`
    display: flex;
`;

const OrderForm = styled.div`
    padding: 60px 0;
`;

const StyledFields = styled(Fields)`
    gap: 20px;
    margin-bottom: 45px;
`;

const StatusDetails = styled.div`
    flex: 1 0 60%;
`;

function OrderItem({ order, index, onChange, onValueChange }) {
    const [open, setOpen] = useState(false);

    const total = getTotalPayment(order.payment);

    return (
        <Order>
            <Title>
                <TitleItem flex={'50%'}>
                    <Col flex={'80px'}>{dayjs(order.reservationDate).format(COMMON_FORMAT)}</Col>
                    <Col flex={'50px'}>{dayjs(order.reservationDate).format('HH:mm')}</Col>
                    <Col flex={'200px'}>
                        <Ellipsis line={1}>{order.productName}</Ellipsis>
                    </Col>
                    <Col flex={'100px'}>{`총 ${order.participants.toLocaleString()}명`}</Col>
                    <Col flex={'100px'}>{`${total.toLocaleString()}원`}</Col>
                </TitleItem>
                <TitleItem flex={'300px'}>
                    <Col flex={'70px'}>{reservationStatus[order.reservationStatus].label}</Col>
                    <Col flex={'70px'}>{paymentStatus[order.paymentStatus].label}</Col>
                    <Col flex={'160px'}>
                        <Ellipsis>{order.statusDetails}</Ellipsis>
                    </Col>
                </TitleItem>
                <TitleItem>
                    <Col flex={'40px'}>
                        <OpenToggleButton onClick={() => setOpen(!open)}>
                            {open ? <UpOutlined /> : <DownOutlined />}
                        </OpenToggleButton>
                    </Col>
                    <Col flex={'40px'}>
                        <OpenToggleButton>
                            <DeleteOutlined />
                        </OpenToggleButton>
                    </Col>
                </TitleItem>
            </Title>
            {open && (
                <OrderForm>
                    <StyledFields>
                        <SelectBox
                            label={`예약상태(최근변경일 ${dayjs(order.latestReservationStatusUpdatedAt).format(
                                COMMON_FORMAT,
                            )})`}
                            name={`orders.${index}.reservationStatus`}
                            value={order.reservationStatus}
                            onChange={onValueChange}
                            options={Object.values(reservationStatus)}
                        />
                        <SelectBox
                            label={`결제상태(최근변경일 ${dayjs(order.latestPaymentStatusUpdatedAt).format(
                                COMMON_FORMAT,
                            )})`}
                            name={`orders.${index}.paymentStatus`}
                            value={order.paymentStatus}
                            onChange={onValueChange}
                            options={Object.values(paymentStatus)}
                        />
                        <StatusDetails>
                            <TextInput
                                label="상태설명"
                                name={`orders.${index}.statusDetails`}
                                value={order.statusDetails}
                                onChange={onChange}
                            />
                        </StatusDetails>
                    </StyledFields>
                    <StyledFields>
                        <ProductFields order={order} index={index} onChange={onChange} onValueChange={onValueChange} />
                    </StyledFields>
                    <StyledFields>
                        <DatePicker
                            showTime
                            label="진행일시"
                            name={`orders.${index}.reservationDate`}
                            format={'YYYY-MM-DD HH:mm'}
                            value={order.reservationDate}
                            onChange={onValueChange}
                        />
                        <NumberInput
                            suffix="명"
                            label="진행인원"
                            name={`orders.${index}.participants`}
                            value={order.participants.toLocaleString() || 0}
                            onChange={onValueChange}
                        />
                        <StatusDetails />
                    </StyledFields>

                    <PriceGenerator order={order} index={index} onChange={onChange} onValueChange={onValueChange} />
                </OrderForm>
            )}
        </Order>
    );
}

export default OrderItem;
