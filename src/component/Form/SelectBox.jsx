import { Select } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import Label from './Label';

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledSelect = styled(Select)`
    & > .ant-select-selector {
        display: flex;
        align-items: center;
        padding: 9px 5px 10px 10px;

        position: relative;
        width: 210px;
        height: 44px;

        font-size: ${({ theme }) => theme.fontSize.large};
        border-radius: 3px;
        border: solid 1px
            ${({ focused, theme }) =>
                focused ? theme.color.primary : theme.color.light};
    }

    .ant-select-selection-item {
        padding: 9px 5px 10px 10px;
    }
`;

function SelectBox({ options, label, onChange, ...props }) {
    const [focused, setFocused] = useState(false);

    console.log(focused);
    return (
        <InputWrapper>
            <Label focused={focused}>{label}</Label>
            <StyledSelect
                className="ant-select-customize-input"
                onFocus={() => {
                    setFocused(true);
                }}
                onBlurCapture={() => {
                    setFocused(false);
                }}
                onChange={(v) => {
                    onChange(props.name, v);
                }}
                {...props}
            >
                {options.map(({ key, label }) => (
                    <StyledSelect.Option
                        className="dkdkdk"
                        key={key}
                        value={key}
                    >
                        {label}
                    </StyledSelect.Option>
                ))}
            </StyledSelect>
        </InputWrapper>
    );
}

export default SelectBox;
