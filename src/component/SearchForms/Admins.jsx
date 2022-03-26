import { useFormik } from 'formik';
import Input from '../Form/Input';
import SubmitButton from '../Form/SubmitButton';
import CommonButton from '../Button';
import { Form, InputWrapper } from './styles';
import SearchButtons from '../Button/SearchButtons';

function AdminsSearchForm({ initialValues = {}, onSubmit, onReset }) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit,
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <InputWrapper>
                <Input name="name" label="이름" onChange={formik.handleChange} value={formik.values.name} />
                <Input name="email" label="이메일" onChange={formik.handleChange} value={formik.values.email} />
            </InputWrapper>

            <InputWrapper centered>
                <SearchButtons disabled={!formik.dirty} onReset={onReset} />
            </InputWrapper>
        </Form>
    );
}

export default AdminsSearchForm;
