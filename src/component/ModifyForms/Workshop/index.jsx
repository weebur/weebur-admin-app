import React, { useState } from 'react';
import { Typography } from 'antd';
import Tab from '../../Tab';
import styled from 'styled-components';
import { useFormik } from 'formik';
import ClientInfo from './ClientInfo';

const tabs = [
    { key: 'workshop', label: '워크샵' },
    { key: 'teacher', label: '강사용' },
    { key: 'user', label: '회원용' },
];

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

function WorkshopForm(props) {
    const formik = useFormik({
        initialValues: {
            clientId: '',
            clientName: '',
            companyId: '',
            companyName: '',
            clientMobile: '',
            clientEmail: '',
            adminId: '',
            adminName: '',
        },
    });

    const [active, setActive] = useState(tabs[0].key);
    console.log(formik.values);
    return (
        <FormContainer>
            <Typography.Title level={4}>워크샵생성</Typography.Title>
            <Tab tabs={tabs} active={active} onChange={setActive} />
            <ClientInfo onValueChange={formik.setFieldValue} />
        </FormContainer>
    );
}

export default WorkshopForm;
