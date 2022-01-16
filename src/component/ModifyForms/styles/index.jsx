import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
`;

export const InputWrapper = styled.div`
    display: flex;
    width: 100%;
    gap: 15px;

    ${({ centered }) =>
        centered &&
        `
        justify-content: center;
    `}
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: 10px;
    margin-top: 20px;
`;
