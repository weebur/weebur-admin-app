import { useFormik } from 'formik';
import Input from '../Form/Input';
import SubmitButton from '../Form/SubmitButton';
import CommonButton from '../Button';
import { Form, InputWrapper } from './styles';

function AdminsSearchForm({ initialValues = {}, onSubmit, onReset }) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit,
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <InputWrapper>
                <Input
                    name="name"
                    label="이름"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <Input
                    name="email"
                    label="이메일"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
            </InputWrapper>

            <InputWrapper>
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

export default AdminsSearchForm;
