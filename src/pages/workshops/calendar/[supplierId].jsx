import React, { useEffect } from 'react';
import ContentLayout from '../../../component/Layout/ContentLayout';
import useWorkshopsStore from '../../../stores/workshop';
import dayjs from 'dayjs';
import WorkshopCalendar from '../../../component/page-components/WorkshopCalendar';
import { useRouter } from 'next/router';
import { fetchSupplier } from '../../../api/SupplierAPI';
import styled from 'styled-components';
import Head from 'next/head';

const Title = styled.span`
    font-size: 20px;
    font-weight: 600;
    @media only screen and (max-width: 768px) {
        font-size: 16px;
        margin-bottom: 0px;
    }
`;

function WorkshopCalendarPage({ currentDate, supplierId, supplier }) {
    const router = useRouter();

    const now = dayjs(currentDate);
    const year = now.get('year');
    const month = now.get('month') + 1;

    const fetchOrderSchedules = useWorkshopsStore((state) => state.fetchOrderSchedules);
    const workshopSchedules = useWorkshopsStore((state) => state.workshopSchedules);

    const supplierName = supplier?.name || '';
    const title = `${supplierName} 워크샵 캘린더`;

    useEffect(() => {
        fetchOrderSchedules({ year, month, supplierId });
    }, [year, month, supplierId]);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key="title" />
                <meta property="og:description" content={`${supplierName}의 일정 캘린더입니다.`} key="description" />
            </Head>

            <ContentLayout>
                <Title>{title}</Title>

                <WorkshopCalendar
                    isPublished
                    initialDate={dayjs(currentDate)}
                    schedules={workshopSchedules}
                    onYearMonthChange={(currentDate) =>
                        router.replace(`/workshops/calendar/${supplierId}?currentDate=${currentDate}`)
                    }
                />
            </ContentLayout>
        </>
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
                wide: true,
            },
        };
    } catch (e) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
};

export default WorkshopCalendarPage;
