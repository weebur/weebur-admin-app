import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { mapStatusToBadgeColor } from '../../../services/CalendarService';
import { productTypes } from '../../../constants/product';
import Ellipsis from '../../Text/Ellipsis';
import { Col } from 'antd';

const DateCellContent = styled.ul`
    text-align: center;
    overflow: hidden;
`;

const ScheduleSummary = styled.li`
    display: flex;
    flex-direction: column;
    font-size: ${({ theme }) => theme.fontSize.small};
    ${({ status }) =>
        status &&
        `
        color: ${mapStatusToBadgeColor[status]};
    `}
    margin-bottom: 5px;
    &:hover {
        background-color: ${({ theme }) => theme.color.background};
    }
`;
const DateCellRow = styled.div`
    display: flex;
    gap: 3px;
    width: 100%;
`;

const DateCellColumn = styled.div`
    line-height: 1.3;
`;

const More = styled.div`
    text-align: right;
    font-size: ${({ theme }) => theme.fontSize.large};
    font-weight: bold;
`;

function DateCell({ schedules, currentDate, onItemClick, onMoreClick }) {
    const listData = schedules.filter((schedule) => {
        const target = dayjs(schedule.reservationDate);
        return currentDate.get('month') === target.get('month') && currentDate.get('date') === target.get('date');
    });

    const viewData = listData.slice(0, 3);

    return (
        <DateCellContent>
            {viewData.map((item) => (
                <ScheduleSummary
                    key={item._id}
                    onClick={(e) => {
                        e.stopPropagation();
                        onItemClick(item);
                    }}
                    status={item.reservationStatus}
                >
                    <DateCellRow>
                        <DateCellColumn>{dayjs(item.reservationDate).format('HH:mm')}</DateCellColumn>
                        <DateCellColumn>
                            <Ellipsis>{item.productName}</Ellipsis>
                        </DateCellColumn>
                    </DateCellRow>
                    <DateCellRow>
                        <Col flex={'30px'} />
                        <DateCellColumn>
                            <Ellipsis>{item.clientName}</Ellipsis>
                        </DateCellColumn>
                        <DateCellColumn>|</DateCellColumn>
                        <DateCellColumn>
                            <Ellipsis>{item.adminName}</Ellipsis>
                        </DateCellColumn>
                        <DateCellColumn>|</DateCellColumn>
                        <DateCellColumn>
                            <Ellipsis>{productTypes[item.productType].label}</Ellipsis>
                        </DateCellColumn>
                    </DateCellRow>
                </ScheduleSummary>
            ))}
            {listData.length > 2 && (
                <More onClick={() => onMoreClick({ currentDate, listData })}>{`+${listData.length - 2}`}</More>
            )}
        </DateCellContent>
    );
}

export default DateCell;
