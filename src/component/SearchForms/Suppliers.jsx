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
                    label="????????????"
                    onChange={formik.setFieldValue}
                    value={formik.values.active}
                    options={[
                        { key: 'true', label: '?????????' },
                        { key: 'false', label: '?????????' },
                    ]}
                />
                <SelectBox
                    allowClear
                    name="type"
                    label="??????"
                    onChange={formik.setFieldValue}
                    value={formik.values.type}
                    options={Object.values(supplierTypes)}
                />
            </InputWrapper>

            <InputWrapper>
                <AsyncSelectBox
                    allowClear
                    name="product"
                    label="?????????"
                    onChange={formik.setFieldValue}
                    value={formik.values.product}
                    fetchOptions={fetchProductOptions}
                    initialOptions={productOptions}
                />
                <Input
                    name="name"
                    label="?????????"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    autoComplete="new-password"
                />
            </InputWrapper>

            <InputWrapper>
                <AsyncSelectBox
                    allowClear
                    name="teacher"
                    label="?????????"
                    onChange={formik.setFieldValue}
                    value={formik.values.teacher}
                    fetchOptions={fetchTeacherOptions}
                    initialOptions={teacherOptions}
                />
                <Input
                    name="teacherMobile"
                    label="???????????????"
                    onChange={formik.handleChange}
                    value={formik.values.teacherMobile}
                />
                <Input
                    name="teacherEmail"
                    label="???????????????"
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
