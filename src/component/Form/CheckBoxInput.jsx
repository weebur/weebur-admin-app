import React from 'react';
import { Checkbox } from 'antd';
import styled from 'styled-components';
import Label from './Label';

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    //min-width: 210px;
    width: 100%;
`;

const CheckBoxWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 44px;
`;

function CheckBoxInput({ label, subLabel, name, onChange, ...props }) {
    return (
        <InputWrapper>
            <Label>{label}</Label>
            <CheckBoxWrapper>
                <Checkbox
                    onChange={(e) => {
                        onChange(name, e.target.checked);
                    }}
                    {...props}
                >
                    {subLabel}
                </Checkbox>
            </CheckBoxWrapper>
        </InputWrapper>
    );
}

export default CheckBoxInput;
