import { useForm } from 'react-hook-form';
import Input from '../Form/Input';
import SubmitButton from '../Form/SubmitButton';

import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const InputWrapper = styled.div`
    display: flex;
    gap: 10px;
`;

function AdminsSearchForm({ onSubmit }) {
    const { register, handleSubmit } = useForm();

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputWrapper>
                <Input label="이름" {...register('name')} />
                <Input label="이메일" {...register('email')} />
            </InputWrapper>

            <InputWrapper>
                <SubmitButton text="검색" />
            </InputWrapper>
        </Form>
    );
}

export default AdminsSearchForm;
