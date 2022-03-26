import React from 'react';
import { useFormik } from 'formik';
import { Form, InputWrapper } from './styles';
import RangePicker from '../Form/DatePicker/RangePicker';
import Input from '../Form/Input';
import SelectBox from '../Form/SelectBox';
import SubmitButton from '../Form/SubmitButton';
import CommonButton from '../Button';
import { paymentStatus, reservationStatus } from '../../constants/order';
import { productTypes } from '../../constants/product';
import SearchButtons from '../Button/SearchButtons';

/**
 {
        createdStartAt,
        createdEndAt,
        reservedStartAt,
        reservedEndAt,
        adminName,
        companyName,
        clientName,
        reservationStatus,
        paymentStatus,
        productName,
        productType,
    }
 */
function OrdersSearchForm({ initialValues = {}, onSubmit, onReset }) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit,
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <InputWrapper>
                <RangePicker
                    label="문의일"
                    onChange={formik.setFieldValue}
                    from={formik.values.createdStartAt}
                    to={formik.values.createdEndAt}
                    fromName={'createdStartAt'}
                    toName={'createdEndAt'}
                />
                <RangePicker
                    label="진행일"
                    onChange={formik.setFieldValue}
                    from={formik.values.reservedStartAt}
                    to={formik.values.reservedEndAt}
                    fromName={'reservedStartAt'}
                    toName={'reservedEndAt'}
                />
            </InputWrapper>
            <InputWrapper>
                <Input name="adminName" label="담당자" onChange={formik.handleChange} value={formik.values.adminName} />
                <Input
                    name="companyName"
                    label="회사"
                    onChange={formik.handleChange}
                    value={formik.values.companyName}
                />
                <Input name="clientName" label="회원" onChange={formik.handleChange} value={formik.values.clientName} />
            </InputWrapper>
            <InputWrapper>
                <SelectBox
                    allowClear
                    name="reservationStatus"
                    label="예약상태"
                    onChange={formik.setFieldValue}
                    value={formik.values.reservationStatus}
                    options={Object.values(reservationStatus)}
                />
                <SelectBox
                    allowClear
                    name="paymentStatus"
                    label="결제상태"
                    onChange={formik.setFieldValue}
                    value={formik.values.paymentStatus}
                    options={Object.values(paymentStatus)}
                />
                <Input
                    name="productName"
                    label="상품명"
                    onChange={formik.handleChange}
                    value={formik.values.productName}
                />
                <SelectBox
                    allowClear
                    name="productType"
                    label="상품종류"
                    onChange={formik.setFieldValue}
                    value={formik.values.productType}
                    options={Object.values(productTypes)}
                />
            </InputWrapper>

            <InputWrapper centered>
                <SearchButtons disabled={!formik.dirty} onReset={onReset} />
            </InputWrapper>
        </Form>
    );
}

export default OrdersSearchForm;
