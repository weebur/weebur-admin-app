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
        color: ${({ theme }) => theme.color.text};
        border-radius: 3px;
        border: solid 1px ${({ theme }) => theme.color.light};

        .ant-select-selection-search {
            position: absolute !important;
            left: 0 !important;

            display: flex;
            align-items: center;
            padding: 9px 6px 10px 10px;
            ${({ disabled, theme }) =>
                disabled &&
                `
                  background-color: ${theme.color.lightBackground};
              `}
        }

        .ant-select-selection-item {
            padding-left: 5px;
            ${({ disabled, theme }) =>
                disabled &&
                `
                  color: ${theme.color.light};
              `}
        }

        @media only screen and (max-width: 768px) {
            height: 20px;
            font-size: 13px;
        }
    }
`;

function SelectBox({ options, label, onChange, ...props }) {
    return (
        <InputWrapper>
            <Label required={props.required}>{label}</Label>
            <StyledSelect
                className="ant-select-customize-input"
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
