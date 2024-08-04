import { ErrorMessage, Formik } from "formik";
import { Button, Form, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import ValidationError from "../errors/ValidationError";

export default observer(function RegisterForm() {
    const {userStore} = useStore();
    return (
        <Formik 
        initialValues={{displayName: '', userName:'', email: '', password: '', error: null}} 
        onSubmit={(values,{setErrors}) => userStore.register(values).catch(error => 
            setErrors({error}))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                userName: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header content='Sign Up to Reactivities' color='teal' as='h2' textAlign='center' />
                    <MyTextInput name="displayName" placeholder="Display Nmae" />
                    <MyTextInput name="userName" placeholder="Username" />
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password" type='password' />
                    <ErrorMessage
                        name="error" render={() => 
                        // <Label style={{marginBottom: 10}} basic color="red" content={errors.error} />}
                        <ValidationError errors={errors.error as unknown as string[]} />}
                    />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting} 
                        loading={isSubmitting} 
                        type="submit" 
                        content="Register" positive fluid />
                </Form>
            )}
        </Formik>
    );
})