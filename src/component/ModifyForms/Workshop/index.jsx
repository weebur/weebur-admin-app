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
                return { clientId: '회원은 필수로 입력해야 합니다.' };
            }

            if (values.orders.length === 0) {
                return { orders: '1건 이상의 주문건을 입력해야 합니다.' };
            }

            if (values.orders.some((order) => !order.productId)) {
                return { productId: '상품은 필수로 입력해야 합니다.' };
            }

            if (values.orders.some((order) => !order.supplierId)) {
                return { supplierId: '업체는 필수로 입력해야 합니다.' };
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
    console.log(formik.errors);
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
                        예약신청서 발행
                    </CommonButton>
                    <CommonButton
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenEstimate(true);
                        }}
                    >
                        견적서 발행
                    </CommonButton>
                    <CommonButton
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenReceipt(true);
                        }}
                    >
                        거래명세서 발행
                    </CommonButton>
                    {onRemove && (
                        <CommonButton
                            light
                            onClick={(e) => {
                                e.preventDefault();
                                Modal.confirm({
                                    centered: true,
                                    content: '주문목록과 워크샵이 전부 삭제됩니다. 삭제하시겠습니까?',
                                    okText: '삭제',
                                    cancelText: '취소',
                                    onOk: onRemove,
                                });
                            }}
                        >
                            삭제하기
                        </CommonButton>
                    )}

                    <SubmitButton disabled={!formik.dirty || !isEmpty(formik.errors)} primary text={'저장'} />
                </SubmitButtonWrapper>
            </FormContainer>

            <BasicModal isOpen={!!openApplication} onClose={() => setOpenApplication(false)}>
                <Application workshop={formik.values} />
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
