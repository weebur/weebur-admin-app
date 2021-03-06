import React, { useEffect, useState } from 'react';
import { FieldSection, PaymentEmailTemplate, TemplateContainer } from './styles';
import { Divider, List, Tabs, Descriptions } from 'antd';
import dayjs from 'dayjs';
import ProductService from '../../../services/ProductService';
import TextArea from '../../Form/TextArea';
import TextInput from '../../Form/Input';
import styled from 'styled-components';
import CommonButton from '../../Button';
import useAdminsStore from '../../../stores/admins';
import AttachList from './lib/AttachList';

const EmailAccounts = styled.div`
    flex: 0 0 50%;
    display: flex;
    align-items: flex-end;
    gap: 10px;
`;

const { TabPane } = Tabs;

function SendEmailTemplate({ workshop, onSendEmail }) {
    const me = useAdminsStore((state) => state.me);

    const [tab, setTab] = useState('reservation');
    const [reservationEmail, setReservationEmail] = useState('');
    const [emailAccount, setEmailAccount] = useState({ email: me?.email || '', password: '' });
    const [attachedApplication, setAttachedApplication] = useState([]);
    const [attachedEstimates, setAttachedEstimates] = useState([]);
    const [attachedReceipts, setAttachedReceipts] = useState([]);
    const [isAttachedShipping, setIsAttachedShipping] = useState(false);

    const notAttachedApplication =
        workshop?.applications
            ?.filter((item) => !attachedApplication.find((attach) => attach.key === item.key))
            .sort((a, b) => (dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1)) || [];

    const notAttachedEstimates =
        workshop?.estimates
            ?.filter((item) => !attachedEstimates.find((attach) => attach.key === item.key))
            .sort((a, b) => (dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1)) || [];
    const notAttachedReceipts =
        workshop?.receipts
            ?.filter((item) => !attachedReceipts.find((attach) => attach.key === item.key))
            .sort((a, b) => (dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1)) || [];

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

    console.log(notAttachedEstimates);

    useEffect(() => {
        setReservationEmail(ProductService.getEmailTextByOrder(workshop));
    }, []);

    return (
        <>
            <FieldSection>
                <EmailAccounts>
                    <TextInput
                        disabled
                        name="email"
                        value={emailAccount.email}
                        onChange={handleEmailAccountChange}
                        label="?????? ????????? ?????????"
                    />

                    <TextInput
                        type="password"
                        label="????????????"
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
                                        ? '[??????] ?????? ?????? ??????????????????.'
                                        : '[??????] ?????? ?????? ???????????????.',
                                textBody: tab === 'reservation' ? reservationEmail : '',
                                htmlBody: tab === 'payment' ? paymentEmail : '',
                                fileKeys:
                                    tab === 'reservation'
                                        ? [
                                              ...attachedEstimates,
                                              ...attachedReceipts,
                                              ...attachedApplication,
                                              ...(isAttachedShipping
                                                  ? [{ key: 'shipping/weebur_shippingform.xlsx' }]
                                                  : []),
                                          ].map((attach) => attach.key)
                                        : [],
                            });
                        }}
                    >
                        ????????????
                    </CommonButton>
                </EmailAccounts>
                <Descriptions bordered title="?????? ??????">
                    <Descriptions.Item label="Email">{workshop.clientEmail}</Descriptions.Item>
                </Descriptions>
            </FieldSection>
            <TemplateContainer>
                <div>
                    <Tabs
                        defaultActiveKey="reservation"
                        type="card"
                        size="large"
                        value={tab}
                        onChange={(v) => setTab(v)}
                    >
                        <TabPane tab="???????????? ?????? ??????" key="reservation">
                            <TextArea
                                rows={60}
                                value={reservationEmail}
                                onChange={(e) => {
                                    setReservationEmail(e.target.value);
                                }}
                            />
                        </TabPane>
                        <TabPane tab="???????????? ?????? ??????" key="payment">
                            <PaymentEmailTemplate dangerouslySetInnerHTML={{ __html: paymentEmail }} />
                        </TabPane>
                    </Tabs>
                </div>
                {tab === 'reservation' && (
                    <div>
                        <Divider orientation="left">?????? ??????</Divider>
                        <Tabs defaultActiveKey="applications" type="card" size="large">
                            <TabPane tab="???????????????" key="applications">
                                <Divider orientation="left">????????? ??????</Divider>

                                <AttachList
                                    label={'???????????????'}
                                    dataSource={attachedApplication}
                                    renderActions={(item) => [
                                        <a
                                            key="list-loadmore-more"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setAttachedApplication(
                                                    attachedApplication.filter((attach) => attach.key !== item.key),
                                                );
                                            }}
                                        >
                                            ??????
                                        </a>,
                                    ]}
                                />

                                <Divider orientation="left">????????? ??????</Divider>

                                <AttachList
                                    label={'???????????????'}
                                    dataSource={notAttachedApplication}
                                    renderActions={(item) => [
                                        <a key="list-loadmore-edit" href={item.url}>
                                            ????????????
                                        </a>,
                                        <a
                                            key="list-loadmore-more"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setAttachedApplication([...attachedApplication, item]);
                                            }}
                                        >
                                            ????????????
                                        </a>,
                                    ]}
                                />
                            </TabPane>
                            <TabPane tab="?????????" key="estimates">
                                <Divider orientation="left">????????? ??????</Divider>

                                <AttachList
                                    label={'?????????'}
                                    dataSource={attachedEstimates}
                                    renderActions={(item) => [
                                        <a
                                            key="list-loadmore-more"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setAttachedEstimates(
                                                    attachedEstimates.filter((attach) => attach.key !== item.key),
                                                );
                                            }}
                                        >
                                            ??????
                                        </a>,
                                    ]}
                                />

                                <Divider orientation="left">????????? ??????</Divider>

                                <AttachList
                                    label={'?????????'}
                                    dataSource={notAttachedEstimates}
                                    renderActions={(item) => [
                                        <a key="list-loadmore-edit" href={item.url}>
                                            ????????????
                                        </a>,
                                        <a
                                            key="list-loadmore-more"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setAttachedEstimates([...attachedEstimates, item]);
                                            }}
                                        >
                                            ????????????
                                        </a>,
                                    ]}
                                />
                            </TabPane>
                            <TabPane tab="???????????????" key="receipts">
                                <Divider orientation="left">????????? ??????</Divider>

                                <AttachList
                                    label={'???????????????'}
                                    dataSource={attachedReceipts}
                                    renderActions={(item) => [
                                        <a
                                            key="list-loadmore-more"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setAttachedReceipts(
                                                    attachedReceipts.filter((attach) => attach.key !== item.key),
                                                );
                                            }}
                                        >
                                            ??????
                                        </a>,
                                    ]}
                                />

                                <Divider orientation="left">????????? ??????</Divider>

                                <AttachList
                                    label={'???????????????'}
                                    dataSource={notAttachedReceipts}
                                    renderActions={(item) => [
                                        <a key="list-loadmore-edit" href={item.url}>
                                            ????????????
                                        </a>,
                                        <a
                                            key="list-loadmore-more"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setAttachedReceipts([...attachedReceipts, item]);
                                            }}
                                        >
                                            ????????????
                                        </a>,
                                    ]}
                                />
                            </TabPane>
                            <TabPane tab="????????? ??????" key="shipping">
                                <Divider orientation="left">????????? ??????</Divider>

                                <AttachList
                                    label={'????????? ??????'}
                                    dataSource={
                                        isAttachedShipping ? [{ key: 'shipping/weebur_shippingform.xlsx' }] : []
                                    }
                                    renderActions={() => [
                                        <a
                                            key="list-loadmore-more"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsAttachedShipping(false);
                                            }}
                                        >
                                            ??????
                                        </a>,
                                    ]}
                                />
                                <Divider orientation="left" />
                                <CommonButton onClick={() => setIsAttachedShipping(!isAttachedShipping)}>
                                    ????????????
                                </CommonButton>
                            </TabPane>
                        </Tabs>
                    </div>
                )}
            </TemplateContainer>
        </>
    );
}

export default SendEmailTemplate;
