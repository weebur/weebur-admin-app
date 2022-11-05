import TextInput from '../../../Form/Input';
import CommonButton from '../../../Button';
import useAdminsStore from '../../../../stores/admins';
import { sendMessage } from '../../../../api/MessageApi';
import { Descriptions, message, Modal, Typography } from 'antd';
import { useState } from 'react';
import TextArea from '../../../Form/TextArea';
import styled from 'styled-components';
import Button from '../../../Button';
import ModifyClientForm from '../../../ModifyForms/Client';
import BasicModal from '../../../Modal';
import useClientStore from '../../../../stores/clients';

function SendMessageTemplate({ clientId, ...props }) {
    const adminMobile = useAdminsStore((state) => state.me.mobile);
    const client = useClientStore((state) => state.client);
    const fetchClient = useClientStore((state) => state.fetchClient);
    const resetClient = useClientStore((state) => state.resetClient);
    const updateClient = useClientStore((state) => state.updateClient);

    const [clientMobile, setClientMobile] = useState(props.clientMobile);
    const [content, setContent] = useState('[위버] 예약신청서를 메일로 보내드렸습니다. 감사합니다. :)');

    const byteSize = new Blob([content]).size;
    const invalid = byteSize > 80;

    const handleClientClick = async () => {
        try {
            await fetchClient(clientId);
        } catch (e) {
            message.error('회원 정보를 불러올 수 없습니다.');
        }
    };

    const handleClientSubmit = async (values) => {
        try {
            await updateClient(client._id, values);

            setClientMobile(values.mobile);
            resetClient();
            message.success('저장을 완료하였습니다.');
        } catch (e) {
            console.log(e);
            message.error('저장에 실패하였습니다.');
        }
    };

    return (
        <>
            <Descriptions size={'small'} bordered title="문자 발송" column={1}>
                <Descriptions.Item labelStyle={{ width: 150 }} label={'담당 어드민 모바일'}>
                    <TextInput disabled name="adminMobile" value={adminMobile} label="어드민 모바일" />
                </Descriptions.Item>
                <Descriptions.Item label="받는 사람" labelStyle={{ width: 150 }}>
                    <ClientMobile>
                        <TextInput disabled name="clientMobile" value={clientMobile} label="고객 모바일" />
                        <Button light xSmall inline onClick={handleClientClick}>
                            고객정보 수정
                        </Button>
                    </ClientMobile>
                </Descriptions.Item>

                <Descriptions.Item
                    label="문자내용"
                    labelStyle={{ width: 150 }}
                    contentStyle={{ paddingBottom: 36, position: 'relative' }}
                >
                    <TextArea
                        name="smsContent"
                        value={content}
                        label={`문자내용(${byteSize}byte/80byte)`}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    />
                    {invalid && (
                        <ErrorMessage>
                            <Typography.Text type="danger">
                                SMS 문자를 초과하였습니다. LMS로 전송됩니다.
                            </Typography.Text>
                        </ErrorMessage>
                    )}
                </Descriptions.Item>
            </Descriptions>

            <CommonButton
                xSmallr
                inline
                onClick={() => {
                    Modal.confirm({
                        content: '문자를 발송하시겠습니까?',
                        onOk: async () => {
                            try {
                                await sendMessage({
                                    to: clientMobile,
                                    content,
                                    cc: adminMobile,
                                });
                                message.success('문자 발송을 성공하였습니다.');
                            } catch (e) {
                                message.error('문자 발송을 실패하였습니다.');
                            }
                        },
                    });
                }}
            >
                문자발송
            </CommonButton>

            <BasicModal
                title={'회원 수정'}
                isOpen={!!client}
                onClose={() => {
                    resetClient();
                }}
            >
                <ModifyClientForm submitButtonLabel={'수정하기'} initialValues={client} onSubmit={handleClientSubmit} />
            </BasicModal>
        </>
    );
}

const ClientMobile = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 4px;
`;

const ErrorMessage = styled.div`
    position: absolute;
    left: 16px;
    bottom: 8px;
`;

export default SendMessageTemplate;
