import React from 'react';
import BasicModal from '../../Modal';
import { CurrentDate } from './styles';
import dayjs from 'dayjs';
import { COMMON_FORMAT, dayLabels } from '../../../constants/date';
import { Col, Row } from 'antd';
import { paymentStatus, reservationStatus } from '../../../constants/order';

import styled from 'styled-components';

const Header = styled(Row)`
    font-size: ${({ theme }) => theme.fontSize.small};
    color: ${({ theme }) => theme.color.lightBorder};
`;

const BigRow = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

function ScheduleSummaryModal({ isOpen, onClose, currentDate, schedule, onDetailButtonClick }) {
    if (!schedule) return null;

    const reservationDate = schedule.reservationDate || null;
    return (
        <BasicModal isOpen={isOpen} onClose={onClose}>
            <CurrentDate>{`${dayjs(reservationDate).format('YYYY.MM.DD')} ${
                dayLabels[dayjs(reservationDate).day()]
            }`}</CurrentDate>

            <BigRow>
                <Header>
                    <Col span={4}>문의일</Col>
                    <Col span={4}>예약상태</Col>
                    <Col span={4}>결제상태</Col>
                </Header>
                <Row>
                    <Col span={4}>{dayjs(schedule.createdAt).format(COMMON_FORMAT)}</Col>
                    <Col span={4}>{reservationStatus[schedule.reservationStatus]?.label}</Col>
                    <Col span={4}>{paymentStatus[schedule.paymentStatus]?.label}</Col>
                </Row>
            </BigRow>
            <BigRow>
                <Header>
                    <Col span={4}>회원명</Col>
                    <Col>회사명</Col>
                </Header>
                <Row>
                    <Col span={4}>{schedule.clientName}</Col>
                    <Col>{schedule.companyName}</Col>
                </Row>
            </BigRow>
            <BigRow>
                <Header>
                    <Col span={4}>회원모바일</Col>
                    <Col>회원이메일</Col>
                </Header>
                <Row>
                    <Col span={4}>{schedule.clientMobile}</Col>
                    <Col>{schedule.clientEmail}</Col>
                </Row>
            </BigRow>
            <BigRow>
                <Header>
                    <Col span={8}>상품명</Col>
                    <Col>업체명</Col>
                </Header>
                <Row>
                    <Col span={8}>{schedule.productName}</Col>
                    <Col>{schedule.supplierName}</Col>
                </Row>
            </BigRow>
            <BigRow>
                <Header>
                    <Col span={4}>진행일</Col>
                    <Col span={4}>진행시간</Col>
                    <Col span={4}>진행인원</Col>
                </Header>
                <Row>
                    <Col span={4}>{dayjs(schedule.reservationDate).format(COMMON_FORMAT)}</Col>
                    <Col span={4}>{dayjs(schedule.reservationDate).format('HH:mm')}</Col>
                    <Col span={4}>{`${schedule.participants}명`}</Col>
                </Row>
            </BigRow>
            <BigRow>
                <Header>
                    <Col>워크샵 정보</Col>
                </Header>
                <Row>
                    <Col>{schedule.info}</Col>
                </Row>
            </BigRow>
        </BasicModal>
    );
}

export default ScheduleSummaryModal;
