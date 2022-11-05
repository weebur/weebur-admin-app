import styled from 'styled-components';

export const FieldSection = styled.div`
    width: 100%;
    display: flex;
    margin-top: 30px;
    align-items: ${({ align }) => align || 'flex-end'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    padding: 33px 42px 44px 38px;
    background: #ffffff;
    gap: 20px;
    border-radius: 20px;
`;

export const TemplateContainer = styled.div`
    display: flex;
    padding: 20px;
    & > div {
        padding: 5px;
        flex: 1 0 50%;
    }
`;

export const PaymentEmailTemplate = styled.div`
    padding: 33px 42px 44px 38px;
    background: #ffffff;
    border-radius: 20px;
`;
