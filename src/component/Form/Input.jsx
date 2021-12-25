import { forwardRef, useState } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label``;

const StyledInput = styled.input``;

const Input = forwardRef((props, ref) => {
    const [focused, setFocused] = useState(false);
    const { label, ...rest } = props;
    return (
        <div>
            <StyledLabel focused={focused}>{label}</StyledLabel>
            <StyledInput
                ref={ref}
                onFocus={(e) => {
                    setFocused(true);
                    rest.onFocus(e);
                }}
                onBlur={(e) => {
                    setFocused(false);
                    rest.onBlur(e);
                }}
                {...rest}
            />
        </div>
    );
});

Input.displayName = 'StyledInput';
export default Input;
