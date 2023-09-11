import React from 'react';
import { ButtonsWrapper, Form, InputWrapper } from './styles';
import { useFormik } from 'formik';
import Input from '../Form/Input';
import { companyCategories, companySectors } from '../../constants/company';
import SelectBox from '../Form/SelectBox';
import SubmitButton from '../Form/SubmitButton';
import CommonButton from '../Button';
import TextArea from '../Form/TextArea';
import dayjs from 'dayjs';
import { COMMON_FORMAT } from '../../constants/date';
import { toBusinessId, toBusinessIdString } from '../../utils/text';

function ModifyCompanyForm({ initialValues, onSubmit, onReset, submitButtonLabel }) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <InputWrapper>
                <Input disabled label="회사ID" name="_id" value={formik.values._id} onChange={formik.handleChange} />
                <Input label="현재ID" name="weeburId" value={formik.values.weeburId} onChange={formik.handleChange} />
            </InputWrapper>
            <InputWrapper>
                <Input required label="회사명" name="name" value={formik.values.name} onChange={formik.handleChange} />
                <Input
                    disabled
                    label="등록일"
                    name="createdAt"
                    value={dayjs(formik.values.createdAt).format(COMMON_FORMAT)}
                    onChange={formik.handleChange}
                />
            </InputWrapper>
            <InputWrapper>
                <Input
                    label="사업자등록번호"
                    name="businessId"
                    value={toBusinessId(formik.values.businessId || '')}
                    onChange={(e) => {
                        e.target.value = toBusinessIdString(e.target.value);
                        formik.handleChange(e);
                    }}
                    placeholder={'000-00-00000'}
                />

                <SelectBox
                    allowClear
                    name="sector"
                    label="산업분야"
                    onChange={formik.setFieldValue}
                    value={formik.values.sector}
                    options={Object.values(companySectors)}
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
                    label="제휴여부"
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
                <SubmitButton disabled={!formik.dirty || formik.isSubmitting} small primary text={submitButtonLabel} />
            </ButtonsWrapper>
        </Form>
    );
}

export default ModifyCompanyForm;
