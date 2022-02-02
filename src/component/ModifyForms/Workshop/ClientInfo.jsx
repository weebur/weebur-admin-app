import React from 'react';
import { FieldSection } from '../styles';
import { Typography } from 'antd';
import styled from 'styled-components';
import AsyncSelectBox from '../../Form/AsyncSelectBox';
import { fetchClients } from '../../../api/ClientAPI';

const SubTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

function ClientInfo({ onValueChange }) {
    const fetchClientOptions = async (name) => {
        try {
            const clients = await fetchClients({
                page: 0,
                limit: 10,
                name,
            });
            return clients.result.map(({ _id, name, company, mobile, email }) => ({
                label: name,
                value: JSON.stringify({
                    _id,
                    name,
                    company,
                    mobile,
                    email,
                }),
                key: _id,
            }));
        } catch (err) {
            return [];
        }
    };

    return (
        <>
            <SubTitle>
                <Typography.Title level={5}>회원정보</Typography.Title>
                <AsyncSelectBox
                    name={'clientId'}
                    onChange={(name, v) => {
                        const client = JSON.parse(v);
                        onValueChange('clientId', client._id);
                        onValueChange('clientName', client.name);
                        onValueChange('clientEmail', client.email);
                        onValueChange('clientMobile', client.mobile);
                        onValueChange('companyId', client.company._id);
                        onValueChange('companyName', client.company.name);
                    }}
                    fetchOptions={fetchClientOptions}
                    initialOptions={[]}
                />
            </SubTitle>

            <FieldSection></FieldSection>
        </>
    );
}

export default ClientInfo;
