import { useFormik } from 'formik';
import Input from '../Form/Input';
import SubmitButton from '../Form/SubmitButton';

import styled from 'styled-components';
import CommonButton from '../Button';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`;

const InputWrapper = styled.div`
    display: flex;
    gap: 10px;
`;

function AdminsSearchForm({ initialValues = {}, onSubmit, onReset }) {
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
                <Input
                    name="email"
                    label="이메일"
                    onChange={formik.handleChange}
                    value={formik.values.email}
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

export default AdminsSearchForm;
