import styled from 'styled-components';

const StyledInput = styled.input`
    display: flex;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;

    color: #ffffff;
    border: none;
    border-radius: 4px;
    background: ${({ theme }) => theme.color.primary};

    padding: 10px 12px;
    height: 40px;
    width: 150px;
    font-size: 15px;

    cursor: pointer;

    :hover {
        background: ${({ theme }) => theme.color.hover};
    }
`;

function SubmitButton({ text = '제출' }) {
    return <StyledInput type="submit" value={text} />;
}

export default SubmitButton;
