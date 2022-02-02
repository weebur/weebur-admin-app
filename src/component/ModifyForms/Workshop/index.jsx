import React, { useState } from 'react';
import { Typography } from 'antd';
import Tab from '../../Tab';
import styled from 'styled-components';
import { useFormik } from 'formik';
import ClientInfo from './ClientInfo';
import dayjs from 'dayjs';
import useAdminsStore from '../../../stores/admins';
import WorkshopInfo from './WorkshopInfo';
import Payment from './Payment';

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
    const me = useAdminsStore((state) => state.me);
    const formik = useFormik({
        initialValues: {
            clientId: '',
            clientName: '',
            companyId: '',
            companyName: '',
            clientMobile: '',
            clientEmail: '',
            adminId: me?._id || '',
            adminName: me?.name || '',
            createdAt: dayjs().toISOString(),
            requirements: '',
            subject: '',
            participantsInfo: '',
            place: '',
            paymentMethod: '',
            paymentRequirements: '',
            certificatedRegistration: false,
        },
    });

    const [active, setActive] = useState(tabs[0].key);
    console.log(formik.values);
    return (
        <FormContainer>
            <Typography.Title level={4}>워크샵생성</Typography.Title>
            <Tab tabs={tabs} active={active} onChange={setActive} />
            <ClientInfo onChange={formik.handleChange} onValueChange={formik.setFieldValue} values={formik.values} />
            <WorkshopInfo onChange={formik.handleChange} values={formik.values} />
            <Payment onChange={formik.handleChange} onValueChange={formik.setFieldValue} values={formik.values} />
        </FormContainer>
    );
}

export default WorkshopForm;
