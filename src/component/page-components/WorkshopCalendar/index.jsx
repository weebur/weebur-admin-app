import React, { useEffect, useState } from 'react';
import DayjsCalendar from '../../Calendar/DayjsCalendar';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Badge, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import theme from '../../../theme';
import DateCell from './DateCell';
import { useRouter } from 'next/router';
import MoreScheduleModal from './MoreScheduleModal';
import ScheduleSummaryModal from './ScheduleSummaryModal';
import AsyncSelectBox from '../../Form/AsyncSelectBox';
import SelectBox from '../../Form/SelectBox';
import { reservationStatus } from '../../../constants/order';
import useFetchInitialOptions from '../../../hooks/useFetchInitialOptions';
import { fetchSupplier, fetchSuppliers } from '../../../api/SupplierAPI';

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    background: ${({ theme }) => theme.color.background};
    padding: 20px 0;
`;
const FlexBox = styled.div`
    display: flex;
    align-items: flex-end;
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

const Caption = styled.div`
    ${({ theme, type }) => `
        color: ${theme.color.calendar[type]};
    `}
`;

const SelectWrapper = styled.div`
    width: 200px;
`;

function WorkshopCalendar({ initialDate, schedules, onYearMonthChange, supplierId }) {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [moreSchedules, setMoreSchedules] = useState([]);
    const [currentSchedule, setCurrentSchedule] = useState(schedules);
    const [currentSupplier, setCurrentSupplier] = useState(supplierId);
    const [currentReservationStatus, setCurrentReservationStatus] = useState('ALL');

    const handleItemClick = (item) => {
        setSelectedSchedule(item);
    };

    const handleDetailButtonClick = (item) => {
        router.push(`/workshops/${item.workshopId}`);
    };

    const dateCellRender = (value) => {
        return (
            <DateCell
                schedules={currentSchedule}
                currentDate={value}
                onItemClick={handleItemClick}
                onMoreClick={({ listData }) => {
                    setSelectedDate(value);
                    setMoreSchedules(listData);
                }}
            />
        );
    };

    const fetchOptions = (name) => {
        return fetchSuppliers({ page: 0, limit: 10, name }).then((suppliers) => {
            return suppliers.result.map((supplier) => ({
                label: supplier.name,
                value: supplier._id,
                key: supplier._id,
            }));
        });
    };

    const { options: supplierOptions } = useFetchInitialOptions(fetchSupplier, supplierId);

    useEffect(() => {
        setCurrentSchedule(
            schedules.filter((schedule) => {
                if (currentReservationStatus !== 'ALL' && schedule.reservationStatus !== currentReservationStatus) {
                    return false;
                }
                if (currentSupplier && schedule.supplierId !== currentSupplier) {
                    return false;
                }
                return true;
            }),
        );
    }, [schedules, currentReservationStatus, currentSupplier]);

    return (
        <>
            <DayjsCalendar
                mode="month"
                defaultValue={initialDate}
                dateCellRender={dateCellRender}
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
                                                onYearMonthChange(newNow.toISOString());
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
                                                onYearMonthChange(newNow.toISOString());
                                            }}
                                        >
                                            <RightOutlined style={{ fontSize: 16, color: theme.color.light }} />
                                        </Button>
                                    </ArrowWrapper>
                                </FlexBox>

                                <TodayButton onClick={() => onChange(dayjs())}>오늘</TodayButton>

                                <SelectWrapper>
                                    <AsyncSelectBox
                                        allowClear
                                        label="업체명"
                                        onChange={(_, v) => setCurrentSupplier(v)}
                                        value={currentSupplier}
                                        fetchOptions={fetchOptions}
                                        initialOptions={supplierOptions}
                                    />
                                </SelectWrapper>
                                <SelectWrapper>
                                    <SelectBox
                                        label="예약 상태"
                                        value={currentReservationStatus}
                                        options={[{ key: 'ALL', label: '전체' }, ...Object.values(reservationStatus)]}
                                        onChange={(_, v) => setCurrentReservationStatus(v)}
                                    />
                                </SelectWrapper>
                            </FlexBox>
                            <FlexBox gap={20}>
                                <Caption type={'checking'}>
                                    <Badge color={theme.color.calendar.checking} />
                                    일정확인
                                </Caption>
                                <Caption type={'confirm'}>
                                    <Badge color={theme.color.calendar.confirm} />
                                    신청전달
                                </Caption>
                                <Caption type={'complete'}>
                                    <Badge color={theme.color.calendar.complete} />
                                    예약완료 | 최종변경 | 최종완료
                                </Caption>
                                <Caption type={'cancel'}>
                                    <Badge color={theme.color.calendar.cancel} />
                                    예약취소
                                </Caption>
                                <Caption type={'basic'}>
                                    <Badge color={theme.color.calendar.basic} />
                                    예약접수 | 미정
                                </Caption>
                            </FlexBox>
                        </Header>
                    );
                }}
                onPanelChange={(value, mode) => {}}
            />
            <MoreScheduleModal
                isOpen={!!moreSchedules.length}
                onClose={() => {
                    setSelectedDate(null);
                    setMoreSchedules([]);
                }}
                currentDate={selectedDate}
                moreSchedules={moreSchedules}
                onItemClick={handleItemClick}
            />
            <ScheduleSummaryModal
                isOpen={!!selectedSchedule}
                onClose={() => {
                    setSelectedSchedule(null);
                }}
                schedule={selectedSchedule}
                onDetailButtonClick={handleDetailButtonClick}
            />
        </>
    );
}

export default WorkshopCalendar;
