import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
// import { ducks } from './demo';
// import DuckItem from './DuckItem';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5014/api/activities')
    .then(reponse=>{
      setActivities(reponse.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities'></Header>
      
        {/* {ducks.map(duck => (
          <DuckItem  duck={duck} key={duck.name}/>
        ))} */}
        <List>
          {activities.map((activity: any) => (
            <List.Item key={activity.id}>
                {activity.title}
            </List.Item>
          ))}
        </List>
        <Button content='text'></Button>
    </div>
  );
}

export default App;
