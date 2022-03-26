import { useFormik } from 'formik';
import Input from '../Form/Input';
import SelectBox from '../Form/SelectBox';
import { supplierTypes } from '../../constants/supplier';
import AsyncSelectBox from '../Form/AsyncSelectBox';
import { useEffect, useState } from 'react';
import { fetchProduct, fetchProducts } from '../../api/ProductAPI';
import { Form, InputWrapper } from './styles';
import { fetchTeacher, fetchTeachers } from '../../api/TeacherAPI';
import SearchButtons from '../Button/SearchButtons';

function SuppliersSearchForm({ initialValues = {}, onSubmit, onReset }) {
    const [productOptions, setProductOptions] = useState([]);
    const [teacherOptions, setTeacherOptions] = useState([]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit,
    });

    const fetchProductOptions = async (name) => {
        try {
            const products = await fetchProducts({ page: 0, limit: 10, name });
            return products.result.map((product) => ({
                label: product.name,
                value: product._id,
                key: product._id,
            }));
        } catch (err) {
            return [];
        }
    };

    const fetchTeacherOptions = async (name) => {
        try {
            const teachers = await fetchTeachers({ page: 0, limit: 10, name });
            return teachers.result.map((teacher) => ({
                label: teacher.name,
                value: teacher._id,
                key: teacher._id,
            }));
        } catch (err) {
            return [];
        }
    };

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
        if (formik.values.teacher) {
            fetchTeacher(formik.values.teacher)
                .then((teacher) =>
                    setTeacherOptions([
                        {
                            label: teacher.name,
                            value: teacher._id,
                            key: teacher._id,
                        },
                    ]),
                )
                .catch(() => setTeacherOptions([]));
        }
    }, []);

    return (
        <Form width={600} onSubmit={formik.handleSubmit}>
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
                    allowClear
                    name="product"
                    label="상품명"
                    onChange={formik.setFieldValue}
                    value={formik.values.product}
                    fetchOptions={fetchProductOptions}
                    initialOptions={productOptions}
                />
                <Input
                    name="name"
                    label="업체명"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    autoComplete="new-password"
                />
            </InputWrapper>

            <InputWrapper>
                <AsyncSelectBox
                    allowClear
                    name="teacher"
                    label="강사명"
                    onChange={formik.setFieldValue}
                    value={formik.values.teacher}
                    fetchOptions={fetchTeacherOptions}
                    initialOptions={teacherOptions}
                />
                <Input
                    name="teacherMobile"
                    label="강사모바일"
                    onChange={formik.handleChange}
                    value={formik.values.teacherMobile}
                />
                <Input
                    name="teacherEmail"
                    label="강사이메일"
                    onChange={formik.handleChange}
                    value={formik.values.teacherEmail}
                />
            </InputWrapper>

            <InputWrapper centered>
                <SearchButtons disabled={!formik.dirty} onReset={onReset} />
            </InputWrapper>
        </Form>
    );
}

export default SuppliersSearchForm;
