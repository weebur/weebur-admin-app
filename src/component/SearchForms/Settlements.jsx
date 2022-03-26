import React from 'react';
import { useFormik } from 'formik';
import { Form, InputWrapper } from './styles';
import SelectBox from '../Form/SelectBox';
import Input from '../Form/Input';
import SubmitButton from '../Form/SubmitButton';
import CommonButton from '../Button';
import { supplierTypes } from '../../constants/supplier';
import SearchButtons from '../Button/SearchButtons';

const SEARCH_START_YEAR = 2015;

function SettlementsSearchForm({ initialValues, onSubmit, onReset }) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit,
    });

    return (
        <Form width={600} onSubmit={formik.handleSubmit}>
            <InputWrapper>
                <SelectBox
                    name="year"
                    label="연도"
                    onChange={formik.setFieldValue}
                    value={Number(formik.values.year)}
                    options={new Array(12).fill(null).map((_, i) => {
                        return { key: i + SEARCH_START_YEAR, label: `${i + SEARCH_START_YEAR}년` };
                    })}
                />

                <SelectBox
                    name="month"
                    label="월"
                    onChange={formik.setFieldValue}
                    value={Number(formik.values.month)}
                    options={new Array(12).fill(null).map((_, i) => {
                        return { key: i + 1, label: `${i + 1}월` };
                    })}
                />
            </InputWrapper>

            <InputWrapper>
                <Input
                    allowClear
                    name="supplierName"
                    label="업체명"
                    onChange={formik.handleChange}
                    value={formik.values.supplierName}
                />
                <SelectBox
                    name="supplierType"
                    label="사업자형태"
                    onChange={formik.setFieldValue}
                    value={formik.values.supplierType}
                    options={Object.values(supplierTypes)}
                />
            </InputWrapper>
            <InputWrapper>
                <SelectBox
                    allowClear
                    name="isPaid"
                    label="정산확인여부"
                    onChange={formik.setFieldValue}
                    value={formik.values.isPaid}
                    options={[
                        { key: 'true', label: '완료' },
                        { key: 'false', label: '미완료' },
                    ]}
                />
                <SelectBox
                    allowClear
                    name="isCompleted"
                    label="입금확인여부"
                    onChange={formik.setFieldValue}
                    value={formik.values.isCompleted}
                    options={[
                        { key: 'true', label: '완료' },
                        { key: 'false', label: '미완료' },
                    ]}
                />
            </InputWrapper>
            <InputWrapper centered>
                <SearchButtons disabled={!formik.dirty} onReset={onReset} />
            </InputWrapper>
        </Form>
    );
}

export default SettlementsSearchForm;
