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
                        <Col span={2}>{dayjs(schedule.reservationDate).format('HH:mm')}</Col>
                        <Col span={1}>|</Col>
                        <Col span={9}>
                            <Centered>
                                <Ellipsis>{schedule.productName}</Ellipsis>
                            </Centered>
                        </Col>
                        <Col span={1}>|</Col>
                        <Col span={4}>
                            <Centered>
                                <Ellipsis>{schedule.clientName}</Ellipsis>
                            </Centered>
                        </Col>
                        <Col span={1}>|</Col>
                        <Col span={2}>
                            <Ellipsis>{schedule.adminName}</Ellipsis>
                        </Col>
                        <Col span={1}>|</Col>
                        <Col span={2}>
                            <Ellipsis>{productTypes[schedule.productType].label}</Ellipsis>
                        </Col>
                    </ScheduleSummary>
                );
            })}
        </BasicModal>
    );
}

export default MoreScheduleModal;
