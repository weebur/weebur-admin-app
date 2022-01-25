import React from 'react';
import { AddButtonWrapper, ButtonsWrapper, Form, InputWrapper } from './styles';
import { useFormik } from 'formik';
import Input from '../Form/Input';
import {
    productTypes,
    productPriceTypes,
    productDeliveryTypes,
    defaultRegions,
} from '../../constants/product';
import SelectBox from '../Form/SelectBox';
import SubmitButton from '../Form/SubmitButton';
import CommonButton from '../Button';
import TextArea from '../Form/TextArea';
import dayjs from 'dayjs';
import { COMMON_FORMAT } from '../../constants/date';
import NumberInput from '../Form/NumberInput';
import { Divider, Typography } from 'antd';
import DraggableFields from '../Form/SortableFields';
import SortableItem from '../Form/SortableFields/SortableItem';
import Label from '../Form/Label';

import styled from 'styled-components';
import CreateButton from '../Button/CreateButton';
import ProductService from '../../services/ProductService';
import AsyncSelectBox from '../Form/AsyncSelectBox';
import { fetchSuppliers } from '../../api/SupplierAPI';
import TextInput from '../Form/Input';

const PriceHead = styled.div`
    padding-left: 30px;
    display: flex;
    gap: 15px;

    label {
        width: 100%;
    }
`;

const FieldSection = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'row'};
    width: 100%;
    background: #ffffff;
    padding: 33px 42px 44px 38px;
    border-radius: 20px;
    gap: 10px;
    ${({ half }) =>
        half &&
        `
        width: 50%;
    `}
