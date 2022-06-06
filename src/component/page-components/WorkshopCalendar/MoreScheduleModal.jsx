import React from 'react';
import BasicModal from '../../Modal';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { mapStatusToBadgeColor } from '../../../services/CalendarService';
import { Col, Row } from 'antd';
import Ellipsis from '../../Text/Ellipsis';
import { productTypes } from '../../../constants/product';
import weekday from 'dayjs/plugin/weekday';
import { dayLabels } from '../../../constants/date';
import { Centered, CurrentDate } from './styles';

dayjs.extend(weekday);

const ScheduleSummary = styled.div`
    display: flex;
    width: 100%;

    ${({ status }) =>
        status &&
        `
        color: ${mapStatusToBadgeColor[status]};
    `}
    margin-bottom: 7px;
    &:hover {
        background-color: ${({ theme }) => theme.color.background};
    }
    cursor: pointer;

    @media only screen and (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSize.normal};
    }
`;

const Column = styled(Col)`
    ${({ onlyDesktop }) =>
        onlyDesktop &&
        `
      @media only screen and (max-width: 768px) {
        display: none;
    }
  `}
    ${({ onlyMobile }) =>
        onlyMobile &&
        `
        display: none;

        @media only screen and (max-width: 768px) {
            display: flex;
            justify-content: flex-start;
        }
  `}
`;

function MoreScheduleModal({ isOpen, onClose, currentDate, moreSchedules, onItemClick }) {
    return (
        <BasicModal isOpen={isOpen} onClose={onClose}>
            <CurrentDate>{`${dayjs(currentDate).format('YYYY.MM.DD')} ${
                dayLabels[dayjs(currentDate).day()]
            }`}</CurrentDate>
            {moreSchedules.map((schedule) => {
                return (
                    <ScheduleSummary
                        key={schedule._id}
                        onClick={(e) => {
                            e.stopPropagation();
                            onItemClick(schedule);
                        }}
                        status={schedule.reservationStatus}
                    >
                        <Column onlyMobile span={6}>
                            {dayjs(schedule.reservationDate).format('HH:mm')}
                        </Column>
                        <Column onlyMobile span={16}>
                            {schedule.companyName}
                        </Column>

                        <Column onlyDesktop span={2}>
                            {dayjs(schedule.reservationDate).format('HH:mm')}
                        </Column>
                        <Column onlyDesktop span={5}>
                            <Centered>
                                <Ellipsis>{schedule.companyName}</Ellipsis>
                            </Centered>
                        </Column>
                        <Column onlyDesktop span={1}>
                            <Centered>|</Centered>
                        </Column>
                        <Column onlyDesktop span={6}>
                            <Centered>
                                <Ellipsis>{schedule.productName}</Ellipsis>
                            </Centered>
                        </Column>
                        <Column onlyDesktop span={1}>
                            <Centered>|</Centered>
                        </Column>
                        <Column onlyDesktop span={2}>
                            <Centered>
                                <Ellipsis>{schedule.clientName}</Ellipsis>
                            </Centered>
                        </Column>
                        <Column onlyDesktop span={1}>
                            <Centered>|</Centered>
                        </Column>
                        <Column onlyDesktop span={2}>
                            <Ellipsis>{schedule.adminName}</Ellipsis>
                        </Column>
                        <Column onlyDesktop span={1}>
                            <Centered>|</Centered>
                        </Column>
                        <Column onlyDesktop span={2}>
                            <Ellipsis>{productTypes[schedule.productType].label}</Ellipsis>
                        </Column>
                    </ScheduleSummary>
                );
            })}
        </BasicModal>
    );
}

export default MoreScheduleModal;
