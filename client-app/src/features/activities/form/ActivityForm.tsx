import {useEffect, useState} from 'react'
import { Button, Header, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { v4 as uuid } from 'uuid';

interface Props{
    //activity : Activity | undefined;
    //closeForm : () => void;
    createOrEdit : (activity : Activity) => void;
    submitting : boolean;
}

export default observer(function ActivityForm(){
    const {activityStore} = useStore();
    //const {selectedActivity,closeForm, createActivity, updateActivity, loading} = activityStore;
    const {selectedActivity, createActivity, updateActivity, 
        loading, loadActivity, loadingInitial} = activityStore;
    
    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    })
    
    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required('The category is required'),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    // const initialState =  selectedActivity ?? {
    //     id: '',
    //     title: '',
    //     category: '',
    //     description: '',
    //     date: '',
    //     city: '',
    //     venue: ''
    // }
    //const [activity, setActivity] = useState(initialState);

    useEffect(()=>{
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);

    function handleFormSubmit(activity : Activity){
        //console.log(activity);
        //createOrEdit(activity);
        if(!activity.id){
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }else{
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
        // activity.id ? updateActivity(activity) : createActivity(activity);
    }

    // function handleInputChange(event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    //     const {name, value} = event.target;
    //     setActivity({...activity, [name]: value})
    // }

    if(loadingInitial) return <LoadingComponent content='Loading Activity...'></LoadingComponent>

    return(
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema} 
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder='Title' name='title'/>
                        <MyTextArea rows={3} placeholder='Description' name='description'/>
                        <MySelectInput placeholder='Category' options={categoryOptions}  name='category'/>
                        {/* <MyTextInput placeholder='Date' name='date'/> */}
                        <MyDateInput 
                           placeholderText='Date' 
                           name='date' 
                           showTimeSelect 
                           timeCaption='time select' 
                           dateFormat='MMMM d, yyyy h:mm aa' 
                        />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder='City' name='city'/>
                        <MyTextInput placeholder='Venue' name='venue'/>
                        <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit'></Button>
                        {/* <Button onClick={closeForm} floated='right' type='button' content='Cancel'></Button> */}
                        <Button as={Link} to={`/activities`} floated='right' type='button' content='Cancel'></Button>
                    </Form>
                )}
            </Formik>
            
        </Segment>
    )
})