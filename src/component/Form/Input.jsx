import { forwardRef, useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledLabel = styled.label`
    color: ${({ theme }) => theme.color.light};
    font-size: ${({ theme }) => theme.fontSize.small};

    ${({ focused, theme }) =>
        focused &&
        `
        color: ${theme.color.text}
    `}
`;

const StyledInput = styled.input`
    display: flex;
    align-items: center;
    outline: none;
    box-sizing: border-box;

    color: ${({ theme }) => theme.color.light};
    border: 1px solid ${({ theme }) => theme.color.light};
    border-radius: 4px;

    padding: 10px 12px;
    height: 44px;
    width: 100%;
    min-width: 210px;
    font-size: ${({ theme }) => theme.fontSize.large};

    :focus {
        border: 1px solid ${({ theme }) => theme.color.primary};
        color: ${({ theme }) => theme.color.text};
    }
`;

const Input = forwardRef((props, ref) => {
    const [focused, setFocused] = useState(false);
    const { label, ...rest } = props;

    return (
        <InputWrapper>
            <StyledLabel focused={focused}>{label}</StyledLabel>
            <StyledInput
                ref={ref}
                autoComplete="off"
                onFocus={() => {
                    setFocused(true);
                }}
                onBlurCapture={() => {
                    setFocused(false);
                }}
                {...rest}
            />
        </InputWrapper>
    );
});

Input.displayName = 'StyledInput';
export default Input;
