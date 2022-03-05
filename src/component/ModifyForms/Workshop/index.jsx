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

const Estimate = dynamic(() => import('../../page-components/Estimate'), { ssr: false });

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0 300px;
`;

const SubmitButtonWrapper = styled.div`
    display: flex;
    gap: 20px;
    //width: 240px;
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
        },
    });
    const [openEstimate, setOpenEstimate] = useState(false);

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

            <BasicModal isOpen={openEstimate} onClose={() => setOpenEstimate(false)}>
                <Estimate />
            </BasicModal>
        </>
    );
}

export default WorkshopForm;
