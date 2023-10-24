import React, { Fragment, useEffect, useState } from 'react';
//import axios from 'axios';
import { Container } from 'semantic-ui-react';
//import List from 'semantic-ui-react/dist/commonjs/elements/List';
//import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuidv4 } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
// import { ducks } from './demo';
// import DuckItem from './DuckItem';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // useEffect(()=>{
  //   axios.get<Activity[]>('http://localhost:5014/api/activities')
  //   .then(reponse=>{
  //     setActivities(reponse.data);
  //   })
  // }, [])

  useEffect(()=>{
    agent.Activities.list().then(reponse=>{
      let activities : Activity[] = [];
      reponse.forEach(activity=>{
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
    })
  }, [])

  function handleSelectActivity(id:string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id? : string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity : Activity){
    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      activity.id = uuidv4();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    // activity.id ? 
    // setActivities([...activities.filter(x => x.id !== activity.id), activity]) :
    // setActivities([...activities, {...activity, id: uuidv4()}]);
    // setEditMode(false);
    // setSelectedActivity(activity);
  }

  function handleDeleteActivity(id : string){
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
    
  }

  if(loading) return <LoadingComponent content='Loading app...'></LoadingComponent>

  return (
    <>
      {/* <Header as='h2' icon='users' content='Reactivities'></Header> */}
      <NavBar openForm = {handleFormOpen}></NavBar>
      <Container style={{marginTop : '7em'}}>
        {/* {ducks.map(duck => (
          <DuckItem  duck={duck} key={duck.name}/>
        ))} */}
         <ActivityDashboard 
         activities={activities}
         selectedActivity = {selectedActivity}
         selectActivity = {handleSelectActivity}
         cancelSelectActivity = {handleCancelSelectActivity}
         editMode = {editMode}
         openForm = {handleFormOpen}
         closeForm = {handleFormClose}
         createOrEdit = {handleCreateOrEditActivity}
         deleteActivity = {handleDeleteActivity}
         submitting = {submitting}
        />
        </Container>
    </>
  );
}

export default App;
