import { ErrorMessage, Formik } from "formik";
import { Button, Form, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm() {
    const {userStore} = useStore();
    return (
        <Formik 
        initialValues={{email: '', password: '', error: null}} 
        onSubmit={(values,{setErrors}) => userStore.login(values).catch(() => 
            setErrors({error: 'Invalid email or password'}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Header content='Login to Reactivities' color='teal' as='h2' textAlign='center' />
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password" type='password' />
                    <ErrorMessage
                        name="error" render={() => 
                        <Label style={{marginBottom: 10}} basic color="red" content={errors.error} />}
                    />
                    <Button loading={isSubmitting} type="submit" content="Login" positive fluid />
                </Form>
            )}
        </Formik>
    );
})