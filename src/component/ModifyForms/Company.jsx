import React from 'react';
import { ButtonsWrapper, Form, InputWrapper } from './styles';
import { useFormik } from 'formik';
import Input from '../Form/Input';
import { companyCategories } from '../../constants/company';
import SelectBox from '../Form/SelectBox';
import SubmitButton from '../Form/SubmitButton';
import CommonButton from '../Button';
import { isEmpty } from 'lodash-es';
import TextArea from '../Form/TextArea';

function ModifyCompanyForm({ initialValues, onSubmit, onReset }) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            category: '',
            partner: false,
            details: '',
            ...initialValues,
        },
        onSubmit,
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <InputWrapper>
                <Input
                    label="회사명"
                    name="name"
                    value={formik.values.name}
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
                    text={isEmpty(initialValues) ? '생성하기' : '수정하기'}
                />
            </ButtonsWrapper>
        </Form>
    );
}

export default ModifyCompanyForm;
