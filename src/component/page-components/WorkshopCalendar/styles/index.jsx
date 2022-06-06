import styled from 'styled-components';

export const CurrentDate = styled.div`
    font-size: ${({ theme }) => theme.fontSize.xxLarge};
    font-weight: 500;
    margin-bottom: 20px;
    @media only screen and (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSize.xLarge};
    }
`;

export const Centered = styled.div`
    width: 100%;
    text-align: center;
`;
