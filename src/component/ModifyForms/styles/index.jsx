import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 30px;
    width: 1000px;
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
    position: sticky;
    bottom: -55px;
    display: flex;
    justify-content: flex-end;
    width: calc(100% + 80px);
    gap: 10px;
    margin: 20px -40px -55px;
    background: #ffffff;
    padding: 20px 40px;
`;

export const AddButtonWrapper = styled.div`
    padding: 10px 0;
`;
