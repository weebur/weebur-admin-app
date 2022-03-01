import styled from 'styled-components';
import { Collapse } from 'antd';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 30px;
    width: 1000px;
    ${({ full }) =>
        full &&
        `
        width: 100%;
    `}
`;

export const InputWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-end;
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

export const FieldSection = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'row'};
    width: 100%;
    background: #ffffff;
    padding: 33px 42px 44px 38px;
    border-radius: 20px;
    gap: 10px;
    ${({ half }) =>
        half &&
        `
        width: 50%;
    `}
`;

export const TableHead = styled.div`
    padding-left: 30px;
    display: flex;
    gap: 15px;

    label {
        width: 100%;
    }
`;

export const MultilineSortableItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding: 10px;
`;

export const CheckBoxWrapper = styled.div`
    width: 100%;
`;

export const StyledCollapse = styled(Collapse)`
    width: 100%;
    background: ${({ theme }) => theme.color.background};
`;
