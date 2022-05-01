import React from 'react';
import {
    AddButtonWrapper,
    ButtonsWrapper,
    CheckBoxWrapper,
    FieldSection,
    Form,
    InputWrapper,
    MultilineSortableItem,
    StyledCollapse,
} from './styles';
import { useFormik } from 'formik';
import Input from '../Form/Input';
import SelectBox from '../Form/SelectBox';
import SubmitButton from '../Form/SubmitButton';
import CommonButton from '../Button';
import TextArea from '../Form/TextArea';
import { supplierTypes } from '../../constants/supplier';
import DatePicker from '../Form/DatePicker';
import DraggableFields from '../Form/SortableFields';
import { Checkbox, message, Typography } from 'antd';
import SortableItem from '../Form/SortableFields/SortableItem';
import CreateButton from '../Button/CreateButton';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import { uniqueId } from 'lodash-es';

function ModifySupplierForm({ initialValues, onSubmit, onReset, submitButtonLabel }) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
    });

    const { teachers, mainTeacher } = formik.values;

    return (
        <Form onSubmit={formik.handleSubmit}>
            <FieldSection direction="column">
                <InputWrapper>
                    <SelectBox
                        allowClear
                        name="type"
                        label="형태"
                        onChange={formik.setFieldValue}
                        value={formik.values.type}
                        options={Object.values(supplierTypes)}
                    />
                    <DatePicker label="계약일" name="contractDate" value={formik.values.contractDate} />
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
                    <Input
                        required
                        label="업체명"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />

                    {formik.values.type !== 'FREELANCER' && (
                        <Input
                            label="대표자명"
                            name="representative"
                            value={formik.values.representative}
                            onChange={formik.handleChange}
                        />
                    )}

                    <Input
                        label={formik.values.type === 'FREELANCER' ? '주민번호' : '사업자번호'}
                        name="registrationNumber"
                        value={formik.values.registrationNumber}
                        onChange={formik.handleChange}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input
                        label="은행"
                        name="accountBank"
                        value={formik.values.accountBank}
                        onChange={formik.handleChange}
                    />
                    <Input
                        label="계좌번호"
                        name="accountNumber"
                        value={formik.values.accountNumber}
                        onChange={formik.handleChange}
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
            </FieldSection>
            <FieldSection direction="column">
                <DraggableFields
                    id={'option-price'}
                    ids={teachers?.map((_, i) => i.toString())}
                    onChange={(v) => {
                        formik.setFieldValue(
                            'teachers',
                            v.map((index) => formik.values.teachers[index]),
                        );
                    }}
                >
                    <Typography.Title level={5}>소속 강사</Typography.Title>
                    {teachers?.map((teacher, i) => {
                        const { name, email, mobile, details, active, _id } = teacher;
                        return (
                            <SortableItem
                                key={i}
                                id={i.toString()}
                                onRemove={() => {
                                    formik.setFieldValue(
                                        'teachers',
                                        teachers.filter((_, index) => i !== index),
                                    );

                                    if (mainTeacher._id === _id) {
                                        formik.setFieldValue('mainTeacher', null);
                                    }
                                }}
                            >
                                <StyledCollapse>
                                    <CollapsePanel
                                        header={name}
                                        key="1"
                                        extra={
                                            <CheckBoxWrapper>
                                                <Checkbox
                                                    checked={mainTeacher?._id && mainTeacher._id === _id}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onChange={(e) => {
                                                        const value = e.target.checked;

                                                        if (value && _id) {
                                                            formik.setFieldValue('mainTeacher', teacher);
                                                        } else {
                                                            formik.setFieldValue('mainTeacher', null);
                                                        }
                                                    }}
                                                >
                                                    메인강사
                                                </Checkbox>
                                            </CheckBoxWrapper>
                                        }
                                    >
                                        <MultilineSortableItem>
                                            <InputWrapper>
                                                <Input
                                                    placeholder="강사명"
                                                    name={`teachers.${i}.name`}
                                                    value={name}
                                                    onChange={formik.handleChange}
                                                />
                                                <Input
                                                    placeholder="강사이메일"
                                                    name={`teachers.${i}.email`}
                                                    value={email}
                                                    onChange={formik.handleChange}
                                                />
                                                <Input
                                                    placeholder="강사모바일"
                                                    name={`teachers.${i}.mobile`}
                                                    value={mobile}
                                                    onChange={formik.handleChange}
                                                />
                                            </InputWrapper>
                                            <InputWrapper>
                                                <SelectBox
                                                    allowClear
                                                    placeholder="운영여부"
                                                    name={`teachers.${i}.active`}
                                                    onChange={formik.setFieldValue}
                                                    value={active}
                                                    options={[
                                                        {
                                                            key: true,
                                                            label: '운영',
                                                        },
                                                        {
                                                            key: false,
                                                            label: '미운영',
                                                        },
                                                    ]}
                                                />
                                                <Input
                                                    placeholder="특이사항"
                                                    name={`teachers.${i}.details`}
                                                    value={details}
                                                    onChange={formik.handleChange}
                                                />
                                            </InputWrapper>
                                        </MultilineSortableItem>
                                    </CollapsePanel>
                                </StyledCollapse>
                            </SortableItem>
                        );
                    })}
                    <AddButtonWrapper>
                        <CreateButton
                            full
                            onClick={() => {
                                formik.setFieldValue('teachers', [
                                    ...teachers,
                                    {
                                        _id: uniqueId('newTeacher-'),
                                        name: '',
                                        email: '',
                                        mobile: '',
                                        details: '',
                                        active: true,
                                    },
                                ]);
                            }}
                        />
                    </AddButtonWrapper>
                </DraggableFields>
            </FieldSection>
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

export default ModifySupplierForm;
