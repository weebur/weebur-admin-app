import { useFormik } from 'formik';
import Input from '../Form/Input';
import SubmitButton from '../Form/SubmitButton';

import styled from 'styled-components';
import CommonButton from '../Button';
import RangePicker from '../Form/DatePicker/RangePicker';
import AsyncSelectBox from '../Form/AsyncSelectBox';
import { fetchCompanies, fetchCompany } from '../../api/companyAPI';
import { useEffect, useState } from 'react';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
`;

const InputWrapper = styled.div`
    display: flex;
    gap: 15px;

    ${({ centered }) =>
        centered &&
        `
        width: 100%;
        justify-content: center
    `}
`;

function ClientsSearchForm({ initialValues = {}, onSubmit, onReset }) {
    const [companyOptions, setCompanyOptions] = useState([]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
    });

    const fetchOptions = (name) =>
        fetchCompanies({ page: 0, limit: 10, name }).then((companies) => {
            return companies.result.map((company) => ({
                label: company.name,
                value: company._id,
                key: company._id,
            }));
        });

    useEffect(() => {
        if (formik.values.company) {
            fetchCompany(formik.values.company)
                .then((company) =>
                    setCompanyOptions([
                        {
                            label: company.name,
                            value: company._id,
                            key: company._id,
                        },
                    ]),
                )
                .catch(() => setCompanyOptions([]));
        }
    }, []);

    return (
        <Form onSubmit={formik.handleSubmit}>
            <InputWrapper>
                <RangePicker
                    label="등록일"
                    onChange={formik.setFieldValue}
                    from={formik.values.from}
                    to={formik.values.to}
                />
            </InputWrapper>

            <InputWrapper>
                <AsyncSelectBox
                    name="company"
                    label="회사명"
                    onChange={formik.setFieldValue}
                    value={formik.values.company}
                    fetchOptions={fetchOptions}
                    initialOptions={companyOptions}
                />
                <Input
                    name="name"
                    label="회원명"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    autoComplete="new-password"
                />
                <Input
                    name="mobile"
                    label="모바일"
                    onChange={formik.handleChange}
                    value={formik.values.mobile}
                    autoComplete="new-password"
                />
                <Input
                    name="email"
                    label="이메일"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
            </InputWrapper>

            <InputWrapper centered>
                <SubmitButton
                    disabled={!formik.dirty}
                    small
                    primary
                    text="검색"
                />
                <CommonButton small light onClick={onReset}>
                    초기화
                </CommonButton>
            </InputWrapper>
        </Form>
    );
}

export default ClientsSearchForm;
