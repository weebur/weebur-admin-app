import { useFormik } from 'formik';
import Input from '../Form/Input';
import SubmitButton from '../Form/SubmitButton';

import styled from 'styled-components';
import CommonButton from '../Button';
import SelectBox from '../Form/SelectBox';
import { supplierTypes } from '../../constants/supplier';
import AsyncSelectBox from '../Form/AsyncSelectBox';
import { useEffect, useState } from 'react';
import { fetchProduct, fetchProducts } from '../../api/ProductAPI';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`;

const InputWrapper = styled.div`
    display: flex;
    gap: 15px;
`;

function SuppliersSearchForm({ initialValues = {}, onSubmit, onReset }) {
    const [productOptions, setProductOptions] = useState([]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit,
    });
    const fetchOptions = (name) =>
        fetchProducts({ page: 0, limit: 10, name }).then((companies) => {
            return companies.result.map((product) => ({
                label: product.name,
                value: product._id,
                key: product._id,
            }));
        });

    useEffect(() => {
        if (formik.values.product) {
            fetchProduct(formik.values.product)
                .then((product) =>
                    setProductOptions([
                        {
                            label: product.name,
                            value: product._id,
                            key: product._id,
                        },
                    ]),
                )
                .catch(() => setProductOptions([]));
        }
    }, []);

    return (
        <Form onSubmit={formik.handleSubmit}>
            <InputWrapper>
                <SelectBox
                    allowClear
                    name="active"
                    label="운영여부"
                    onChange={formik.setFieldValue}
                    value={formik.values.active}
                    options={[
                        { key: 'true', label: '운영중' },
                        { key: 'false', label: '미운영' },
                    ]}
                />
                <SelectBox
                    allowClear
                    name="type"
                    label="종류"
                    onChange={formik.setFieldValue}
                    value={formik.values.type}
                    options={Object.values(supplierTypes)}
                />
            </InputWrapper>

            <InputWrapper>
                <AsyncSelectBox
                    name="product"
                    label="상품명"
                    onChange={formik.setFieldValue}
                    value={formik.values.product}
                    fetchOptions={fetchOptions}
                    initialOptions={productOptions}
                />
                <Input
                    name="name"
                    label="업체명"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
            </InputWrapper>

            <InputWrapper>
                <SubmitButton
                    disabled={!formik.dirty}
                    small
                    primary
                    text="검색"
                />
                <CommonButton small light onClick={onReset}>
                    초기화
                </CommonButton>
            </InputWrapper>
        </Form>
    );
}

export default SuppliersSearchForm;
