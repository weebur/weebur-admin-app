import DatePicker from '.';
import styled from 'styled-components';
import Label from '../Label';
import { useState } from 'react';
import { Col, Row } from 'antd';

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const IconWrapper = styled(Col)`
    padding-top: 10px;
    width: 15px;
    text-align: center;
`;

function RangePicker({ onChange, from, to, label }) {
    const [focused, setFocused] = useState(false);
    return (
        <InputWrapper>
            <Label focused={focused}>{label}</Label>
            <Row gutter={2}>
                <Col>
                    <DatePicker
                        name="from"
                        onChange={onChange}
                        value={from}
                        onFocus={() => {
                            setFocused(true);
                        }}
                        onBlur={() => {
                            setFocused(false);
                        }}
                    />
                </Col>
                <IconWrapper>~</IconWrapper>
                <Col>
                    <DatePicker
                        name="to"
                        onChange={onChange}
                        value={to}
                        onFocus={() => {
                            setFocused(true);
                        }}
                        onBlur={() => {
                            setFocused(false);
                        }}
                    />
                </Col>
            </Row>
        </InputWrapper>
    );
}

export default RangePicker;
