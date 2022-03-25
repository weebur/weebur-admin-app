import React, { useEffect, useState } from 'react';
import AsyncSelectBox from '../../../Form/AsyncSelectBox';
import SelectBox from '../../../Form/SelectBox';
import { Col, Divider, message, Typography } from 'antd';
import useOrdersStore from '../../../../stores/order';
import styled from 'styled-components';
import { supplierTypes } from '../../../../constants/supplier';
import { productTypes } from '../../../../constants/product';
import ErrorMessage from '../../../Text/ErrorMessage';

const ProductNames = styled.div`
    flex: 0 0 40%;
    display: flex;
    div {
        width: 100%;
    }
`;
const SuppliersDetails = styled.div`
    flex: 0 0 calc(60% - 20px);
    display: flex;
    align-items: flex-end;
    gap: 10px;

    & > .ant-divider {
        border: 1px solid ${({ theme }) => theme.color.text};
        height: 32px;
        padding-bottom: 5px;
    }
`;

const SupplierItem = styled.div`
    flex: 0 0 auto;
    text-align: center;
    line-height: 42px;
    font-size: ${({ theme }) => theme.fontSize.normal};

    &:nth-child(2) {
        margin-left: 20px;
    }
`;

const Fields = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 45px;
    align-items: flex-end;
`;

function ProductFields({ order, index, onValueChange, onChange, errors }) {
    const formData = useOrdersStore((state) => state.formData);
    const fetchProducts = useOrdersStore((state) => state.fetchProducts);
    const fetchProduct = useOrdersStore((state) => state.fetchProduct);
    const fetchSuppliersByProduct = useOrdersStore((state) => state.fetchSuppliersByProduct);

    const isOnline = formData.product?.type === productTypes.ONLINE.key;
    const [supplierOptions, setSupplierOptions] = useState([
        {
            key: order.supplierId,
            value: order.supplierId,
            label: order.supplierName,
        },
    ]);

    const fetchProductOptions = (name) => {
        return fetchProducts(name)
            .then((products) => {
                return products.map((product) => ({
                    label: product.name,
                    value: product._id,
                    key: product._id,
                }));
            })
            .catch(() => {
                message.error('상품목록을 불러오는데 실패하였습니다.');
            });
    };

    const loadSupplier = async (productId) => {
        try {
            const suppliers = await fetchSuppliersByProduct(productId);

            if (suppliers.length === 0) {
                message.warn('업체에 소속되지 않은 상품입니다.');
            }

            setSupplierOptions(
                suppliers.map((supplier) => ({
                    key: supplier._id,
                    value: supplier._id,
                    label: supplier.name,
                })),
            );

            onValueChange(`orders.${index}.supplierType`, suppliers[0]?.type || '');
            onValueChange(`orders.${index}.supplierName`, suppliers[0]?.name || '');
            onValueChange(`orders.${index}.supplierId`, suppliers[0]?._id || '');
            onValueChange(`orders.${index}.mainTeacherId`, suppliers[0].mainTeacher?._id || '');
            onValueChange(`orders.${index}.mainTeacherName`, suppliers[0].mainTeacher?.name || '');
            onValueChange(`orders.${index}.mainTeacherMobile`, suppliers[0].mainTeacher?.mobile || '');
        } catch (e) {
            message.warn('업체목록을 불러오는데 실패하였습니다.');
        }
    };

    useEffect(() => {
        if (order.productId) {
            fetchProduct(order.productId);
        }
    }, [order.productId]);

    return (
        <>
            <Fields>
                <ProductNames>
                    <div>
                        <AsyncSelectBox
                            allowClear
                            name={`orders.${index}.productId`}
                            label="상품선택"
                            onChange={(name, productId) => {
                                const value = formData.products.find((product) => product._id === productId);

                                if (!value) {
                                    onValueChange(`orders.${index}.productType`, '');
                                    onValueChange(`orders.${index}.productName`, '');
                                    onValueChange(name, '');
                                    onValueChange(`orders.${index}.supplierType`, '');
                                    onValueChange(`orders.${index}.supplierName`, '');
                                    onValueChange(`orders.${index}.supplierId`, '');
                                    return;
                                }

                                onValueChange(`orders.${index}.productType`, value.type);
                                onValueChange(`orders.${index}.productName`, value.name);
                                onValueChange(`orders.${index}.productFee`, value.fee);
                                onValueChange(name, value._id);

                                loadSupplier(value._id);
                            }}
                            value={order.productId}
                            fetchOptions={fetchProductOptions}
                            initialOptions={[
                                { label: order.productName, value: order.productId, key: order.productId },
                            ]}
                            errorMessage={errors.productId}
                        />
                        {errors.productId && <ErrorMessage text={errors.productId} />}
                    </div>
                </ProductNames>

                {order.productId && (
                    <SuppliersDetails>
                        <Col flex={'30%'}>
                            <SelectBox
                                label="업체 선택"
                                name={`orders.${index}.supplierId`}
                                value={order.supplierId}
                                onChange={(name, supplierId) => {
                                    const value = formData.suppliers.find((supplier) => supplier._id === supplierId);

                                    onValueChange(`orders.${index}.supplierId`, value._id);
                                    onValueChange(`orders.${index}.supplierName`, value.name);
                                    onValueChange(`orders.${index}.supplierType`, value.type);
                                    onValueChange(`orders.${index}.mainTeacherId`, value.mainTeacher?._id);
                                    onValueChange(`orders.${index}.mainTeacherName`, value.mainTeacher?.name);
                                    onValueChange(`orders.${index}.mainTeacherMobile`, value.mainTeacher?.mobile);
                                }}
                                options={supplierOptions}
                            />
                            {errors.supplierId && <ErrorMessage text={errors.supplierId} />}
                        </Col>
                        <SupplierItem>
                            <Typography.Text>{supplierTypes[order.supplierType]?.label}</Typography.Text>
                        </SupplierItem>
                        <Divider type="vertical" />
                        <SupplierItem>
                            <Typography.Text>{`수수료 ${(order.productFee * 100).toFixed(0)}%`}</Typography.Text>
                        </SupplierItem>
                        <Divider type="vertical" />
                        <SupplierItem>
                            <Typography.Text>{order.mainTeacherName}</Typography.Text>
                        </SupplierItem>
                        <Divider type="vertical" />
                        <SupplierItem>
                            <Typography.Text>{order.mainTeacherMobile}</Typography.Text>
                        </SupplierItem>
                    </SuppliersDetails>
                )}
            </Fields>
        </>
    );
}

export default ProductFields;
