import React, { useEffect } from 'react';
import ContentLayout from '../../component/Layout/ContentLayout';
import { message, Table, Typography } from 'antd';
import {
    getSalesByRange,
    getSalesByProduct,
    getSalesBySupplier,
    getSalesByClientType,
    getSalesByCompanyCategory,
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

function DashBoard() {
    const {
        salesByRange,
        salesByCompanyCategory,
        salesByClientType,
        salesByProduct,
        salesBySupplier,
        initialFactors,
        fetchSalesByRange,
        fetchSalesByCompanyCategory,
        fetchSalesByClientType,
        fetchSalesByProduct,
        fetchSalesBySupplier,
    } = useAnalyticsStore((state) => state);
    const { from, to, companyCategory, clientType, fromMonth, toMonth } = initialFactors;

    const handleChangeSalesByRange = async (from, to) => {
        try {
            await fetchSalesByRange(from, to);
            message.success('자료 로드를 성공하였습니다.');
        } catch (e) {
            message.error(JSON.stringify(e));
        }
    };

    const handleChangeSalesByCompanyCategory = async (from, to, companyCategory) => {
        try {
            await fetchSalesByCompanyCategory(from, to, companyCategory);
            message.success('자료 로드를 성공하였습니다.');
        } catch (e) {
            message.error(JSON.stringify(e));
        }
    };

    const handleChangeSalesByClientType = async (from, to, clientType) => {
        try {
            await fetchSalesByClientType(from, to, clientType);
            message.success('자료 로드를 성공하였습니다.');
        } catch (e) {
            message.error(JSON.stringify(e));
        }
    };

    const handleChangeSalesBySupplier = async (from, to) => {
        try {
            await fetchSalesBySupplier(from, to);
            message.success('자료 로드를 성공하였습니다.');
        } catch (e) {
            message.error(JSON.stringify(e));
        }
    };
    const handleChangeSalesByProduct = async (from, to) => {
        try {
            await fetchSalesByProduct(from, to);
            message.success('자료 로드를 성공하였습니다.');
        } catch (e) {
            message.error(JSON.stringify(e));
        }
    };
    useEffect(() => {
        // fetchSalesByRange(from, to);
        // fetchSalesByCompanyCategory(from, to, companyCategory);
        // fetchSalesByClientType(from, to, clientType);
        // fetchSalesByProduct(fromMonth, toMonth);
        // fetchSalesBySupplier(fromMonth, toMonth);
    }, []);
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
        </ContentLayout>
    );
}

export default DashBoard;
