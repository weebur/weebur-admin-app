import { useFormik } from 'formik';
import Input from '../Form/Input';
import { companyCategories, companySectors } from '../../constants/company';
import SelectBox from '../Form/SelectBox';
import RangePicker from '../Form/DatePicker/RangePicker';
import { Form, InputWrapper } from './styles';
import SearchButtons from '../Button/SearchButtons';
import { toBusinessId, toBusinessIdString } from '../../utils/text';

function CompaniesSearchForm({ initialValues = {}, onSubmit, onReset }) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit,
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <InputWrapper>
                <RangePicker
                    label="등록일"
                    onChange={formik.setFieldValue}
                    from={formik.values.from}
                    to={formik.values.to}
                />
            </InputWrapper>
            <InputWrapper>
                <Input name="name" label="이름" onChange={formik.handleChange} value={formik.values.name} />
                <SelectBox
                    allowClear
                    name="category"
                    label="분류"
                    onChange={formik.setFieldValue}
                    value={formik.values.category}
                    options={Object.values(companyCategories)}
                />
            </InputWrapper>
            <InputWrapper>
                <Input
                    label="사업자등록번호"
                    name="businessId"
                    value={toBusinessId(formik.values.businessId || '')}
                    onChange={(e) => {
                        e.target.value = toBusinessIdString(e.target.value);
                        formik.handleChange(e);
                    }}
                    placeholder={'000-00-00000'}
                />
                <SelectBox
                    allowClear
                    name="sector"
                    label="산업구분"
                    onChange={formik.setFieldValue}
                    value={formik.values.sector}
                    options={Object.values(companySectors)}
                />
            </InputWrapper>
            <InputWrapper centered>
                <SearchButtons disabled={!formik.dirty} onReset={onReset} />
            </InputWrapper>
        </Form>
    );
}

export default CompaniesSearchForm;
