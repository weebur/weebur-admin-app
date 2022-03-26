import { useFormik } from 'formik';
import Input from '../Form/Input';
import SubmitButton from '../Form/SubmitButton';
import CommonButton from '../Button';
import SelectBox from '../Form/SelectBox';
import { productTypes } from '../../constants/product';
import { Form, InputWrapper } from './styles';
import SearchButtons from '../Button/SearchButtons';

function ProductSearchForm({ initialValues = {}, onSubmit, onReset }) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit,
    });

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
                <Input
                    allowClear
                    name="supplierName"
                    label="업체명"
                    onChange={formik.handleChange}
                    value={formik.values.supplierName}
                />
                <Input
                    name="name"
                    label="상품명"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    autoComplete="new-password"
                />
            </InputWrapper>

            <InputWrapper centered>
                <SearchButtons disabled={!formik.dirty} onReset={onReset} />
            </InputWrapper>
        </Form>
    );
}

export default ProductSearchForm;
