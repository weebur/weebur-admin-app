import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { mapStatusToBadgeColor } from '../../../services/CalendarService';
import { productTypes } from '../../../constants/product';

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
    ${({ onlyDesktop }) =>
        onlyDesktop &&
        `
      @media only screen and (max-width: 768px) {
        display: none;
    };
  `}

    @media only screen and (max-width: 768px) {
        flex-wrap: wrap;
        font-size: ${({ theme }) => theme.fontSize.xSmall};
    }
`;

const DateCellColumn = styled.div`
    line-height: 1.3;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    min-width: 30px;

    ${({ divider }) =>
        divider &&
        `
        min-width: 0;
  `}
    ${({ maxWidth }) =>
        maxWidth &&
        `
        flex: 1 0 50%;
    max-width: 150px;
  `}

    ${({ onlyDesktop }) =>
        onlyDesktop &&
        `
      @media only screen and (max-width: 768px) {
        display: none;
    }
  `}

    @media only screen and (max-width: 768px;) {
        font-size: ${({ theme }) => theme.fontSize.xSmall};
    }
`;

const ProductName = styled.span`
    @media only screen and (max-width: 768px) {
        display: none;
    }
`;

const More = styled.div`
    text-align: right;
    font-size: ${({ theme }) => theme.fontSize.large};
    font-weight: bold;

    @media only screen and (max-width: 768px) {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #313131;
        color: #fff;
    }
`;

function DateCell({ schedules, currentDate, onItemClick, onMoreClick }) {
    const listData = schedules.filter((schedule) => {
        const target = dayjs(schedule.reservationDate);
        return currentDate.get('month') === target.get('month') && currentDate.get('date') === target.get('date');
    });

    const viewData = listData.slice(0, 3);

    return (
        <DateCellContent>
            {viewData.map(
                (item) =>
                    console.log(item) || (
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
                                    {item.companyName}
                                    <ProductName> | {item.productName}</ProductName>
                                </DateCellColumn>
                            </DateCellRow>
                            <DateCellRow onlyDesktop>
                                <DateCellColumn>{item.clientName}</DateCellColumn>
                                <DateCellColumn divider>|</DateCellColumn>
                                <DateCellColumn>{item.adminName}</DateCellColumn>
                                <DateCellColumn divider>|</DateCellColumn>
                                <DateCellColumn>{productTypes[item.productType].label}</DateCellColumn>
                            </DateCellRow>
                        </ScheduleSummary>
                    ),
            )}
            {listData.length > 2 && (
                <More onClick={() => onMoreClick({ currentDate, listData })}>{`+${listData.length - 2}`}</More>
            )}
        </DateCellContent>
    );
}

export default DateCell;
