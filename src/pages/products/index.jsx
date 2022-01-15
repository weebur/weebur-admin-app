import { get } from 'lodash-es';
import dayjs from 'dayjs';
import ContentLayout from '../../component/Layout/ContentLayout';
import useProductsStore from '../../stores/products';
import SearchList from '../../component/page-components/SearchList';
import { useEffect } from 'react';
import { SEARCH_LIMIT } from '../../constants';
import ProductsSearchForm from '../../component/SearchForms/Products';
import { toQueryObject } from '../../utils/queryString';
import { useRouter } from 'next/router';
import AppLayout from '../../component/Layout';
import { activeTypes } from '../../constants/supplier';
import { COMMON_FORMAT } from '../../constants/date';
import { productTypes } from '../../constants/product';

const headers = [
    {
        key: 'createdAt',
        label: '등록일',
        span: 2,
        render: (createdAt) => dayjs(createdAt).format(COMMON_FORMAT),
    },
    {
        key: 'active',
        label: '운영여부',
        span: 2,
        render: (active) => activeTypes[active].label,
    },
    {
        key: 'type',
        label: '종류',
        span: 2,
        render: (active) => productTypes[active].label,
    },
    { key: 'name', label: '상품명', span: 5 },
    {
        key: 'fee',
        label: '수수료',
        span: 2,
        render: (fee) => `${Math.round(fee * 100)}%`,
    },
    {
        key: 'suppliers',
        label: '업체명',
        span: 11,
        render: (suppliers) => {
            return suppliers.map((suppliers) => suppliers.name).join(' | ');
        },
    },
];

function Products({
    active,
    name,
    supplier,
    teacher,
    teacherMobile,
    teacherEmail,
    type,
}) {
    const router = useRouter();

    const searchQueries = {
        active,
        name,
        supplier,
        teacher,
        teacherMobile,
        teacherEmail,
        type,
    };
    const fetchProducts = useProductsStore((state) => state.fetchProducts);
    const resetProducts = useProductsStore((state) => state.resetProducts);
    const products = useProductsStore((state) => state.products);
    const { hasNext, totalResults, result, page, next } = products;

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
        fetchProducts(
            { ...searchQueries, page: next, limit: SEARCH_LIMIT },
            true,
        );
    };

    useEffect(() => {
        if (products.result) return;

        fetchProducts({ ...searchQueries, page: 1, limit: SEARCH_LIMIT });
    }, [searchQueries]);

    return (
        <AppLayout>
            <ContentLayout>
                <SearchList
                    title="상품 검색"
                    headers={headers}
                    items={supplierList}
                    totalLength={totalResults || 0}
                    hasNext={hasNext}
                    searchQueries={searchQueries}
                    fetchData={fetchNext}
                    initialPage={page}
                    nextPage={next}
                    createButtonText="상품생성"
                >
                    <ProductsSearchForm
                        initialValues={searchQueries}
                        onSubmit={(values) => {
                            resetProducts();
                            router.push({
                                pathname: '/products',
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
        active = '',
        name = '',
        teacher = '',
        type = '',
        supplier = '',
        teacherMobile = '',
        teacherEmail = '',
    } = ctx.query;

    return {
        props: {
            active,
            name,
            teacher,
            type,
            supplier,
            teacherMobile,
            teacherEmail,
        },
    };
};

export default Products;
