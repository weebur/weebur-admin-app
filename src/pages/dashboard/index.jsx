import React, { useEffect, useRef } from 'react';
import ContentLayout from '../../component/Layout/ContentLayout';
import { message, Table, Typography } from 'antd';
import {
    getSalesByRange,
    getSalesByProduct,
    getSalesBySupplier,
    getSalesByClientType,
    getSalesByCompanyCategory,
    getBuyers,
} from '../../api/AnalyticsAPI';
import dayjs from 'dayjs';
import Button from '../../component/Button';
import fileDownload from 'js-file-download';
import useAnalyticsStore from '../../stores/analytics';
import SalesByRange from '../../component/page-components/Analytics/SalesByRange';
import SalesByCompanyCategory from '../../component/page-components/Analytics/SalesByCompanyCategory';
import SalesByClientType from '../../component/page-components/Analytics/SalesByClientType';
import SalesByProduct from '../../component/page-components/Analytics/SalesByProduct';
import SalesBySupplier from '../../component/page-components/Analytics/SalesBySupplier';
import { debounce } from 'lodash-es';
import { withToken } from '../../services/SsrService';
import Buyers from '../../component/page-components/Analytics/Buyers';

function DashBoard() {
    const loader = useRef();

    const {
        salesByRange,
        salesByCompanyCategory,
        salesByClientType,
        salesByProduct,
        salesBySupplier,
        buyers,
        initialFactors,
        fetchSalesByRange,
        fetchSalesByCompanyCategory,
        fetchSalesByClientType,
        fetchSalesByProduct,
        fetchSalesBySupplier,
        fetchBuyers,
        isLoading,
    } = useAnalyticsStore((state) => state);
    const { from, to, companyCategory, clientType, fromMonth, toMonth } = initialFactors;

    const handleSuccess = debounce(() => message.success('자료 로드를 성공하였습니다.'), 500);

    const handleChangeSalesByRange = async (from, to) => {
        try {
            await fetchSalesByRange(from, to);
            handleSuccess();
        } catch (e) {
            message.error(JSON.stringify(e));
        }
    };

    const handleChangeSalesByCompanyCategory = async (from, to, companyCategory) => {
        try {
            await fetchSalesByCompanyCategory(from, to, companyCategory);
            handleSuccess();
        } catch (e) {
            message.error(JSON.stringify(e));
        }
    };

    const handleChangeSalesByClientType = async (from, to, clientType) => {
        try {
            await fetchSalesByClientType(from, to, clientType);
            handleSuccess();
        } catch (e) {
            message.error(JSON.stringify(e));
        }
    };

    const handleChangeSalesBySupplier = async (from, to) => {
        try {
            await fetchSalesBySupplier(from, to);
            handleSuccess();
        } catch (e) {
            message.error(JSON.stringify(e));
        }
    };
    const handleChangeSalesByProduct = async (from, to) => {
        try {
            await fetchSalesByProduct(from, to);
            handleSuccess();
        } catch (e) {
            message.error(JSON.stringify(e));
        }
    };

    const handleChangeBuyers = async (from, to) => {
        try {
            await fetchBuyers(from, to);
            handleSuccess();
        } catch (e) {
            message.error(JSON.stringify(e));
        }
    };

    useEffect(() => {
        if (!isLoading) {
            loader?.current?.();
            loader.current = null;
            return;
        }
        if (isLoading && loader) {
            if (loader.current) {
                return;
            }
            loader.current = message.loading('데이터를 불러오는 중입니다.', 0);
        }
    }, [isLoading]);

    return (
        <ContentLayout>
            <Typography.Title level={4}>대시보드</Typography.Title>
            <SalesByRange
                data={salesByRange}
                from={from}
                to={to}
                onChange={handleChangeSalesByRange}
                title="전체 매출 요약"
                onDownloadClick={async (from, to) => {
                    const data = await getSalesByRange(from, to, true);
                    fileDownload(data, 'sales.csv');
                }}
            />
            <SalesByCompanyCategory
                data={salesByCompanyCategory}
                from={from}
                to={to}
                companyCategory={companyCategory}
                onChange={handleChangeSalesByCompanyCategory}
                title="회사 유형별 매출"
                onDownloadClick={async (from, to, companyCategory) => {
                    const data = await getSalesByCompanyCategory(from, to, companyCategory, true);
                    fileDownload(data, 'sales.csv');
                }}
            />
            <SalesByClientType
                data={salesByClientType}
                from={from}
                to={to}
                clientType={clientType}
                onChange={handleChangeSalesByClientType}
                title="고객 유형별 매출"
                onDownloadClick={async (from, to, clientType) => {
                    const data = await getSalesByClientType(from, to, clientType, true);
                    fileDownload(data, 'sales.csv');
                }}
            />
            <SalesByProduct
                data={salesByProduct}
                from={from}
                to={to}
                onChange={handleChangeSalesByProduct}
                title="상품별 매출 요약"
                onDownloadClick={async (from, to) => {
                    const data = await getSalesByProduct(from, to, true);
                    fileDownload(data, 'sales.csv');
                }}
            />

            <SalesBySupplier
                data={salesBySupplier}
                from={from}
                to={to}
                onChange={handleChangeSalesBySupplier}
                title="업체별 매출 요약"
                onDownloadClick={async (from, to) => {
                    const data = await getSalesBySupplier(from, to, true);
                    fileDownload(data, 'sales.csv');
                }}
            />

            <Buyers
                data={buyers}
                from={from}
                to={to}
                onChange={handleChangeBuyers}
                title="신규, 재구매자수"
                onDownloadClick={async (from, to) => {
                    const data = await getBuyers(from, to, true);
                    fileDownload(data, 'buyers.csv');
                }}
            />
        </ContentLayout>
    );
}

export const getServerSideProps = withToken();

export default DashBoard;
