import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
//import List from 'semantic-ui-react/dist/commonjs/elements/List';
//import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuidv4 } from 'uuid';
// import { ducks } from './demo';
// import DuckItem from './DuckItem';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5014/api/activities')
    .then(reponse=>{
      setActivities(reponse.data);
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
    activity.id ? 
    setActivities([...activities.filter(x => x.id !== activity.id), activity]) :
    setActivities([...activities, {...activity, id: uuidv4()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id : string){
    setActivities([...activities.filter(x => x.id !== id)]);
  }

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
        />
        </Container>
    </>
  );
}

export default App;
