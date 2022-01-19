import React from 'react';
import { ButtonsWrapper, Form, InputWrapper } from './styles';
import { useFormik } from 'formik';
import Input from '../Form/Input';
import { productTypes } from '../../constants/product';
import SelectBox from '../Form/SelectBox';
import SubmitButton from '../Form/SubmitButton';
import CommonButton from '../Button';
import TextArea from '../Form/TextArea';
import dayjs from 'dayjs';
import { COMMON_FORMAT } from '../../constants/date';
import NumberInput from '../Form/NumberInput';
import { Typography } from 'antd';

function ModifyProductForm({
    initialValues,
    onSubmit,
    onReset,
    submitButtonLabel,
}) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
    });
    console.log(formik.values);
    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
            }}
        >
            <InputWrapper>
                <Input
                    required
                    label="상품명"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                <Input
                    disabled
                    label="등록일"
                    name="createdAt"
                    value={dayjs(formik.values.createdAt).format(COMMON_FORMAT)}
                    onChange={formik.handleChange}
                />
            </InputWrapper>
            <InputWrapper>
                <SelectBox
                    allowClear
                    required
                    name="type"
                    label="종류"
                    onChange={formik.setFieldValue}
                    value={formik.values.type}
                    options={Object.values(productTypes)}
                />
                <NumberInput
                    label="수수료"
                    name="fee"
                    value={formik.values.fee * 100}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (isNaN(value) || Number(value) > 100) {
                            return;
                        }
                        e.target.value = Number(value) / 100;
                        formik.handleChange(e);
                    }}
                    suffix={'%'}
                />
                <SelectBox
                    allowClear
                    name="active"
                    label="운영여부"
                    onChange={formik.setFieldValue}
                    value={formik.values.active}
                    options={[
                        { key: true, label: '운영' },
                        { key: false, label: '미운영' },
                    ]}
                />
            </InputWrapper>
            <InputWrapper>
                <TextArea
                    label="특이사항"
                    name="details"
                    value={formik.values.details}
                    onChange={formik.handleChange}
                />
            </InputWrapper>
            <Typography.Title level={5}>상품 가격</Typography.Title>
            <ButtonsWrapper>
                <CommonButton
                    small
                    light
                    onClick={(e) => {
                        e.preventDefault();
                        formik.setValues(initialValues);
                        onReset && onReset();
                    }}
                >
                    초기화
                </CommonButton>
                <SubmitButton
                    disabled={!formik.dirty || formik.isSubmitting}
                    small
                    primary
                    text={submitButtonLabel}
                />
            </ButtonsWrapper>
        </Form>
    );
}

export default ModifyProductForm;
