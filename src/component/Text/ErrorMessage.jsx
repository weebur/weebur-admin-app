import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const Message = styled.div`
    position: absolute;
    font-size: ${({ theme }) => theme.fontSize.small};
`;

function ErrorMessage({ text }) {
    return (
        <Message>
            <Typography.Text type="danger">{text}</Typography.Text>
        </Message>
    );
}

export default ErrorMessage;
