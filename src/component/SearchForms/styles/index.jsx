import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
`;

export const InputWrapper = styled.div`
    display: flex;
    gap: 15px;
    width: 100%;

    ${({ centered }) =>
        centered &&
        `
        width: 100%;
        justify-content: center
    `}
`;