`;

function ModifyProductForm({
    initialValues,
    onSubmit,
    onReset,
    submitButtonLabel,
}) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
    });
    const { prices, suppliers } = formik.values;

    const addPriceItem = (type) => {
        const targetPrices = prices[type];
        formik.setFieldValue(`prices.${type}`, [
            ...targetPrices,
            ProductService.getDefaultPriceSet(type),
        ]);
    };

    const fetchSupplierOptions = async (name) => {
        try {
            const suppliers = await fetchSuppliers({
                page: 0,
                limit: 10,
                name,
            });
            return suppliers.result.map(({ _id, name }) => ({
                label: name,
                value: JSON.stringify({
                    _id,
                    name,
                }),
                key: _id,
            }));
        } catch (err) {
            return [];
        }
    };

    console.log(formik.values);

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
            }}
        >
            <FieldSection direction="column">
                <InputWrapper>
                    <Input
                        required
                        label="상품명"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    <Input
                        disabled
                        label="등록일"
                        name="createdAt"
                        value={dayjs(formik.values.createdAt).format(
                            COMMON_FORMAT,
                        )}
                        onChange={formik.handleChange}
                    />
                </InputWrapper>
                <InputWrapper>
                    <SelectBox
                        allowClear
                        required
                        name="type"
                        label="종류"
                        onChange={formik.setFieldValue}
                        value={formik.values.type}
                        options={Object.values(productTypes)}
                    />
                    <NumberInput
                        label="수수료"
                        name="fee"
                        value={formik.values.fee * 100}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (isNaN(value) || Number(value) > 100) {
                                return;
                            }
                            e.target.value = Number(value) / 100;
                            formik.handleChange(e);
                        }}
                        suffix={'%'}
                    />
                    <SelectBox
                        allowClear
                        name="active"
                        label="운영여부"
                        onChange={formik.setFieldValue}
                        value={formik.values.active}
                        options={[
                            { key: true, label: '운영' },
                            { key: false, label: '미운영' },
                        ]}
                    />
                </InputWrapper>
                <InputWrapper>
                    <TextInput
                        label="상품 URL"
                        name="url"
                        value={formik.values.url}
                        onChange={formik.handleChange}
                    />
                </InputWrapper>
                <InputWrapper>
                    <TextArea
                        label="특이사항"
                        name="details"
                        value={formik.values.details}
                        onChange={formik.handleChange}
                    />
                </InputWrapper>
            </FieldSection>
            <FieldSection>
                <DraggableFields
                    id={'product-price'}
                    ids={prices?.product.map((_, i) => i.toString())}
                    onChange={(v) => {
                        formik.setFieldValue(
                            'prices.product',
                            v.map(
                                (index) => formik.values.prices.product[index],
                            ),
                        );
                    }}
                >
                    <Typography.Title level={5}>상품 가격</Typography.Title>
                    <PriceHead>
                        <Label>종류</Label>
                        <Label>최소인원</Label>
                        <Label>최대인원</Label>
                        <Label>가격</Label>
                    </PriceHead>
                    {prices?.product.map(({ type, range, price }, i) => {
                        return (
                            <SortableItem
                                key={i}
                                id={i.toString()}
                                onRemove={() => {
                                    formik.setFieldValue(
                                        'prices.product',
                                        prices.product.filter(
                                            (_, index) => i !== index,
                                        ),
                                    );
                                }}
                            >
                                <InputWrapper>
                                    <SelectBox
                                        name={`prices.product.${i}.type`}
                                        onChange={formik.setFieldValue}
                                        value={type}
                                        options={Object.values(
                                            productPriceTypes,
                                        )}
                                    />
                                    <NumberInput
                                        name={`prices.product.${i}.range.from`}
                                        value={range.from}
                                        onChange={formik.setFieldValue}
                                    />
                                    <NumberInput
                                        name={`prices.product.${i}.range.to`}
                                        value={range.to}
                                        onChange={formik.setFieldValue}
                                    />
                                    <NumberInput
                                        name={`prices.product.${i}.price`}
                                        value={price.toLocaleString()}
                                        onChange={formik.setFieldValue}
                                        suffix={'₩'}
                                    />
                                </InputWrapper>
                            </SortableItem>
                        );
                    })}
                    <AddButtonWrapper>
                        <CreateButton
                            full
                            onClick={() => addPriceItem('product')}
                        />
                    </AddButtonWrapper>
                </DraggableFields>
            </FieldSection>
            <FieldSection>
                <DraggableFields
                    id={'option-price'}
                    ids={prices?.option.map((_, i) => i.toString())}
                    onChange={(v) => {
                        formik.setFieldValue(
                            'prices.option',
                            v.map(
                                (index) => formik.values.prices.option[index],
                            ),
                        );
                    }}
                >
                    <Typography.Title level={5}>옵션 가격</Typography.Title>
                    <PriceHead>
                        <Label>항목</Label>
                        <Label>가격</Label>
                    </PriceHead>
                    {prices?.option.map(({ name, price }, i) => {
                        return (
                            <SortableItem
                                key={i}
                                id={i.toString()}
                                onRemove={() => {
                                    formik.setFieldValue(
                                        'prices.option',
                                        prices.option.filter(
                                            (_, index) => i !== index,
                                        ),
                                    );
                                }}
                            >
                                <InputWrapper>
                                    <Input
                                        name={`prices.option.${i}.name`}
                                        value={name}
                                        onChange={formik.handleChange}
                                    />
                                    <NumberInput
                                        name={`prices.option.${i}.price`}
                                        value={price.toLocaleString()}
                                        onChange={formik.setFieldValue}
                                        suffix={'₩'}
                                    />
                                </InputWrapper>
                            </SortableItem>
                        );
                    })}
                    <AddButtonWrapper>
                        <CreateButton
                            full
                            onClick={() => addPriceItem('option')}
                        />
                    </AddButtonWrapper>
                </DraggableFields>
                <Divider type="vertical" style={{ height: 'inherit' }} />
                <DraggableFields
                    id={'excursion-price'}
                    ids={prices?.excursion.map((_, i) => i.toString())}
                    onChange={(v) => {
                        formik.setFieldValue(
                            'prices.excursion',
                            v.map(
                                (index) =>
                                    formik.values.prices.excursion[index],
                            ),
                        );
                    }}
                >
                    <Typography.Title level={5}>출장비</Typography.Title>
                    <PriceHead>
                        <Label>방식</Label>
                        <Label>가격</Label>
                    </PriceHead>
                    {prices?.excursion.map(({ region, price }, i) => {
                        return (
                            <SortableItem
                                key={i}
                                id={i.toString()}
                                onRemove={() => {
                                    formik.setFieldValue(
                                        'prices.excursion',
                                        prices.excursion.filter(
                                            (_, index) => i !== index,
                                        ),
                                    );
                                }}
                            >
                                <InputWrapper>
                                    <SelectBox
                                        name={`prices.excursion.${i}.region`}
                                        onChange={formik.setFieldValue}
                                        value={region}
                                        options={defaultRegions.map(
                                            (region) => ({
                                                key: region,
                                                label: region,
                                            }),
                                        )}
                                    />
                                    <NumberInput
                                        name={`prices.excursion.${i}.price`}
                                        value={price.toLocaleString()}
                                        onChange={formik.setFieldValue}
                                        suffix={'₩'}
                                    />
                                </InputWrapper>
                            </SortableItem>
                        );
                    })}
                    <AddButtonWrapper>
                        <CreateButton
                            full
                            onClick={() => addPriceItem('excursion')}
                        />
                    </AddButtonWrapper>
                </DraggableFields>
            </FieldSection>
            <FieldSection half>
                <DraggableFields
                    id={'delivery-price'}
                    ids={prices?.delivery.map((_, i) => i.toString())}
                    onChange={(v) => {
                        formik.setFieldValue(
                            'prices.delivery',
                            v.map(
                                (index) => formik.values.prices.delivery[index],
                            ),
                        );
                    }}
                >
                    <Typography.Title level={5}>배송비</Typography.Title>
                    <PriceHead>
                        <Label>지역</Label>
                        <Label>가격</Label>
                    </PriceHead>
                    {prices?.delivery.map(({ type, price }, i) => {
                        return (
                            <SortableItem
                                key={i}
                                id={i.toString()}
                                onRemove={() => {
                                    formik.setFieldValue(
                                        'prices.delivery',
                                        prices.delivery.filter(
                                            (_, index) => i !== index,
                                        ),
                                    );
                                }}
                            >
                                <InputWrapper>
                                    <SelectBox
                                        name={`prices.delivery.${i}.type`}
                                        onChange={formik.setFieldValue}
                                        value={type}
                                        options={Object.values(
                                            productDeliveryTypes,
                                        )}
                                    />
                                    <NumberInput
                                        name={`prices.delivery.${i}.price`}
                                        value={price.toLocaleString()}
                                        onChange={formik.setFieldValue}
                                        suffix={'₩'}
                                    />
                                </InputWrapper>
                            </SortableItem>
                        );
                    })}
                    <AddButtonWrapper>
                        <CreateButton
                            full
                            onClick={() => addPriceItem('delivery')}
                        />
                    </AddButtonWrapper>
                </DraggableFields>
            </FieldSection>
            <FieldSection half>
                <DraggableFields
                    id={'supplier'}
                    ids={suppliers?.map((_, i) => i.toString())}
                    onChange={(v) => {
                        formik.setFieldValue(
                            'suppliers',
                            v.map((index) => suppliers[index]),
                        );
                    }}
                >
                    <Typography.Title level={5}>담당 업체</Typography.Title>
                    {suppliers.map(({ _id, name }, i) => {
                        return (
                            <SortableItem
                                key={i}
                                id={i.toString()}
                                onRemove={() => {
                                    formik.setFieldValue(
                                        'suppliers',
                                        suppliers.filter(
                                            (_, index) => i !== index,
                                        ),
                                    );
                                }}
                            >
                                <AsyncSelectBox
                                    name={`suppliers.${i}`}
                                    onChange={(name, v) => {
                                        formik.setFieldValue(
                                            name,
                                            JSON.parse(v),
                                        );
                                    }}
                                    fetchOptions={fetchSupplierOptions}
                                    value={JSON.stringify({
                                        _id,
                                        name,
                                    })}
                                    initialOptions={[
                                        {
                                            label: name,
                                            value: JSON.stringify({
                                                _id,
                                                name,
                                            }),
                                            key: _id,
                                        },
                                    ]}
                                />
                            </SortableItem>
                        );
                    })}
                    <AddButtonWrapper>
                        <CreateButton
                            full
                            onClick={() =>
                                formik.setFieldValue('suppliers', [
                                    ...suppliers,
                                    { _id: '', name: '' },
                                ])
                            }
                        />
                    </AddButtonWrapper>
                </DraggableFields>
            </FieldSection>

            <ButtonsWrapper>
                <CommonButton
                    small
                    light
                    onClick={(e) => {
                        e.preventDefault();
                        formik.setValues(initialValues);
                        onReset && onReset();
                    }}
                >
                    초기화
                </CommonButton>
                <SubmitButton
                    disabled={!formik.dirty || formik.isSubmitting}
                    small
                    primary
                    text={submitButtonLabel}
                />
            </ButtonsWrapper>
        </Form>
    );
}

export default ModifyProductForm;
