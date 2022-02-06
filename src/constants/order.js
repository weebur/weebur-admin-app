import { productDeliveryTypes } from './product';

export const reservationStatus = {
    CONFIRM_SCHEDULE: { key: 'CONFIRM_SCHEDULE', label: '접수' },
    DELIVERED_SCHEDULE: {
        key: 'DELIVERED_SCHEDULE',
        label: '신청전달',
    },
    CONFIRM_RESERVATION: {
        key: 'CONFIRM_RESERVATION',
        label: '예약완료',
    },
    CANCEL_RESERVATION: {
        key: 'CANCEL_RESERVATION',
        label: '예약취소',
    },
    FINAL_CHANGE: { key: 'FINAL_CHANGE', label: '최종변경' },
    FINAL_COMPLETE: { key: 'FINAL_COMPLETE', label: '최종완료' },
};

export const paymentStatus = {
    WAITING: { key: 'WAITING', label: '결제대기' },
    IN_PROGRESS: { key: 'IN_PROGRESS', label: '결제중' },
    COMPLETED: { key: 'COMPLETED', label: '결제완료' },
};

export const EXCURSION_FEE = 0.05;

export const DELIVERY_FEE = {
    [productDeliveryTypes.PERSONAL.key]: 500,
    [productDeliveryTypes.COLLECTIVE.key]: 0.2,
};

export const OPTION_FEE = 0.2;

export const optionFeeTypes = {
    PERCENTAGE: { key: 'PERCENTAGE', label: '비율(%)' },
    FIXED: { key: 'FIXED', label: '고정금액(원)' },
};

export const excursionRegions = [
    { region: '서울/경기1지역/인천', price: 0 },
    { region: '경기2지역/강화도', price: 55000 },
    { region: '충청도/세종', price: 80000 },
    { region: '강원도/대전', price: 110000 },
    { region: '전라/경상북도', price: 160000 },
    { region: '전라/경상남도', price: 220000 },
    { region: '대구/부산/울산/광주', price: 220000 },
    { region: '제주', price: 300000 },
];
