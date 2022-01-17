import React, { useEffect, useState } from 'react';
import { ButtonsWrapper, Form, InputWrapper } from './styles';
import { useFormik } from 'formik';
import Input from '../Form/Input';
import { clientsTypes, clientInflowPath } from '../../constants/client';
import { COMMON_FORMAT } from '../../constants/date';
import SelectBox from '../Form/SelectBox';
import SubmitButton from '../Form/SubmitButton';
import CommonButton from '../Button';
import TextArea from '../Form/TextArea';
import { fetchCompanies, fetchCompany } from '../../api/companyAPI';
import AsyncSelectBox from '../Form/AsyncSelectBox';
import dayjs from 'dayjs';
import useFetchInitialOptions from '../../hooks/useFetchInitialOptions';

function ModifyClientForm({
    initialValues,
    onSubmit,
    onReset,
    submitButtonLabel,
}) {
    const [inflowOptions, setInflowOptions] = useState(clientInflowPath);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit,
    });

    const { options: companyOptions } = useFetchInitialOptions(
        fetchCompany,
        initialValues?.company,
    );

    const fetchOptions = (name) => {
        return fetchCompanies({ page: 0, limit: 10, name }).then(
            (companies) => {
                return companies.result.map((company) => ({
                    label: company.name,
                    value: company._id,
                    key: company._id,
                }));
            },
        );
    };

    return (
        <Form onSubmit={formik.handleSubmit}>
            <InputWrapper>
                <Input
                    required
                    label="회원명"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    autoComplete="new-password"
                />
                <AsyncSelectBox
                    required
                    name="company"
                    label="회사명"
                    onChange={formik.setFieldValue}
                    value={formik.values.company}
                    fetchOptions={fetchOptions}
                    initialOptions={companyOptions}
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
                <Input
                    name="mobile"
                    label="모바일"
                    onChange={formik.handleChange}
                    value={formik.values.mobile}
                    autoComplete="new-password"
                />
                <Input
                    name="phoneNumber"
                    label="전화번호"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                    autoComplete="new-password"
                />
                <Input
                    name="email"
                    label="이메일"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
            </InputWrapper>
            <InputWrapper>
                <SelectBox
                    allowClear
                    required
                    name="type"
                    label="분류"
                    onChange={formik.setFieldValue}
                    value={formik.values.type}
                    options={Object.values(clientsTypes)}
                />
                <SelectBox
                    allowClear
                    showSearch
                    name="inflowPath"
                    label="유입경로"
                    onChange={formik.setFieldValue}
                    value={formik.values.inflowPath}
                    options={inflowOptions}
                    onSearch={(v) => {
                        if (!v) {
                            setInflowOptions(clientInflowPath);
                            return;
                        }
                        setInflowOptions([{ key: v, label: v }]);
                    }}
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
                    onClick={(e) => {
                        e.preventDefault();
                        formik.resetForm({
                            ...initialValues,
                        });
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

export default ModifyClientForm;
