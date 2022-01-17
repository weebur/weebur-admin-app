import React from 'react';
import { ButtonsWrapper, Form, InputWrapper } from './styles';
import { useFormik } from 'formik';
import Input from '../Form/Input';
import { companyCategories } from '../../constants/company';
import SelectBox from '../Form/SelectBox';
import SubmitButton from '../Form/SubmitButton';
import CommonButton from '../Button';
import TextArea from '../Form/TextArea';
import dayjs from 'dayjs';
import { COMMON_FORMAT } from '../../constants/date';

function ModifyCompanyForm({
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

    return (
        <Form onSubmit={formik.handleSubmit}>
            <InputWrapper>
                <Input
                    required
                    label="회사명"
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
                    name="category"
                    label="분류"
                    onChange={formik.setFieldValue}
                    value={formik.values.category}
                    options={Object.values(companyCategories)}
                />

                <SelectBox
                    allowClear
                    name="partner"
                    label="분류"
                    onChange={formik.setFieldValue}
                    value={formik.values.partner}
                    options={[
                        { key: true, label: '제휴' },
                        { key: false, label: '일반' },
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
            <ButtonsWrapper>
                <CommonButton
                    small
                    light
                    onClick={() => {
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

export default ModifyCompanyForm;
