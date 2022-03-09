import React, { useEffect, useState } from 'react';
import { FieldSection, PaymentEmailTemplate, TemplateContainer } from './styles';
import { Col, Tabs } from 'antd';
import SelectBox from '../../Form/SelectBox';
import dayjs from 'dayjs';
import { COMMON_FORMAT } from '../../../constants/date';
import ProductService from '../../../services/ProductService';
import TextArea from '../../Form/TextArea';
import TextInput from '../../Form/Input';
import styled from 'styled-components';
import CommonButton from '../../Button';
import useAdminsStore from '../../../stores/admins';

const EmailAccounts = styled.div`
    flex: 0 0 50%;
    display: flex;
    align-items: flex-end;
    gap: 10px;
`;
const { TabPane } = Tabs;
const getLabel = (order) =>
    `${dayjs(order.reservationDate).format(COMMON_FORMAT)} | ${order.productName} | ${order.supplierName}`;

function SendEmailTemplate({ workshop, onSendEmail }) {
    const me = useAdminsStore((state) => state.me);

    const [tab, setTab] = useState('reservation');
    const [reservationEmail, setReservationEmail] = useState('');
    const [emailAccount, setEmailAccount] = useState({ email: me?.email || '', password: '' });
    const [order, setOrder] = useState('');

    const paymentEmail = ProductService.getPaymentEmail({
        clientName: workshop?.clientName,
        adminName: workshop?.adminName,
    });

    const handleEmailAccountChange = (e) => {
        setEmailAccount({
            ...emailAccount,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        setReservationEmail(order ? ProductService.getEmailTextByOrder(workshop, order) : '');
    }, [order]);

    return (
        <>
            <FieldSection>
                <Col flex="50%">
                    <SelectBox
                        label="대상 상품 선택"
                        name={'order'}
                        value={order}
                        onChange={(_, v) => setOrder(v)}
                        options={workshop.orders.map((order) => ({
                            key: order._id,
                            label: getLabel(order),
                            value: order._id,
                        }))}
                    />
                </Col>
                <EmailAccounts>
                    <TextInput
                        disabled
                        name="email"
                        value={emailAccount.email}
                        onChange={handleEmailAccountChange}
                        label="웍스 모바일 이메일"
                    />

                    <TextInput
                        type="password"
                        label="비밀번호"
                        name="password"
                        value={emailAccount.password}
                        onChange={handleEmailAccountChange}
                    />

                    <CommonButton
                        disabled={
                            !emailAccount.email ||
                            !emailAccount.password ||
                            (tab === 'reservation' ? !reservationEmail : !paymentEmail)
                        }
                        inline
                        onClick={(e) => {
                            e.preventDefault();
                            onSendEmail({
                                senderName: workshop.adminName,
                                senderAddress: emailAccount.email,
                                senderPassword: emailAccount.password,
                                receiver: workshop.clientEmail,
                                subject:
                                    tab === 'reservation'
                                        ? '[위버] 예약 신청 안내드립니다.'
                                        : '[위버] 결제 확인 되었습니다.',
                                textBody: tab === 'reservation' ? reservationEmail : '',
                                htmlBody: tab === 'payment' ? paymentEmail : '',
                            });
                        }}
                    >
                        메일발송
                    </CommonButton>
                </EmailAccounts>
            </FieldSection>
            <TemplateContainer>
                <Tabs defaultActiveKey="reservation" type="card" size="large" value={tab} onChange={(v) => setTab(v)}>
                    <TabPane tab="예약안내 메일 발송" key="reservation">
                        <TextArea
                            rows={30}
                            value={reservationEmail}
                            onChange={(e) => {
                                setReservationEmail(e.target.value);
                            }}
                        />
                    </TabPane>
                    <TabPane tab="결제확인 메일 발송" key="payment">
                        <PaymentEmailTemplate dangerouslySetInnerHTML={{ __html: paymentEmail }} />
                    </TabPane>
                </Tabs>
            </TemplateContainer>
        </>
    );
}

export default SendEmailTemplate;
