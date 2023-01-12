import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import Label from '../Label';
import { CalendarOutlined } from '@ant-design/icons';

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 210px;
`;

const IconWrapper = styled.div`
    position: relative;
`;

const Icon = styled.span`
    position: absolute;
    right: 10px;
    bottom: 10px;
`;

function ReactDatePicker({ value, onChange, label, ...props }) {
    const handleChange = (v) => {
        onChange(v.toISOString());
    };

    return (
        <InputWrapper>
            <Label>{label}</Label>

            <DatePicker
                showTimeSelect
                selected={value}
                onChange={handleChange}
                dateFormat={'yyyy-MM-dd HH:mm'}
                timeIntervals={5}
                timeFormat="HH:mm"
                {...props}
            />
            <IconWrapper>
                <Icon>
                    <CalendarOutlined />
                </Icon>
            </IconWrapper>
        </InputWrapper>
    );
}

export default ReactDatePicker;
