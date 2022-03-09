import React, { useState } from 'react';
import { useFormik } from 'formik';
import { FieldSection, Form, InputWrapper } from './styles';
import DatePicker from '../Form/DatePicker';
import SubmitButton from '../Form/SubmitButton';
import dayjs from 'dayjs';

import styled from 'styled-components';
import CheckBoxInput from '../Form/CheckBoxInput';
import NumberInput from '../Form/NumberInput';
import TextArea from '../Form/TextArea';
import BasicModal from '../Modal';
import CommonButton from '../Button';

const FormWrapper = styled.div`
    width: 100%;
    max-width: 900px;
    margin: auto;
`;

const FormRow = styled.div`
    display: flex;
    width: 100%;
    gap: 20px;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    width: 100%;
`;

function SettlementModifyForm({ initialValues = {}, totalSettlement, onSubmit, submitButtonLabel, onDocButtonClick }) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
    });

    return (
        <Form full onSubmit={formik.handleSubmit}>
            <FormWrapper>
                <FieldSection direction="column">
                    <FormRow>
                        <InputWrapper>
                            <div>
                                <CheckBoxInput
                                    subLabel="정산확인"
                                    name="isPaid"
                                    checked={formik.values.isPaid}
                                    onChange={(name, v) => {
                                        if (v) {
                                            formik.setFieldValue('latestPayment', totalSettlement);
                                            formik.setFieldValue('paidAt', dayjs().toISOString());
                                        } else {
                                            formik.setFieldValue('latestPayment', formik.initialValues.latestPayment);
                                            formik.setFieldValue('paidAt', formik.initialValues.paidAt);
                                        }
                                        formik.setFieldValue(name, v);
                                    }}
                                />
                                <DatePicker
                                    label="정산확인일"
                                    name="paidAt"
                                    value={formik.values.paidAt}
                                    onChange={formik.setFieldValue}
                                />
                            </div>

                            <NumberInput
                                disabled
                                label="정산확인금액"
                                name="latestPayment"
                                value={formik.values.latestPayment.toLocaleString()}
                                suffix="원"
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <div>
                                <CheckBoxInput
                                    subLabel="입금확인"
                                    name="isCompleted"
                                    checked={formik.values.isCompleted}
                                    onChange={(name, v) => {
                                        if (v) {
                                            formik.setFieldValue('latestCompletedAmount', totalSettlement);
                                            formik.setFieldValue('completedAt', dayjs().toISOString());
                                        } else {
                                            formik.setFieldValue(
                                                'latestCompletedAmount',
                                                formik.initialValues.latestCompletedAmount,
                                            );
                                            formik.setFieldValue('completedAt', formik.initialValues.completedAt);
                                        }
                                        formik.setFieldValue(name, v);
                                    }}
                                />
                                <DatePicker
                                    label="정산확인일"
                                    name="completedAt"
                                    value={formik.values.completedAt}
                                    onChange={formik.setFieldValue}
                                />
                            </div>

                            <NumberInput
                                disabled
                                label="입금확인금액"
                                name="latestCompletedAmount"
                                value={formik.values.latestCompletedAmount.toLocaleString()}
                                suffix="원"
                            />
                        </InputWrapper>
                    </FormRow>
                    <FormRow>
                        <InputWrapper>
                            <TextArea
                                label="비고"
                                name="details"
                                value={formik.values.details}
                                onChange={formik.handleChange}
                            />
                        </InputWrapper>
                    </FormRow>
                    <ButtonsWrapper>
                        <CommonButton
                            onClick={(e) => {
                                e.preventDefault();
                                onDocButtonClick();
                            }}
                        >
                            정산내역서 출력
                        </CommonButton>
                        <SubmitButton
                            disabled={!formik.dirty || formik.isSubmitting}
                            small
                            primary
                            text={submitButtonLabel}
                        />
                    </ButtonsWrapper>
                </FieldSection>
            </FormWrapper>
        </Form>
    );
}

export default SettlementModifyForm;
