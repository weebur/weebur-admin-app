import React from 'react';
import { Typography } from 'antd';
import AsyncSelectBox from '../../Form/AsyncSelectBox';
import { fetchClients } from '../../../api/ClientAPI';
import TextInput from '../../Form/Input';
import DatePicker from '../../Form/DatePicker';
import TextArea from '../../Form/TextArea';
import { ClientSelectBox, Fields, FieldSection, SubTitle } from './styles';

function ClientInfo({ onValueChange, values, onChange }) {
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

    return (
        <>
            <SubTitle>
                <Typography.Title level={5}>회원 정보</Typography.Title>
                <ClientSelectBox>
                    <AsyncSelectBox
                        placeholder="회원명을 입력해주세요"
                        name={'clientId'}
                        onChange={(name, v, option) => {
                            const value = option.data;
                            onValueChange('clientId', value.clientId);
                            onValueChange('clientName', value.clientName);
                            onValueChange('clientEmail', value.clientEmail);
                            onValueChange('clientMobile', value.clientMobile);
                            onValueChange('companyId', value.companyId);
                            onValueChange('companyName', value.companyName);
                        }}
                        value={values.clientId}
                        fetchOptions={fetchClientOptions}
                        initialOptions={[
                            {
                                key: values.clientId,
                                value: values.clientId,
                                label: `${values.clientName}(${values.companyName})`,
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
                </ClientSelectBox>
            </SubTitle>

            <FieldSection>
                <Fields>
                    <TextInput disabled name="companyName" label="회사명" value={values.companyName} />
                    <DatePicker label="문의일" name="createdAt" value={values.createdAt} />
                    <TextInput disabled label="모바일" name="clientMobile" value={values.clientMobile} />
                    <TextInput disabled label="이메일" name="clientEmail" value={values.clientEmail} />
                    <TextInput disabled label="담당자" name="adminName" value={values.adminName} />
                </Fields>
                <Fields>
                    <TextArea label="요청사항" name="requirements" value={values.requirements} onChange={onChange} />
                </Fields>
            </FieldSection>
        </>
    );
}

export default ClientInfo;
