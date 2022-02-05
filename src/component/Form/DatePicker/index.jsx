import dynamic from 'next/dynamic';
import styled from 'styled-components';
import dayjs from 'dayjs';
import Label from '../Label';
import { useState } from 'react';
import { COMMON_FORMAT } from '../../../constants/date';

const DayjsPicker = dynamic(() => import('./DayjsPicker'), { ssr: false });

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 210px;
`;

const StyledDatePicker = styled(DayjsPicker)`
    display: flex;
    align-items: center;
    outline: none;

    color: ${({ theme }) => theme.color.light};
    border: 1px solid ${({ theme }) => theme.color.light};
    border-radius: 4px;
    padding: 10px 12px;
    height: 44px;
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.large} !important;

    :focus {
        border: 1px solid ${({ theme }) => theme.color.primary};
        color: ${({ theme }) => theme.color.text};
    }
`;

function DatePicker({ label, value, name, onChange, ...props }) {
    const [focused, setFocused] = useState(false);

    return (
        <InputWrapper>
            <Label focused={focused}>{label}</Label>
            <StyledDatePicker
                name={name}
                format={COMMON_FORMAT}
                picker="date"
                placeholder="날짜를 선택해주세요"
                value={value ? dayjs(value) : null}
                onChange={(date) => {
                    onChange(name, date?.toISOString() || null);
                }}
                onFocus={() => {
                    setFocused(true);
                }}
                onBlur={() => {
                    setFocused(false);
                }}
                {...props}
            />
        </InputWrapper>
    );
}

export default DatePicker;
