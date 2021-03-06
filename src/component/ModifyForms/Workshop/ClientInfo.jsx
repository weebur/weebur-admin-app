import React, { useEffect } from 'react';
import { Typography } from 'antd';
import AsyncSelectBox from '../../Form/AsyncSelectBox';
import { fetchClients } from '../../../api/ClientAPI';
import TextInput from '../../Form/Input';
import DatePicker from '../../Form/DatePicker';
import TextArea from '../../Form/TextArea';
import { ClientSelectBox, Fields, FieldSection, SubTitle } from './styles';
import useAdminsStore from '../../../stores/admins';
import SelectBox from '../../Form/SelectBox';

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

    useEffect(() => {
        if (result.length > 0) {
            return;
        }
        fetchAdmins({ page: 1, limit: 100 });
    }, []);

    return (
        <>
            <SubTitle>
                <Typography.Title level={5}>?????? ??????</Typography.Title>
                <ClientSelectBox>
                    <AsyncSelectBox
                        placeholder="???????????? ??????????????????"
                        name={'clientId'}
                        onChange={(name, v, option) => {
                            const value = option.data;
                            onValueChange('clientName', value.clientName);
                            onValueChange('clientEmail', value.clientEmail);
                            onValueChange('clientMobile', value.clientMobile);
                            onValueChange('companyId', value.companyId);
                            onValueChange('companyName', value.companyName);
                            onValueChange('clientId', value.clientId);
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
                </ClientSelectBox>
            </SubTitle>

            <FieldSection>
                <Fields>
                    <TextInput disabled name="companyName" label="?????????" value={values.companyName} />
                    <DatePicker label="?????????" name="createdAt" value={values.createdAt} onChange={onValueChange} />
                    <TextInput disabled label="?????????" name="clientMobile" value={values.clientMobile} />
                    <TextInput disabled label="?????????" name="clientEmail" value={values.clientEmail} />
                    <SelectBox
                        label="?????????"
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
                    <TextArea label="????????????" name="requirements" value={values.requirements} onChange={onChange} />
                </Fields>
            </FieldSection>
        </>
    );
}

export default ClientInfo;
