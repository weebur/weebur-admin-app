import { useFormik } from 'formik';
import Input from '../Form/Input';
import SubmitButton from '../Form/SubmitButton';

import styled from 'styled-components';
import CommonButton from '../Button';
import { companyCategories } from '../../constants/company';
import SelectBox from '../Form/SelectBox';
import RangePicker from '../Form/DatePicker/RangePicker';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`;

const InputWrapper = styled.div`
    display: flex;
    gap: 15px;
`;

function CompaniesSearchForm({ initialValues = {}, onSubmit, onReset }) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit,
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <InputWrapper>
                <Input
                    name="name"
                    label="이름"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <SelectBox
                    allowClear
                    name="category"
                    label="분류"
                    onChange={formik.setFieldValue}
                    value={formik.values.category}
                    options={Object.values(companyCategories)}
                />
            </InputWrapper>

            <InputWrapper>
                <RangePicker
                    label="등록일"
                    onChange={formik.setFieldValue}
                    from={formik.values.from}
                    to={formik.values.to}
                />
            </InputWrapper>

            <InputWrapper>
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

export default CompaniesSearchForm;
