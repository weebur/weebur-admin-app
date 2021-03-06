import React, { useEffect, useMemo, useState } from 'react';
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
import { Modal } from 'antd';
import { paymentMethods } from '../../../constants/Workshop';
import { isEmpty } from 'lodash-es';
import Application from '../../page-components/Workshops/Estimate/Application';
import Receipt from '../../page-components/Workshops/Estimate/Receipt';
import ErrorMessage from '../../Text/ErrorMessage';

const Estimate = dynamic(() => import('../../page-components/Workshops/Estimate'), { ssr: false });

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0 300px;
`;

const SubmitButtonWrapper = styled.div`
    display: flex;
    gap: 20px;
`;

function WorkshopForm({ initialValues, onSubmit, onDirtyChange, onRemove }) {
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
            paymentMethod: paymentMethods.CREDIT_CARD.key,
            paymentRequirements: '',
            certificatedRegistration: false,
            isCanceled: false,
            orders: [],
        },
        onSubmit: async (values, { resetForm }) => {
            await onSubmit(values);
            resetForm({ values });
        },
        validate: (values) => {
            if (!values.clientId) {
                return { clientId: '????????? ????????? ???????????? ?????????.' };
            }

            if (values.orders.length === 0) {
                return { orders: '1??? ????????? ???????????? ???????????? ?????????.' };
            }

            if (values.orders.some((order) => !order.productId)) {
                return { productId: '????????? ????????? ???????????? ?????????.' };
            }

            if (values.orders.some((order) => !order.supplierId)) {
                return { supplierId: '????????? ????????? ???????????? ?????????.' };
            }
        },
    });
    const [openApplication, setOpenApplication] = useState(false);
    const [openEstimate, setOpenEstimate] = useState(false);
    const [openReceipt, setOpenReceipt] = useState(false);

    const salesTotal = useMemo(() => getTotalsByOrders(formik.values.orders), [formik.values.orders]);

    useEffect(() => {
        onDirtyChange && onDirtyChange(formik.dirty);
    }, [formik.dirty]);

    useEffect(() => {
        if (me && !formik.values.adminId) {
            formik.setFieldValue('adminId', me._id);
            formik.setFieldValue('adminName', me.name);
        }
    }, [me]);

    return (
        <>
            <FormContainer onSubmit={formik.handleSubmit}>
                <ClientInfo
                    onChange={formik.handleChange}
                    onValueChange={formik.setFieldValue}
                    values={formik.values}
                    errors={formik.errors}
                />
                <WorkshopInfo onChange={formik.handleChange} values={formik.values} />
                <Payment
                    onChange={formik.handleChange}
                    onValueChange={formik.setFieldValue}
                    values={formik.values}
                    salesTotal={salesTotal}
                    initialValues={formik.initialValues}
                />
                <Orders
                    onChange={formik.handleChange}
                    onValueChange={formik.setFieldValue}
                    values={formik.values}
                    initialValues={formik.initialValues}
                    errors={formik.errors}
                />
                {formik.errors.orders && <ErrorMessage text={formik.errors.orders} />}
                <SubmitButtonWrapper>
                    <CommonButton
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenApplication(true);
                        }}
                    >
                        ??????????????? ??????
                    </CommonButton>
                    <CommonButton
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenEstimate(true);
                        }}
                    >
                        ????????? ??????
                    </CommonButton>
                    <CommonButton
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenReceipt(true);
                        }}
                    >
                        ??????????????? ??????
                    </CommonButton>
                    {onRemove && (
                        <CommonButton
                            light
                            onClick={(e) => {
                                e.preventDefault();
                                Modal.confirm({
                                    centered: true,
                                    content: '??????????????? ???????????? ?????? ???????????????. ?????????????????????????',
                                    okText: '??????',
                                    cancelText: '??????',
                                    onOk: onRemove,
                                });
                            }}
                        >
                            ????????????
                        </CommonButton>
                    )}

                    <SubmitButton disabled={!formik.dirty || !isEmpty(formik.errors)} primary text={'??????'} />
                </SubmitButtonWrapper>
            </FormContainer>

            <BasicModal isOpen={!!openApplication} onClose={() => setOpenApplication(false)}>
                <Application
                    workshop={formik.values}
                    updateWorkshopDocs={(docs) => formik.setFieldValue('application', docs)}
                />
            </BasicModal>
            <BasicModal isOpen={!!openEstimate} onClose={() => setOpenEstimate(false)}>
                <Estimate workshop={formik.values} />
            </BasicModal>
            <BasicModal isOpen={!!openReceipt} onClose={() => setOpenReceipt(false)}>
                <Receipt workshop={formik.values} />
            </BasicModal>
        </>
    );
}

export default WorkshopForm;
