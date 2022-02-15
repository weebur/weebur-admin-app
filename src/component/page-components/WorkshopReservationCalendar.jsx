import React, { useState } from 'react';
import DayjsCalendar from '../Calendar/DayjsCalendar';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import theme from '../../theme';

const Header = styled.div`
    display: flex;
    background: ${({ theme }) => theme.color.background};
    padding: 20px 0;
`;
const FlexBox = styled.div`
    display: flex;

    ${({ gap }) =>
        gap &&
        `
    gap: ${gap}px;
  `}
`;
const ArrowWrapper = styled.div`
    & button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
    }
`;
const YearMonthLabel = styled.div`
    flex: 0 0 75px;
    font-size: ${({ theme }) => theme.fontSize.xxLarge};
`;

const TodayButton = styled(Button)`
    height: 36px;
`;

function WorkshopReservationCalendar(props) {
    return (
        <DayjsCalendar
            mode="month"
            headerRender={({ value, onChange }) => {
                const now = dayjs(value);
                const year = value.year();
                const month = value.month();

                const options = [];
                for (let i = year - 10; i < year + 10; i += 1) {
                    options.push({ key: i, value: i });
                }

                return (
                    <Header>
                        <FlexBox gap={20}>
                            <YearMonthLabel>{`${year}.${month + 1}`}</YearMonthLabel>
                            <FlexBox>
                                <ArrowWrapper>
                                    <Button
                                        onClick={() => {
                                            const newNow = now.subtract(1, 'month');
                                            onChange(newNow);
                                        }}
                                    >
                                        <LeftOutlined style={{ fontSize: 16, color: theme.color.light }} />
                                    </Button>
                                </ArrowWrapper>
                                <ArrowWrapper>
                                    <Button
                                        onClick={() => {
                                            const newNow = now.add(1, 'month');
                                            onChange(newNow);
                                        }}
                                    >
                                        <RightOutlined style={{ fontSize: 16, color: theme.color.light }} />
                                    </Button>
                                </ArrowWrapper>
                            </FlexBox>

                            <TodayButton onClick={() => onChange(dayjs())}>오늘</TodayButton>
                        </FlexBox>
                    </Header>
                );
            }}
            onPanelChange={(value, mode) => {
                console.log(value, mode);
            }}
        />
    );
}

export default WorkshopReservationCalendar;
