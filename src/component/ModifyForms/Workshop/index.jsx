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
import { getTotalsByOrders } from '../../../services/OrderService';
import CommonButton from '../../Button';
import BasicModal from '../../Modal';
import dynamic from 'next/dynamic';

const Estimate = dynamic(() => import('../../page-components/Estimate'), { ssr: false });

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
    display: flex;
    gap: 20px;
    //width: 240px;
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
    const [openEstimate, setOpenEstimate] = useState(false);

    const salesTotal = useMemo(() => getTotalsByOrders(formik.values.orders), [formik.values.orders]);

    useEffect(() => {
        if (me && !formik.values.adminId) {
            formik.setFieldValue('adminId', me._id);
            formik.setFieldValue('adminName', me.name);
        }
    }, [me]);

    return (
        <>
            <FormContainer onSubmit={formik.handleSubmit}>
                <Typography.Title level={4}>워크샵생성</Typography.Title>
                <Tab tabs={tabs} active={active} onChange={setActive} />
                <ClientInfo
                    onChange={formik.handleChange}
                    onValueChange={formik.setFieldValue}
                    values={formik.values}
                />
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
                    values={formik.values}
                    initialValues={formik.initialValues}
                />
                <SubmitButtonWrapper>
                    <CommonButton
                        onClick={() => {
                            setOpenEstimate(true);
                        }}
                    >
                        견적서 발행
                    </CommonButton>
                    <SubmitButton disabled={!formik.dirty} primary text={'저장'} />
                </SubmitButtonWrapper>
            </FormContainer>

            <BasicModal isOpen={openEstimate} onClose={() => setOpenEstimate(false)}>
                <Estimate />
            </BasicModal>
        </>
    );
}

export default WorkshopForm;
