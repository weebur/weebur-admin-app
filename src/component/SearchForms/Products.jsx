import { useFormik } from 'formik';
import Input from '../Form/Input';
import SubmitButton from '../Form/SubmitButton';
import CommonButton from '../Button';
import SelectBox from '../Form/SelectBox';
import { productTypes } from '../../constants/product';
import AsyncSelectBox from '../Form/AsyncSelectBox';
import { useEffect, useState } from 'react';
import { Form, InputWrapper } from './styles';
import { fetchTeacher, fetchTeachers } from '../../api/TeacherAPI';
import { fetchSupplier, fetchSuppliers } from '../../api/SupplierAPI';

function SuppliersSearchForm({ initialValues = {}, onSubmit, onReset }) {
    const [supplierOptions, setSupplierOptions] = useState([]);
    const [teacherOptions, setTeacherOptions] = useState([]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit,
    });

    const fetchProductOptions = async (name) => {
        try {
            const suppliers = await fetchSuppliers({
                page: 0,
                limit: 10,
                name,
            });
            return suppliers.result.map((supplier) => ({
                label: supplier.name,
                value: supplier._id,
                key: supplier._id,
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
        if (formik.values.supplier) {
            fetchSupplier(formik.values.supplier)
                .then((supplier) =>
                    setSupplierOptions([
                        {
                            label: supplier.name,
                            value: supplier._id,
                            key: supplier._id,
                        },
                    ]),
                )
                .catch(() => setSupplierOptions([]));
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
                    options={Object.values(productTypes)}
                />
            </InputWrapper>

            <InputWrapper>
                <AsyncSelectBox
                    allowClear
                    name="supplier"
                    label="업체명"
                    onChange={formik.setFieldValue}
                    value={formik.values.supplier}
                    fetchOptions={fetchProductOptions}
                    initialOptions={supplierOptions}
                />
                <Input
                    name="name"
                    label="상품명"
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
                <SubmitButton
                    disabled={!formik.dirty}
                    small
                    primary
                    text="검색"
                />
                <CommonButton
                    small
                    light
                    onClick={() => {
                        formik.setValues(initialValues);
                        onReset && onReset();
                    }}
                >
                    초기화
                </CommonButton>
            </InputWrapper>
        </Form>
    );
}

export default SuppliersSearchForm;
