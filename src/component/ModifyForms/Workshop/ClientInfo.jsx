import React, { useEffect } from 'react';
import { Typography, Col, message } from 'antd';
import AsyncSelectBox from '../../Form/AsyncSelectBox';
import { fetchClient, fetchClients } from '../../../api/ClientAPI';
import TextInput from '../../Form/Input';
import DatePicker from '../../Form/DatePicker';
import TextArea from '../../Form/TextArea';
import { ClientSelectBox, Fields, FieldSection, SubTitle } from './styles';
import useAdminsStore from '../../../stores/admins';
import SelectBox from '../../Form/SelectBox';
import Button from '../../Button';

function ClientInfo({ onValueChange, values, onChange, errors }) {
    const admins = useAdminsStore((state) => state.admins);
    const fetchAdmins = useAdminsStore((state) => state.fetchAdmins);
    const { result = [] } = admins;
    const adminsOptions = [
        ...result.map((admin) => ({
            label: admin.name,
            value: admin._id,
            key: admin._id,
            data: {
                adminId: admin._id,
                adminName: admin.name,
            },
        })),
        {
            label: values.adminName,
            value: values.adminId,
            key: values.adminId,
            data: {
                adminId: values.adminId,
                adminName: values.adminName,
            },
        },
    ];

    const fetchClientOptions = async (name) => {
        try {
            const clients = await fetchClients({
                page: 0,
                limit: 10,
                name,
            });
            return clients.result.map(({ _id, name, company, mobile, email }) => ({
                label: `${name}(${company.name})`,
                value: _id,
                key: _id,
                data: {
                    clientId: _id,
                    clientName: name,
                    clientEmail: email,
                    clientMobile: mobile,
                    companyId: company._id,
                    companyName: company.name,
                },
            }));
        } catch (err) {
            return [];
        }
    };

    const setClientValue = (value) => {
        onValueChange('clientName', value.clientName);
        onValueChange('clientEmail', value.clientEmail);
        onValueChange('clientMobile', value.clientMobile);
        onValueChange('companyId', value.companyId);
        onValueChange('companyName', value.companyName);
        onValueChange('clientId', value.clientId);
    };

    useEffect(() => {
        if (result.length > 0) {
            return;
        }
        fetchAdmins({ page: 1, limit: 100 });
    }, []);

    return (
        <>
            <SubTitle>
                <Typography.Title level={5}>회원 정보</Typography.Title>
                <ClientSelectBox>
                    <Col flex={'0 0 240px'}>
                        {values.clientId && (
                            <Button
                                inline
                                onClick={async () => {
                                    try {
                                        const client = await fetchClient(values.clientId);

                                        setClientValue({
                                            clientName: client.name,
                                            clientEmail: client.email,
                                            clientMobile: client.mobile,
                                            companyId: client.company,
                                            companyName: client.companyName,
                                            clientId: client._id,
                                        });

                                        message.success('고객정보를 갱신하였습니다.');
                                    } catch (e) {
                                        console.log(e);
                                    }
                                }}
                            >
                                고객정보 갱신
                            </Button>
                        )}
                    </Col>
                    <Col flex={1}>
                        <AsyncSelectBox
                            placeholder="회원명을 입력해주세요"
                            name={'clientId'}
                            onChange={(name, v, option) => {
                                const value = option.data;
                                setClientValue(value);
                            }}
                            value={values.clientId}
                            fetchOptions={fetchClientOptions}
                            initialOptions={[
                                {
                                    key: values.clientId,
                                    value: values.clientId,
                                    label: values.clientName ? `${values.clientName}(${values.companyName})` : '',
                                    data: {
                                        clientId: values.clientId,
                                        clientName: values.clientName,
                                        clientEmail: values.clientEmail,
                                        clientMobile: values.clientMobile,
                                        companyId: values.companyId,
                                        companyName: values.companyName,
                                    },
                                },
                            ]}
                        />
                        {errors.clientId && <Typography.Text type="danger">{errors.clientId}</Typography.Text>}
                    </Col>
                </ClientSelectBox>
            </SubTitle>

            <FieldSection>
                <Fields>
                    <TextInput disabled name="companyName" label="회사명" value={values.companyName} />
                    <DatePicker label="문의일" name="createdAt" value={values.createdAt} onChange={onValueChange} />
                    <TextInput disabled label="모바일" name="clientMobile" value={values.clientMobile} />
                    <TextInput disabled label="이메일" name="clientEmail" value={values.clientEmail} />
                    <SelectBox
                        label="담당자"
                        name="adminId"
                        value={values.adminId}
                        options={adminsOptions}
                        onChange={(name, v, option) => {
                            const value = option.data;
                            onValueChange('adminName', value.adminName);
                            onValueChange('adminId', value.adminId);
                        }}
                    />
                </Fields>
                <Fields>
                    <TextArea label="요청사항" name="requirements" value={values.requirements} onChange={onChange} />
                </Fields>
            </FieldSection>
        </>
    );
}

export default ClientInfo;
