import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import Label from './Label';

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 210px;
    width: 100%;
`;

const StyledTextArea = styled(Input.TextArea)`
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

function TextArea({ label, ...props }) {
    const [focused, setFocused] = useState(false);

    return (
        <InputWrapper>
            <Label focused={focused}>{label}</Label>
            <StyledTextArea
                onFocus={() => {
                    setFocused(true);
                }}
                onBlurCapture={() => {
                    setFocused(false);
                }}
                {...props}
            />
        </InputWrapper>
    );
}

export default TextArea;
