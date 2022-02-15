import React from 'react';
import ContentLayout from '../../component/Layout/ContentLayout';
import { Typography } from 'antd';
import WorkshopReservationCalendar from '../../component/page-components/WorkshopReservationCalendar';

function WorkshopCalendar(props) {
    return (
        <ContentLayout>
            <Typography.Title level={4}>{'워크샵 캘린더'}</Typography.Title>
            <WorkshopReservationCalendar />
        </ContentLayout>
    );
}

export default WorkshopCalendar;
