import React, { useEffect, useMemo, useState } from 'react';
import { Typography } from 'antd';
import Tab from '../../Tab';
import styled from 'styled-components';
import { useFormik } from 'formik';
import ClientInfo from './ClientInfo';
import dayjs from 'dayjs';
import useAdminsStore from '../../../stores/admins';
import WorkshopInfo from './WorkshopInfo';
import Payment from './Payment';
import Orders from './Orders';
import SubmitButton from '../../Form/SubmitButton';
import { getTotalPayment } from '../../../services/OrderService';

const tabs = [
    { key: 'workshop', label: '워크샵' },
    { key: 'teacher', label: '강사용' },
    { key: 'user', label: '회원용' },
];

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 300px;
`;

const SubmitButtonWrapper = styled.div`
    width: 240px;
`;

function WorkshopForm({ initialValues, onSubmit }) {
    const me = useAdminsStore((state) => state.me);
    const formik = useFormik({
        initialValues: initialValues || {
            clientId: '',
            clientName: '',
            companyId: '',
            companyName: '',
            clientMobile: '',
            clientEmail: '',
            adminId: '',
            adminName: '',
            createdAt: dayjs().toISOString(),
            requirements: '',
            subject: '',
            participantsInfo: '',
            place: '',
            paymentMethod: '',
            paymentRequirements: '',
            certificatedRegistration: false,
            orders: [],
        },
        onSubmit: async (values, { resetForm }) => {
            await onSubmit(values);
            resetForm({ values });
        },
    });

    const [active, setActive] = useState(tabs[0].key);
    const [salesTotals, setSalesTotals] = useState([]);

    const handleTotalChange = (index, total) => {
        const cloned = [...salesTotals];
        cloned[index] = total;
        setSalesTotals(cloned);
    };

    const salesTotal = useMemo(() => salesTotals.reduce((acc, v) => v + acc, 0), [salesTotals]);
    console.log(salesTotals);
    useEffect(() => {
        if (me && !formik.values.adminId) {
            formik.setFieldValue('adminId', me._id);
            formik.setFieldValue('adminName', me.name);
        }
    }, [me]);

    return (
        <FormContainer onSubmit={formik.handleSubmit}>
            <Typography.Title level={4}>워크샵생성</Typography.Title>
            <Tab tabs={tabs} active={active} onChange={setActive} />
            <ClientInfo onChange={formik.handleChange} onValueChange={formik.setFieldValue} values={formik.values} />
            <WorkshopInfo onChange={formik.handleChange} values={formik.values} />
            <Payment
                onChange={formik.handleChange}
                onValueChange={formik.setFieldValue}
                values={formik.values}
                salesTotal={salesTotal}
            />
            <Orders
                onChange={formik.handleChange}
                onValueChange={formik.setFieldValue}
                onTotalChange={handleTotalChange}
                values={formik.values}
            />
            <SubmitButtonWrapper>
                <SubmitButton disabled={!formik.dirty} primary text={'저장'} />
            </SubmitButtonWrapper>
        </FormContainer>
    );
}

export default WorkshopForm;
