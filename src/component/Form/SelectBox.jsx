import { Select } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import Label from './Label';

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const StyledSelect = styled(Select)`
    & > .ant-select-selector {
        display: flex;
        align-items: center;
        padding: 9px 5px 10px 10px;

        position: relative;
        width: 100%;
        height: 44px;

        font-size: ${({ theme }) => theme.fontSize.large};
        color: ${({ theme }) => theme.color.light};
        border-radius: 3px;
        border: solid 1px ${({ focused, theme }) => (focused ? theme.color.primary : theme.color.light)};

        .ant-select-selection-search {
            display: flex;
            align-items: center;
            padding: 9px 6px 10px 10px;
        }

        .ant-select-selection-item {
            padding-left: 5px;
        }
    }
`;

function SelectBox({ options, label, onChange, ...props }) {
    const [focused, setFocused] = useState(false);

    return (
        <InputWrapper>
            <Label required={props.required} focused={focused}>
                {label}
            </Label>
            <StyledSelect
                className="ant-select-customize-input"
                onFocus={() => {
                    setFocused(true);
                }}
                onBlurCapture={() => {
                    setFocused(false);
                }}
                onChange={(v) => {
                    onChange(
                        props.name,
                        v,
                        options.find((option) => option.value === v),
                    );
                }}
                {...props}
            >
                {options.map(({ key, value, label }) => (
                    <StyledSelect.Option key={key} value={value || key}>
                        {label}
                    </StyledSelect.Option>
                ))}
            </StyledSelect>
        </InputWrapper>
    );
}

export default SelectBox;
