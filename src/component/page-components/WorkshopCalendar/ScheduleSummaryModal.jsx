import React from 'react';
import BasicModal from '../../Modal';
import { CurrentDate } from './styles';
import dayjs from 'dayjs';
import { COMMON_FORMAT, dayLabels } from '../../../constants/date';
import { Col, Row } from 'antd';
import { paymentStatus, reservationStatus } from '../../../constants/order';

import styled from 'styled-components';
import Button from '../../Button';

const Header = styled(Row)`
    font-size: ${({ theme }) => theme.fontSize.small};
    color: ${({ theme }) => theme.color.lightBorder};
`;

const BigRow = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

const ButtonRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

function ScheduleSummaryModal({ isOpen, onClose, currentDate, schedule, onDetailButtonClick, isPublished }) {
    if (!schedule) return null;

    const reservationDate = schedule.reservationDate || null;
    const baseDate = dayjs(reservationDate);
    return (
        <BasicModal isOpen={isOpen} onClose={onClose}>
            <CurrentDate>{`${baseDate.format('YYYY.MM.DD')} ${dayLabels[baseDate.day()]} ${baseDate.format(
                'HH:mm',
            )}`}</CurrentDate>

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
                    <Col span={4}>{baseDate.format(COMMON_FORMAT)}</Col>
                    <Col span={4}>{baseDate.format('HH:mm')}</Col>
                    <Col span={4}>{`${schedule.participants}명`}</Col>
                </Row>
            </BigRow>
            {schedule.subject && (
                <BigRow>
                    <Header>
                        <Col>워크샵 목적</Col>
                    </Header>
                    <Row>
                        <Col>{schedule.subject}</Col>
                    </Row>
                </BigRow>
            )}
            {schedule.participantsInfo && (
                <BigRow>
                    <Header>
                        <Col>참여자 정보</Col>
                    </Header>
                    <Row>
                        <Col>{schedule.participantsInfo}</Col>
                    </Row>
                </BigRow>
            )}
            {schedule.place && (
                <BigRow>
                    <Header>
                        <Col>장소 정보</Col>
                    </Header>
                    <Row>
                        <Col>{schedule.place}</Col>
                    </Row>
                </BigRow>
            )}
            {schedule.onlineInfo.details && (
                <BigRow>
                    <Header>
                        <Col>온라인 정보</Col>
                    </Header>
                    <Row>
                        <Col>{schedule.onlineInfo.details}</Col>
                    </Row>
                </BigRow>
            )}
            {schedule.onlineInfo.fileUrl && (
                <BigRow>
                    <Header>
                        <Col>온라인 화상</Col>
                    </Header>
                    <Row>
                        <Col>{schedule.onlineInfo.fileUrl}</Col>
                    </Row>
                </BigRow>
            )}
            <BigRow>
                <Header>
                    <Col>최종 정산액</Col>
                </Header>
                <Row>
                    <Col>{`${schedule.totalSettlement.toLocaleString()}원`}</Col>
                </Row>
            </BigRow>

            {!isPublished && (
                <ButtonRow>
                    <Button light onClick={() => onDetailButtonClick(schedule)}>
                        상세보기
                    </Button>
                </ButtonRow>
            )}
        </BasicModal>
    );
}

export default ScheduleSummaryModal;
