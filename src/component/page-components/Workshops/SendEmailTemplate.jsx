import React, { useEffect, useState } from 'react';
import { FieldSection, PaymentEmailTemplate, TemplateContainer } from './styles';
import { Divider, Tabs, Descriptions } from 'antd';
import dayjs from 'dayjs';
import ProductService from '../../../services/ProductService';
import TextArea from '../../Form/TextArea';
import TextInput from '../../Form/Input';
import styled from 'styled-components';
import CommonButton from '../../Button';
import useAdminsStore from '../../../stores/admins';
import AttachList from './lib/AttachList';
import SendMessageTemplate from './lib/SendMessageTemplate';

const AdminAccount = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 4px;
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

    useEffect(() => {
        setReservationEmail(ProductService.getEmailTextByOrder(workshop));
    }, []);

    return (
        <>
            <FieldSection align={'stretch'}>
                <AdminAccount>
                    <Descriptions size={'small'} bordered title="메일 발송" column={1}>
                        <Descriptions.Item label={'보내는 사람'}>
                            <Descriptions.Item>
                                <TextInput
                                    disabled
                                    name="email"
                                    value={emailAccount.email}
                                    onChange={handleEmailAccountChange}
                                    label="웍스 모바일 이메일"
                                />
                            </Descriptions.Item>
                            <Descriptions.Item>
                                <TextInput
                                    type="password"
                                    label="웍스 모바일 비밀번호"
                                    name="password"
                                    value={emailAccount.password}
                                    onChange={handleEmailAccountChange}
                                />
                            </Descriptions.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label={'받는 사람'}>
                            <TextInput disabled name="clientEmail" value={workshop.clientEmail} label="고객 이메일" />
                        </Descriptions.Item>
                    </Descriptions>

                    <CommonButton
                        xSmall
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
                        메일발송
                    </CommonButton>
                </AdminAccount>
                <AdminAccount>
                    <SendMessageTemplate clientMobile={workshop.clientMobile} />
                </AdminAccount>
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
                        <TabPane tab="예약안내 메일 발송" key="reservation">
                            <TextArea
                                rows={60}
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
                </div>
                {tab === 'reservation' && (
                    <div>
                        <Divider orientation="left">파일 첨부</Divider>
                        <Tabs defaultActiveKey="applications" type="card" size="large">
                            <TabPane tab="예약신청서" key="applications">
                                <Divider orientation="left">첨부된 파일</Divider>

                                <AttachList
                                    label={'예약신청서'}
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
                                            삭제
                                        </a>,
                                    ]}
                                />

                                <Divider orientation="left">저장된 문서</Divider>

                                <AttachList
                                    label={'예약신청서'}
                                    dataSource={notAttachedApplication}
                                    renderActions={(item) => [
                                        <a key="list-loadmore-edit" href={item.url}>
                                            다운로드
                                        </a>,
                                        <a
                                            key="list-loadmore-more"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setAttachedApplication([...attachedApplication, item]);
                                            }}
                                        >
                                            첨부하기
                                        </a>,
                                    ]}
                                />
                            </TabPane>
                            <TabPane tab="견적서" key="estimates">
                                <Divider orientation="left">첨부된 파일</Divider>

                                <AttachList
                                    label={'견적서'}
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
                                            삭제
                                        </a>,
                                    ]}
                                />

                                <Divider orientation="left">저장된 문서</Divider>

                                <AttachList
                                    label={'견적서'}
                                    dataSource={notAttachedEstimates}
                                    renderActions={(item) => [
                                        <a key="list-loadmore-edit" href={item.url}>
                                            다운로드
                                        </a>,
                                        <a
                                            key="list-loadmore-more"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setAttachedEstimates([...attachedEstimates, item]);
                                            }}
                                        >
                                            첨부하기
                                        </a>,
                                    ]}
                                />
                            </TabPane>
                            <TabPane tab="거래명세서" key="receipts">
                                <Divider orientation="left">첨부된 파일</Divider>

                                <AttachList
                                    label={'거래명세서'}
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
                                            삭제
                                        </a>,
                                    ]}
                                />

                                <Divider orientation="left">저장된 문서</Divider>

                                <AttachList
                                    label={'거래명세서'}
                                    dataSource={notAttachedReceipts}
                                    renderActions={(item) => [
                                        <a key="list-loadmore-edit" href={item.url}>
                                            다운로드
                                        </a>,
                                        <a
                                            key="list-loadmore-more"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setAttachedReceipts([...attachedReceipts, item]);
                                            }}
                                        >
                                            첨부하기
                                        </a>,
                                    ]}
                                />
                            </TabPane>
                            <TabPane tab="배송지 양식" key="shipping">
                                <Divider orientation="left">첨부된 파일</Divider>

                                <AttachList
                                    label={'배송지 양식'}
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
                                            삭제
                                        </a>,
                                    ]}
                                />
                                <Divider orientation="left" />
                                <CommonButton onClick={() => setIsAttachedShipping(!isAttachedShipping)}>
                                    첨부하기
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
