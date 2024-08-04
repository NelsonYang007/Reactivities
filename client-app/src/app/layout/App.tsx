import React, { Fragment, useEffect, useState } from 'react';
//import axios from 'axios';
import { Container } from 'semantic-ui-react';
//import List from 'semantic-ui-react/dist/commonjs/elements/List';
//import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
//import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
//import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import ModalContainer from '../common/modals/ModalContainer';
// import { ducks } from './demo';
// import DuckItem from './DuckItem';

function App() {
   //Move to activityDashboard
  //const {activityStore} = useStore();

  //const [activities, setActivities] = useState<Activity[]>([]);
  // const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  // const [editMode, setEditMode] = useState(false);
  //const [loading, setLoading] = useState(true);
  //const [submitting, setSubmitting] = useState(false);

  /* Using axios instead of fetch  */
  // useEffect(()=>{
  //   axios.get<Activity[]>('http://localhost:5014/api/activities')
  //   .then(reponse=>{
  //     setActivities(reponse.data);
  //   })
  // }, [])
  
  
// Fetch activities from the API and update state
// useEffect(() => {
  // Make an API call to retrieve activities
  // agent.Activities.list().then(response => {
    // Initialize an array to store the activities
    // let activities: Activity[] = [];

    // Iterate through each activity in the response
    // response.forEach(activity => {
      // Extract the date from the activity and remove the time component
      // activity.date = activity.date.split('T')[0];

      // Add the modified activity to the activities array
      // activities.push(activity);
    // });

    // Update the state with the activities array
    // setActivities(activities);

    // Set loading to false to indicate that the data has been fetched
    // setLoading(false);
  // });
// }, []);

/**
 * useEffect hook that loads activities when the activityStore changes.
 */
  //Move to activityDashboard
  // useEffect(()=>{
  //   activityStore.loadActivities();
  // }, [activityStore]);

  // function handleSelectActivity(id:string){
  //   setSelectedActivity(activities.find(x => x.id === id));
  // }

  // function handleCancelSelectActivity() {
  //   setSelectedActivity(undefined);
  // }

  // function handleFormOpen(id? : string){
  //   id ? handleSelectActivity(id) : handleCancelSelectActivity();
  //   setEditMode(true);
  // }

  // function handleFormClose(){
  //   setEditMode(false);
  // }

  // function handleCreateOrEditActivity(activity : Activity){
  //   setSubmitting(true);
  //   if(activity.id){
  //     agent.Activities.update(activity).then(()=>{
  //       setActivities([...activities.filter(x => x.id !== activity.id), activity]);
  //       setSelectedActivity(activity);
  //       setEditMode(false);
  //       setSubmitting(false);
  //     })
  //   } else {
  //     activity.id = uuidv4();
  //     agent.Activities.create(activity).then(()=>{
  //       setActivities([...activities, activity]);
  //       setSelectedActivity(activity);
  //       setEditMode(false);
  //       setSubmitting(false);
  //     })
  //   }
  //   // activity.id ? 
  //   // setActivities([...activities.filter(x => x.id !== activity.id), activity]) :
  //   // setActivities([...activities, {...activity, id: uuidv4()}]);
  //   // setEditMode(false);
  //   // setSelectedActivity(activity);
  // }

  // function handleDeleteActivity(id : string){
  //   setSubmitting(true);
  //   agent.Activities.delete(id).then(()=>{
  //     setActivities([...activities.filter(x => x.id !== id)]);
  //     setSubmitting(false);
  //   })
    
  // }

  //if(loading) return <LoadingComponent content='Loading app...'></LoadingComponent>

   //Move to activityDashboard
  //if(activityStore.loadingInitial) return <LoadingComponent content='Loading app'></LoadingComponent>

  const location = useLocation();
  const {commonStore, userStore} = useStore(); // get commonStore and userStore from useStore

  // Load user and activity data when the app is loaded
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading app...'></LoadingComponent>

  return (
    <>
      <ModalContainer />
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {location.pathname === '/' ? <HomePage/> : (
        <>
          <NavBar></NavBar>
          <Container style={{marginTop : '7em'}}>
            <Outlet />
          </Container>
        </>
      )}
      {/* <Header as='h2' icon='users' content='Reactivities'></Header> */}
      {/* <NavBar openForm = {handleFormOpen}></NavBar> */}
      {/* <NavBar></NavBar> */}
      {/* <Container style={{marginTop : '7em'}}> */}
        {/* <h2>{activityStore.title}</h2>
        <Button content='Add Exclmation!' positive onClick={activityStore.setTitle}></Button> */}
        {/* {ducks.map(duck => (
          <DuckItem  duck={duck} key={duck.name}/>
        ))} */}
        {/* <Outlet /> */}
         {/* <ActivityDashboard 
        //  activities={activities}
         //activities = {activityStore.activities}
         //selectedActivity = {selectedActivity}
         //selectActivity = {handleSelectActivity}
         //cancelSelectActivity = {handleCancelSelectActivity}
         //editMode = {editMode}
         //openForm = {handleFormOpen}
         //closeForm = {handleFormClose}
         //createOrEdit = {handleCreateOrEditActivity}
         //deleteActivity = {handleDeleteActivity}
         //submitting = {submitting}
        /> */}
        {/* </Container> */}
    </>
  );
}

//Higher order function return app component which is observervable in our stores
export default observer(App);
