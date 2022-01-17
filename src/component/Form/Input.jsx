import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import Label from './Label';

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 210px;
    width: 100%;
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
            <Label required={props.required} focused={focused}>
                {label}
            </Label>
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
