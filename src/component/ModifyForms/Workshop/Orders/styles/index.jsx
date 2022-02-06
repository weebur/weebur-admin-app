import styled from 'styled-components';

export const PriceRow = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    padding-bottom: 14px;
    ${({ noHandler }) =>
        noHandler &&
        `
        padding-left: 26px;
        padding-right: 26px;
   `}
`;

export const PriceItem = styled.div`
    flex: 1 0 calc(20% - 40px);
`;

export const PriceSection = styled.div``;
