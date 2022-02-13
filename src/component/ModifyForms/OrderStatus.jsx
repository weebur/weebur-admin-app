import React from 'react';
import { ButtonsWrapper, FieldSection, Form, InputWrapper } from './styles';
import SelectBox from '../Form/SelectBox';
import { useFormik } from 'formik';
import { paymentStatus, reservationStatus } from '../../constants/order';
import CommonButton from '../Button';
import styled from 'styled-components';
import { pick } from 'lodash-es';

const ButtonWrapper = styled.div`
    padding-top: 10px;
`;

function OrderStatusModifyForm({ initialValues, onSubmit, onClose }) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            <FieldSection direction="column">
                <InputWrapper>
                    <SelectBox
                        label={'예약상태'}
                        name={'reservationStatus'}
                        value={formik.values.reservationStatus}
                        onChange={formik.setFieldValue}
                        options={Object.values(reservationStatus)}
                    />
                    <ButtonWrapper>
                        <CommonButton
                            small
                            type="button"
                            disabled={formik.initialValues.reservationStatus === formik.values.reservationStatus}
                            onClick={async () => {
                                await onSubmit(
                                    'reservation',
                                    pick(formik.values, ['reservationStatus', 'latestReservationStatusUpdatedAt']),
                                );
                                formik.resetForm();
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
                            onClick={async () => {
                                await onSubmit(
                                    'payment',
                                    pick(formik.values, ['paymentStatus', 'latestPaymentStatusUpdatedAt']),
                                );
                                formik.resetForm();
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
