import React from 'react';
import styled from 'styled-components';
import TextInput from '../component/Form/Input';
import { useFormik } from 'formik';
import SubmitButton from '../component/Form/SubmitButton';
import useAdminsStore from '../stores/admins';
import { Button, message } from 'antd';
import { useRouter } from 'next/router';

const Centered = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 300px;
    padding: 20px;
`;

function Login() {
    const router = useRouter();

    const login = useAdminsStore((state) => state.login);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const { approved } = await login(values);
                if (!approved) {
                    message.warn('관리자의 승인이 필요합니다.');
                } else {
                    router.push('/');
                }
            } catch (e) {
                message.error(e.response?.data?.message || '오류가 발생하였습니다.');
            }
        },
    });

    return (
        <Centered>
            <LoginForm onSubmit={formik.handleSubmit}>
                <TextInput name="email" onChange={formik.handleChange} label="이메일" />

                <TextInput
                    type="password"
                    label="비밀번호"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />

                <SubmitButton primary text="로그인" />

                <Button type="text" onClick={() => router.push('/signup')}>
                    회원가입
                </Button>
            </LoginForm>
        </Centered>
    );
}

export const getServerSideProps = () => {
    return {
        props: { withoutSidebar: true },
    };
};

export default Login;
