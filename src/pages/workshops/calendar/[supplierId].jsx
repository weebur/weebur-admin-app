import React, { useEffect } from 'react';
import ContentLayout from '../../../component/Layout/ContentLayout';
import { Typography } from 'antd';
import useWorkshopsStore from '../../../stores/workshop';
import dayjs from 'dayjs';
import WorkshopCalendar from '../../../component/page-components/WorkshopCalendar';
import { useRouter } from 'next/router';
import { fetchSupplier } from '../../../api/SupplierAPI';

function WorkshopCalendarPage({ currentDate, supplierId, supplier }) {
    const router = useRouter();

    const now = dayjs(currentDate);
    const year = now.get('year');
    const month = now.get('month') + 1;

    const fetchOrderSchedules = useWorkshopsStore((state) => state.fetchOrderSchedules);
    const workshopSchedules = useWorkshopsStore((state) => state.workshopSchedules);

    useEffect(() => {
        fetchOrderSchedules({ year, month, supplierId });
    }, [year, month, supplierId]);

    return (
        <ContentLayout>
            <Typography.Title level={4}>
                {supplier?.name || ''} {'워크샵 캘린더'}
            </Typography.Title>
            <WorkshopCalendar
                isPublished
                initialDate={dayjs(currentDate)}
                schedules={workshopSchedules}
                onYearMonthChange={(currentDate) =>
                    router.replace(`/workshops/calendar/${supplierId}?currentDate=${currentDate}`)
                }
            />
        </ContentLayout>
    );
}

export const getServerSideProps = async (ctx) => {
    try {
        const now = dayjs();
        const { currentDate = now.toISOString() } = ctx.query;
        const supplierId = ctx.params.supplierId || '';
        const supplier = await fetchSupplier(supplierId, true);

        return {
            props: {
                supplierId,
                supplier,
                currentDate,
                withoutSidebar: true,
            },
        };
    } catch (e) {
        console.log(e);
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
};

export default WorkshopCalendarPage;
