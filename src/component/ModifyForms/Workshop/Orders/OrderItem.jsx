import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Fields, OpenToggleButton } from '../styles';
import { DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { COMMON_FORMAT } from '../../../../constants/date';
import { getTotalPayment } from '../../../../services/OrderService';
import { cancellationReasons, paymentStatus, reservationStatus } from '../../../../constants/order';
import { Checkbox, Col, Divider, Row, Statistic } from 'antd';
import Ellipsis from '../../../Text/Ellipsis';
import SelectBox from '../../../Form/SelectBox';
import TextInput from '../../../Form/Input';
import ProductFields from './ProductFields';
import DatePicker from '../../../Form/DatePicker';
import NumberInput from '../../../Form/NumberInput';
import PriceGenerator from './PriceGenerator';
import theme from '../../../../theme';
import useOrdersStore from '../../../../stores/order';
import CommonButton from '../../../Button';
import { productTypes } from '../../../../constants/product';
import TextArea from '../../../Form/TextArea';
import ReactDatePicker from '../../../Form/DatePicker/ReactDatePicker';

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
    gap: 20px;
`;

const OrderForm = styled.div`
    padding: 60px 0;
`;

const StyledFields = styled(Fields)`
    gap: 20px;
    margin-bottom: 45px;
    //align-items: flex-end;
`;

const InlineButtonWrapper = styled.div`
    padding-top: 18px;
`;

const StatusDetails = styled.div`
    flex: 1 0 60%;
`;

const PaymentTotal = styled.div`
    display: flex;
    gap: 20px;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 40px;

    & > .ant-divider {
        border: 1px solid ${({ theme }) => theme.color.text};
        height: 40px;
    }
    & .ant-statistic-content {
        font-size: ${({ theme }) => theme.fontSize.large};
    }

    & .ant-statistic-title:last-child {
        color: ${({ theme }) => theme.color.primary};
    }
`;

function OrderItem({
    order,
    index,
    initialValues,
    onChange,
    onValueChange,
    removeItem,
    errors,
    checked,
    onCheckedChange,
}) {
    const formData = useOrdersStore((state) => state.formData);

    const [open, setOpen] = useState(false);
    const [mount, setMount] = useState(false);

    const isOnline = formData.product?.type === productTypes.ONLINE.key;

    const paymentTotal = useMemo(() => {
        return getTotalPayment(order.payment, order.supplierType);
    }, [
        order.payment.personal,
        order.payment.session,
        order.payment.excursion,
        order.payment.delivery,
        order.payment.options,
        order.payment.discount,
        order.supplierType,
    ]);
    const isUpdatedReservationStatus = useMemo(
        () => initialValues.orders[index]?.reservationStatus !== order.reservationStatus,
        [initialValues, order.reservationStatus],
    );
    const isUpdatedPaymentStatus = useMemo(
        () => initialValues.orders[index]?.paymentStatus !== order.paymentStatus,
        [initialValues, order.reservationStatus],
    );

    useEffect(() => {
        if (!mount) return;
        onValueChange(`orders.${index}.payment.summary`, paymentTotal);
    }, [paymentTotal]);

    useEffect(() => {
        if (isUpdatedReservationStatus) {
            onValueChange(`orders.${index}.latestReservationStatusUpdatedAt`, dayjs().startOf('day').toISOString());
        } else {
            onValueChange(
                `orders.${index}.latestReservationStatusUpdatedAt`,
                initialValues.orders[index].latestReservationStatusUpdatedAt,
            );
        }
    }, [isUpdatedReservationStatus]);

    useEffect(() => {
        if (isUpdatedPaymentStatus) {
            onValueChange(`orders.${index}.latestPaymentStatusUpdatedAt`, dayjs().startOf('day').toISOString());
        } else {
            onValueChange(
                `orders.${index}.latestPaymentStatusUpdatedAt`,
                initialValues.orders[index].latestPaymentStatusUpdatedAt,
            );
        }
    }, [isUpdatedPaymentStatus]);

    useEffect(() => {
        setMount(true);
    }, []);

    return (
        <Order>
            <Title>
                <TitleItem flex={'60%'}>
                    <Col flex={'0 0 20px'}>
                        <Checkbox
                            checked={checked.includes(index)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    onCheckedChange([...checked, index]);
                                    return;
                                }
                                onCheckedChange(checked.filter((item) => item !== index));
                            }}
                        />
                    </Col>
                    <Col flex={'0 0 100px'}>{dayjs(order.reservationDate).format(COMMON_FORMAT)}</Col>
                    <Col flex={'0 0 100px'}>{dayjs(order.reservationDate).format('HH:mm')}</Col>
                    <Col flex={'0 0 250px'}>
                        <Ellipsis line={1}>{order.productName}</Ellipsis>
                    </Col>
                    <Col flex={'0 0 100px'}>{`총 ${order.participants.toLocaleString()}명`}</Col>
                    <Col flex={'0 0 150px'}>{`${order.payment.summary.total.toLocaleString()}원`}</Col>
                </TitleItem>
                <TitleItem flex={'20%'}>
                    <Col flex={'0 0 70px'}>{reservationStatus[order.reservationStatus].label}</Col>
                    <Col flex={'0 0 70px'}>{paymentStatus[order.paymentStatus].label}</Col>
                    <Col flex={'0 0 160px'}>
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
                        <OpenToggleButton
                            onClick={() => {
                                removeItem(index);
                            }}
                        >
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
                            onChange={(name, value) => {
                                onValueChange(name, value);
                                if (value !== 'CANCEL_RESERVATION') {
                                    onValueChange(`orders.${index}.cancellationReason`, '');
                                }
                            }}
                            options={Object.values(reservationStatus)}
                        />
                        <StatusDetails>
                            {order.reservationStatus === 'CANCEL_RESERVATION' && (
                                <SelectBox
                                    label="취소사유"
                                    name={`orders.${index}.cancellationReason`}
                                    value={order.cancellationReason}
                                    onChange={onValueChange}
                                    options={Object.values(cancellationReasons)}
                                />
                            )}
                        </StatusDetails>
                    </StyledFields>
                    <StyledFields>
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

                    <ProductFields
                        order={order}
                        index={index}
                        onChange={onChange}
                        onValueChange={onValueChange}
                        errors={errors}
                    />

                    <StyledFields>
                        <ReactDatePicker
                            label="진행일시"
                            value={order.reservationDate ? new Date(order.reservationDate) : null}
                            onChange={(v) => onValueChange(`orders.${index}.reservationDate`, v)}
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

                    {order.productId && (
                        <>
                            <PriceGenerator
                                order={order}
                                index={index}
                                onChange={onChange}
                                onValueChange={onValueChange}
                            />

                            <PaymentTotal>
                                <Statistic title="판매액" value={order.payment.summary.total} suffix="원" />
                                <Divider type="vertical" />
                                <Statistic title="수수료" value={order.payment.summary.totalIncome} suffix="원" />
                                <Divider type="vertical" />
                                <Statistic title="정산액" value={order.payment.summary.totalSettlement} suffix="원" />
                                <Divider type="vertical" />
                                <Statistic
                                    title="세금"
                                    value={order.payment.summary.tax + order.payment.summary.vat}
                                    suffix="원"
                                />
                                <Divider type="vertical" />
                                <Statistic
                                    title="최종 정산액"
                                    value={order.payment.summary.finalSettlement}
                                    valueStyle={{ color: theme.color.primary, fontWeight: 'bold' }}
                                    suffix="원"
                                />
                            </PaymentTotal>
                        </>
                    )}

                    {isOnline && (
                        <StyledFields>
                            <TextArea
                                rows={10}
                                label="온라인 화상정보"
                                placeholder="http://zoom123.url.abc"
                                name={`orders.${index}.onlineInfo.details`}
                                value={order.onlineInfo.details}
                                onChange={onChange}
                            />

                            <TextInput
                                label="온라인 배송정보 (https만 입력 가능)"
                                placeholder="weebur.com"
                                name={`orders.${index}.onlineInfo.fileUrl`}
                                value={order.onlineInfo.fileUrl}
                                onChange={onChange}
                            />

                            <InlineButtonWrapper>
                                <CommonButton
                                    inline
                                    small
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (order.onlineInfo.fileUrl.startsWith('https://')) {
                                            window.open(order.onlineInfo.fileUrl, '_blank');
                                            return;
                                        }
                                        window.open('https://' + order.onlineInfo.fileUrl, '_blank');
                                    }}
                                >
                                    폴더이동
                                </CommonButton>
                            </InlineButtonWrapper>
                        </StyledFields>
                    )}
                </OrderForm>
            )}
        </Order>
    );
}

export default OrderItem;
