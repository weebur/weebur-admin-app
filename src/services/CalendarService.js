import theme from '../theme';
import { reservationStatus } from '../constants/order';

export const mapStatusToBadgeColor = {
    [reservationStatus.REQUIRED.key]: theme.color.calendar.basic,
    [reservationStatus.CONFIRM_SCHEDULE.key]: theme.color.calendar.checking,
    [reservationStatus.DELIVERED_SCHEDULE.key]: theme.color.calendar.confirm,
    [reservationStatus.CONFIRM_RESERVATION.key]: theme.color.calendar.complete,
    [reservationStatus.FINAL_CHANGE.key]: theme.color.calendar.complete,
    [reservationStatus.FINAL_COMPLETE.key]: theme.color.calendar.complete,
    [reservationStatus.CANCEL_RESERVATION.key]: theme.color.calendar.cancel,
    [reservationStatus.UNKNOWN.key]: theme.color.calendar.basic,
};
