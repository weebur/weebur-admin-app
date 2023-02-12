import React from 'react';
import { ButtonsWrapper, FieldSection, Form, InputWrapper } from './styles';
import SelectBox from '../Form/SelectBox';
import { useFormik } from 'formik';
import { cancellationReasons, paymentStatus, reservationStatus } from '../../constants/order';
import CommonButton from '../Button';
import styled from 'styled-components';
import { pick } from 'lodash-es';
import { Col, Row } from 'antd';

const ButtonWrapper = styled.div`
    padding-top: 10px;
`;

function OrderStatusModifyForm({ initialValues, onSubmit, onClose }) {
    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <FieldSection direction="column">
                <InputWrapper>
                    <Row style={{ width: '100%' }} gutter={8}>
                        <Col flex={'50%'}>
                            <SelectBox
                                label={'예약상태'}
                                name={'reservationStatus'}
                                value={formik.values.reservationStatus}
                                onChange={(name, value) => {
                                    formik.setFieldValue(name, value);
                                    if (value !== 'CANCEL_RESERVATION') {
                                        formik.setFieldValue('cancellationReason', '');
                                    }
                                }}
                                options={Object.values(reservationStatus)}
                            />
                        </Col>
                        <Col flex={'50%'}>
                            {formik.values.reservationStatus === 'CANCEL_RESERVATION' && (
                                <SelectBox
                                    label="취소사유"
                                    name={'cancellationReason'}
                                    value={formik.values.cancellationReason}
                                    onChange={formik.setFieldValue}
                                    options={Object.values(cancellationReasons)}
                                />
                            )}
                        </Col>
                    </Row>
                    <ButtonWrapper>
                        <CommonButton
                            small
                            type="button"
                            disabled={formik.initialValues.reservationStatus === formik.values.reservationStatus}
                            onClick={async (e) => {
                                e.preventDefault();
                                await onSubmit(
                                    'reservation',
                                    pick(formik.values, [
                                        'reservationStatus',
                                        'latestReservationStatusUpdatedAt',
                                        'cancellationReason',
                                    ]),
                                );
                            }}
                        >
                            변경하기
                        </CommonButton>
                    </ButtonWrapper>
                </InputWrapper>
                <InputWrapper>
                    <SelectBox
                        label={'결제상태'}
                        name={'paymentStatus'}
                        value={formik.values.paymentStatus}
                        onChange={formik.setFieldValue}
                        options={Object.values(paymentStatus)}
                    />
                    <ButtonWrapper>
                        <CommonButton
                            small
                            type="button"
                            disabled={formik.initialValues.paymentStatus === formik.values.paymentStatus}
                            onClick={async (e) => {
                                e.preventDefault();
                                await onSubmit(
                                    'payment',
                                    pick(formik.values, ['paymentStatus', 'latestPaymentStatusUpdatedAt']),
                                );
                            }}
                        >
                            변경하기
                        </CommonButton>
                    </ButtonWrapper>
                </InputWrapper>
            </FieldSection>
            <ButtonsWrapper>
                <CommonButton
                    small
                    light
                    onClick={() => {
                        onClose();
                    }}
                >
                    닫기
                </CommonButton>
            </ButtonsWrapper>
        </Form>
    );
}

export default OrderStatusModifyForm;
