import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import useSettlementStore from '../../stores/settlement';

function SettlementsPage({ year, month, supplierId }) {
    const fetchOrdersBySupplierAndYearMonth = useSettlementStore((state) => state.fetchOrdersBySupplierAndYearMonth);
    const settlements = useSettlementStore((state) => state.settlements);
    console.log(settlements);

    useEffect(() => {
        fetchOrdersBySupplierAndYearMonth({ year, month, supplierId });
    }, []);
    return <div></div>;
}

export const getServerSideProps = (ctx) => {
    const now = dayjs();
    const { year = now.year(), month = now.month() + 1, supplierId = '' } = ctx.query;

    return {
        props: {
            year,
            month,
            supplierId,
        },
    };
};

export default SettlementsPage;
