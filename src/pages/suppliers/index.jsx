import { get } from 'lodash-es';
import dayjs from 'dayjs';
import ContentLayout from '../../component/Layout/ContentLayout';
import useSuppliersStore from '../../stores/suppliers';
import SearchList from '../../component/page-components/SearchList';
import { useEffect, useState } from 'react';
import { SEARCH_LIMIT } from '../../constants';
import SuppliersSearchForm from '../../component/SearchForms/Suppliers';
import { toQueryObject } from '../../utils/queryString';
import { useRouter } from 'next/router';
import { activeTypes, supplierTypes } from '../../constants/supplier';
import { COMMON_FORMAT } from '../../constants/date';
import { message } from 'antd';
import BasicModal from '../../component/Modal';
import ModifySupplierForm from '../../component/ModifyForms/Supplier';

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

function Suppliers({ from, to, active, name, teacher, type, product, teacherMobile, teacherEmail }) {
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
    const [createMode, setCreateMode] = useState(true);

    const fetchSuppliers = useSuppliersStore((state) => state.fetchSuppliers);
    const resetSuppliers = useSuppliersStore((state) => state.resetSuppliers);
    const fetchSupplier = useSuppliersStore((state) => state.fetchSupplier);
    const createSupplier = useSuppliersStore((state) => state.createSupplier);
    const updateSupplier = useSuppliersStore((state) => state.updateSupplier);
    const resetSupplier = useSuppliersStore((state) => state.resetSupplier);
    const fetchProductsBySupplier = useSuppliersStore((state) => state.fetchProductsBySupplier);
    const supplier = useSuppliersStore((state) => state.supplier);
    const products = useSuppliersStore((state) => state.products);
    const initializeSupplier = useSuppliersStore((state) => state.initializeSupplier);
    const suppliers = useSuppliersStore((state) => state.suppliers);
    const { hasNext, totalResults, result, page, next } = suppliers;

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

    const handleSupplierClick = async (id) => {
        try {
            await fetchSupplier(id);
            setCreateMode(false);
        } catch (e) {
            message.error('업체 정보를 불러올 수 없습니다.');
            message.error(e.response.data.message);
        }
    };

    const handleSubmit = async (values) => {
        try {
            if (createMode) {
                await createSupplier(values);
                await fetchSuppliers({
                    page: 1,
                    limit: SEARCH_LIMIT,
                });
            } else {
                await updateSupplier(supplier._id, values);
            }

            resetSupplier();
            message.success('저장을 완료하였습니다.');
        } catch (e) {
            message.error('저장에 실패하였습니다.');
            message.error(e.response.data.message);
        }
    };

    const fetchMore = async (init = false) => {
        try {
            if (init) {
                await fetchSuppliers({
                    ...searchQueries,
                    page: 1,
                    limit: SEARCH_LIMIT,
                });
                return;
            }
            await fetchSuppliers({ ...searchQueries, page: next, limit: SEARCH_LIMIT }, true);
        } catch (e) {
            message.error('리스트를 불러오는 데 실피하였습니다.');
        }
    };

    const fetchSupplierProducts = async (supplierId) => {
        try {
            await fetchProductsBySupplier(supplierId);
        } catch (e) {
            message.error('업체가 등록한 상품을 불러오는 데 실피하였습니다.');
        }
    };

    useEffect(() => {
        if (supplier?._id) {
            fetchSupplierProducts(supplier._id);
        }
    }, [supplier]);

    useEffect(() => {
        const { init, ...query } = router.query;

        if (!!init || !suppliers.result) {
            fetchMore(true);
            router.replace({ pathname: router.pathname, query });
        }
    }, [from, to, active, name, teacher, type, product, teacherMobile, teacherEmail]);

    return (
        <>
            <ContentLayout>
                <SearchList
                    title="업체 검색"
                    headers={headers}
                    items={supplierList}
                    totalLength={totalResults || 0}
                    hasNext={hasNext}
                    searchQueries={searchQueries}
                    fetchData={fetchMore}
                    initialPage={page}
                    nextPage={next}
                    onItemClick={handleSupplierClick}
                    createButtonText="업체생성"
                    onCreateButtonClick={() => {
                        initializeSupplier();
                        setCreateMode(true);
                    }}
                >
                    <SuppliersSearchForm
                        initialValues={searchQueries}
                        onSubmit={(values) => {
                            resetSuppliers();
                            router.replace({
                                pathname: '/suppliers',
                                query: toQueryObject(values),
                            });
                        }}
                        onReset={() => {
                            router.replace({ pathname: '/suppliers', query: { init: true } });
                        }}
                    />
                </SearchList>
            </ContentLayout>
            <BasicModal
                defaultBackground
                title={createMode ? '업체 생성' : '업체 수정'}
                isOpen={!!supplier}
                onClose={() => {
                    resetSupplier();
                }}
            >
                <ModifySupplierForm
                    submitButtonLabel={createMode ? '생성하기' : '수정하기'}
                    initialValues={supplier}
                    products={products}
                    onSubmit={handleSubmit}
                />
            </BasicModal>
        </>
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
