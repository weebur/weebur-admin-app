import React from 'react';
import styled from 'styled-components';
import TextInput from '../component/Form/Input';
import { useFormik } from 'formik';
import SubmitButton from '../component/Form/SubmitButton';
import useAdminsStore from '../stores/admins';
import { Button, message, Typography } from 'antd';
import { useRouter } from 'next/router';

const Centered = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const SignUpForm = styled.form`
    display: flex;
    flex-direction: column;

    justify-content: center;
    gap: 10px;
    width: 500px;
    padding: 20px;
`;

function SignUp() {
    const router = useRouter();

    const signup = useAdminsStore((state) => state.signup);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm: '',
            name: '',
        },
        onSubmit: async (values) => {
            try {
                await signup(values);
                message.success('가입 요청이 완료되었습니다.');
                router.push('/login');
            } catch (e) {
                message.error('알 수 없는 문제가 발생하였습니다.');
            }
        },
        validate: (values) => {
            if (values.password !== values.confirm) {
                return { confirm: '비밀번호가 일치하지 않습니다.' };
            }
        },
    });

    return (
        <Centered>
            <SignUpForm onSubmit={formik.handleSubmit}>
                <TextInput name="email" onChange={formik.handleChange} label="이메일" />

                <TextInput
                    type="password"
                    label="비밀번호"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />

                <div>
                    <TextInput
                        type="password"
                        label="비밀번호 확인"
                        name="confirm"
                        value={formik.values.confirm}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.confirm && <Typography.Text type="danger">{formik.errors.confirm}</Typography.Text>}
                </div>

                <TextInput name="name" onChange={formik.handleChange} label="이름" />

                <SubmitButton primary text="가입하기" />

                <Button type="text" onClick={() => router.push('/login')}>
                    로그인
                </Button>
            </SignUpForm>
        </Centered>
    );
}

export const getServerSideProps = () => {
    return {
        props: { withoutSidebar: true },
    };
};

export default SignUp;
