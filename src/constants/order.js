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
