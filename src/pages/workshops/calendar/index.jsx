import React, { useEffect } from 'react';
import ContentLayout from '../../../component/Layout/ContentLayout';
import { message, Typography } from 'antd';
import useWorkshopsStore from '../../../stores/workshop';
import dayjs from 'dayjs';
import WorkshopCalendar from '../../../component/page-components/WorkshopCalendar';
import { useRouter } from 'next/router';
import { withToken } from '../../../services/SsrService';

function WorkshopCalendarPage({ currentDate }) {
    const router = useRouter();

    const now = dayjs(currentDate);
    const year = now.get('year');
    const month = now.get('month') + 1;

    const fetchOrderSchedules = useWorkshopsStore((state) => state.fetchOrderSchedules);
    const workshopSchedules = useWorkshopsStore((state) => state.workshopSchedules);

    useEffect(() => {
        fetchOrderSchedules({ year, month });
    }, [year, month]);

    return (
        <ContentLayout>
            <Typography.Title level={4}>{'워크샵 캘린더'}</Typography.Title>
            <WorkshopCalendar
                initialDate={dayjs(currentDate)}
                schedules={workshopSchedules}
                onYearMonthChange={(currentDate) => router.replace(`/workshops/calendar?currentDate=${currentDate}`)}
            />
        </ContentLayout>
    );
}

export const getServerSideProps = withToken((ctx) => {
    const now = dayjs();
    const { currentDate = now.toISOString() } = ctx.query;

    return {
        props: {
            currentDate,
        },
    };
});

export default WorkshopCalendarPage;
