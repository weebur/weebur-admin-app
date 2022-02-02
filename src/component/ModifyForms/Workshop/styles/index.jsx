import styled from 'styled-components';

export const SubTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const ClientSelectBox = styled.div`
    width: 480px;
`;

export const FieldSection = styled.div`
    width: 100%;
    background: #ffffff;
    padding: 33px 42px 44px 38px;
    border-radius: 20px;
    margin-bottom: 20px;
`;

export const Fields = styled.div`
    display: flex;
    gap: 100px;
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
`;

export const OpenToggleButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSize.large};
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: solid 1px ${({ theme }) => theme.color.light};
    cursor: pointer;
`;
