import { compact, get, omit } from 'lodash-es';
import dayjs from 'dayjs';
import ContentLayout from '../../component/Layout/ContentLayout';
import useProductsStore from '../../stores/products';
import SearchList from '../../component/page-components/SearchList';
import { useEffect, useState } from 'react';
import { SEARCH_LIMIT } from '../../constants';
import ProductsSearchForm from '../../component/SearchForms/Products';
import { toQueryObject } from '../../utils/queryString';
import { useRouter } from 'next/router';
import { activeTypes } from '../../constants/supplier';
import { COMMON_FORMAT } from '../../constants/date';
import { productTypes } from '../../constants/product';
import { message } from 'antd';
import BasicModal from '../../component/Modal';
import ModifyProductForm from '../../component/ModifyForms/Product';

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

function Products({ active, name, supplierName, type }) {
    const router = useRouter();

    const searchQueries = {
        active,
        name,
        supplierName,
        type,
    };
    const [createMode, setCreateMode] = useState(true);

    const fetchProducts = useProductsStore((state) => state.fetchProducts);
    const resetProducts = useProductsStore((state) => state.resetProducts);
    const resetProduct = useProductsStore((state) => state.resetProduct);
    const createProduct = useProductsStore((state) => state.createProduct);
    const updateProduct = useProductsStore((state) => state.updateProduct);
    const fetchProduct = useProductsStore((state) => state.fetchProduct);
    const initializeProduct = useProductsStore((state) => state.initializeProduct);
    const product = useProductsStore((state) => state.product);
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

    const handleSubmit = async (values) => {
        const suppliers = get(values, 'suppliers');
        const payload = {
            ...omit(values, 'suppliers'),
            supplierIds: compact(suppliers.map((supplier) => supplier._id)),
        };

        try {
            if (createMode) {
                await createProduct(payload);
                await fetchProducts({
                    page: 1,
                    limit: SEARCH_LIMIT,
                });
            } else {
                await updateProduct(product._id, payload);
            }

            resetProduct();
            message.success('저장을 완료하였습니다.');
        } catch (e) {
            message.error('저장에 실패하였습니다.');
            message.error(e.response.data.message);
        }
    };

    const handleProductClick = async (id) => {
        try {
            await fetchProduct(id);
            setCreateMode(false);
        } catch (e) {
            message.error('상품 정보를 불러올 수 없습니다.');
            message.error(e.response.data.message);
        }
    };

    const fetchMore = async (init = false) => {
        try {
            if (init) {
                await fetchProducts({
                    ...searchQueries,
                    page: 1,
                    limit: SEARCH_LIMIT,
                });
                return;
            }
            await fetchProducts({ ...searchQueries, page: next, limit: SEARCH_LIMIT }, true);
        } catch (e) {
            message.error('리스트를 불러오는 데 실피하였습니다.');
        }
    };

    useEffect(() => {
        if (products.result) return;

        fetchMore(true);
    }, [active, name, supplierName, type]);

    return (
        <>
            <ContentLayout>
                <SearchList
                    title="상품 검색"
                    headers={headers}
                    items={supplierList}
                    totalLength={totalResults || 0}
                    hasNext={hasNext}
                    searchQueries={searchQueries}
                    fetchData={fetchMore}
                    initialPage={page}
                    nextPage={next}
                    onItemClick={handleProductClick}
                    createButtonText="상품생성"
                    onCreateButtonClick={() => {
                        initializeProduct();
                        setCreateMode(true);
                    }}
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
            <BasicModal
                defaultBackground
                title={createMode ? '상품 생성' : '상품 수정'}
                isOpen={!!product}
                onClose={() => {
                    resetProduct();
                }}
            >
                <ModifyProductForm
                    submitButtonLabel={createMode ? '생성하기' : '수정하기'}
                    initialValues={product}
                    onSubmit={handleSubmit}
                />
            </BasicModal>
        </>
    );
}

export const getServerSideProps = (ctx) => {
    const { active = '', name = '', type = '', supplierName = '' } = ctx.query;

    return {
        props: {
            active,
            name,
            type,
            supplierName,
        },
    };
};

export default Products;
