import { get } from 'lodash-es';
import dayjs from 'dayjs';
import ContentLayout from '../../component/Layout/ContentLayout';
import useSuppliersStore from '../../stores/suppliers';
import SearchList from '../../component/page-components/SearchList';
import { useEffect } from 'react';
import { SEARCH_LIMIT } from '../../constants';
import SuppliersSearchForm from '../../component/SearchForms/Suppliers';
import { toQueryObject } from '../../utils/queryString';
import { useRouter } from 'next/router';
import AppLayout from '../../component/Layout';
import { activeTypes, supplierTypes } from '../../constants/supplier';
import { COMMON_FORMAT } from '../../constants/date';

const headers = [
    {
        key: 'contractDate',
        label: '계약일',
        span: 2,
        render: (contractDate) => dayjs(contractDate).format(COMMON_FORMAT),
    },
    {
        key: 'active',
        label: '운영여부',
        span: 2,
        render: (active) => activeTypes[active].label,
    },
    { key: 'name', label: '업체명', span: 5 },
    {
        key: 'type',
        label: '업체형태',
        span: 3,
        render: (type) => supplierTypes[type].label,
    },
    { key: 'details', label: '특이사항', span: 5 },
    {
        key: 'mainTeacher.name',
        label: '대표강사명',
        span: 3,
    },
    { key: 'mainTeacher.mobile', label: '대표강사모바일', span: 4 },
];

function Suppliers({
    from,
    to,
    active,
    name,
    teacher,
    type,
    product,
    teacherMobile,
    teacherEmail,
}) {
    const router = useRouter();

    const searchQueries = {
        from,
        to,
        active,
        name,
        teacher,
        type,
        product,
        teacherMobile,
        teacherEmail,
    };
    const fetchSuppliers = useSuppliersStore((state) => state.fetchSuppliers);
    const resetSuppliers = useSuppliersStore((state) => state.resetSuppliers);
    const suppliers = useSuppliersStore((state) => state.suppliers);
    const { hasNext, totalResults, result, page, loading, next } = suppliers;

    const supplierList = result?.map((result) => {
        return {
            id: result._id,
            rows: headers.map(({ key, span, render }) => {
                return {
                    key,
                    Component: render ? render(result[key]) : get(result, key),
                    span,
                };
            }),
        };
    });

    const fetchNext = () => {
        fetchSuppliers(
            { ...searchQueries, page: next, limit: SEARCH_LIMIT },
            true,
        );
    };

    useEffect(() => {
        if (suppliers.result) return;

        fetchSuppliers({ ...searchQueries, page: 1, limit: SEARCH_LIMIT });
    }, [searchQueries]);

    return (
        <AppLayout>
            <ContentLayout>
                <SearchList
                    title="회사 검색"
                    headers={headers}
                    items={supplierList}
                    totalLength={totalResults || 0}
                    hasNext={hasNext}
                    searchQueries={searchQueries}
                    fetchData={fetchNext}
                    initialPage={page}
                    loading={loading}
                    nextPage={next}
                >
                    <SuppliersSearchForm
                        initialValues={searchQueries}
                        onSubmit={(values) => {
                            resetSuppliers();
                            router.push({
                                pathname: '/suppliers',
                                query: toQueryObject(values),
                            });
                        }}
                    />
                </SearchList>
            </ContentLayout>
        </AppLayout>
    );
}

export const getServerSideProps = (ctx) => {
    const {
        from = '',
        to = '',
        active = '',
        name = '',
        teacher = '',
        type = '',
        product = '',
        teacherMobile = '',
        teacherEmail = '',
    } = ctx.query;

    return {
        props: {
            from,
            to,
            active,
            name,
            teacher,
            type,
            product,
            teacherMobile,
            teacherEmail,
        },
    };
};

export default Suppliers;
