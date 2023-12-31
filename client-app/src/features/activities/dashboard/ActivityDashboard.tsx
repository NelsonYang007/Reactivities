import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props{
    activities : Activity[];
    selectedActivity : Activity | undefined;
    selectActivity : (id:string) => void;
    cancelSelectActivity : () => void;
    editMode : boolean;
    openForm : (id: string) => void;
    closeForm : () => void;
    createOrEdit : (activity : Activity) => void;
    deleteActivity : (id : string) => void;
    submitting : boolean;
}

//function AD(props : Props), this way is destructuring the properties with interface, Props that contained activity array(models)
//function AD({activities} : Props) , this way is an alternative way of destructuring with {activities} to pass properties down to AD.
export default function ActivityDashboard({activities, selectedActivity,selectActivity,
                    cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting} : Props){ 
    return(
        <Grid>
            <Grid.Column width='10'>
                {/* <List>
                {activities.map(activity => (
                    <List.Item key={activity.id}>
                        {activity.title}
                    </List.Item>
                ))}
                </List> */}
                <ActivityList activities={activities} 
                  selectActivity={selectActivity} deleteActivity={deleteActivity} submitting = {submitting}></ActivityList>
            </Grid.Column>
            <Grid.Column width='6'>
                {/* {activities[0] && 
                <ActivityDetails activity={activities[0]}></ActivityDetails>}  */}
                {/* && is continue working if this is not null or defined by something */}
                {selectedActivity && !editMode &&
                <ActivityDetails activity={selectedActivity} 
                    cancelSelectActivity={cancelSelectActivity}
                    openForm = {openForm}></ActivityDetails>}
                {editMode &&  
                <ActivityForm closeForm ={closeForm} activity = {selectedActivity} createOrEdit = {createOrEdit} submitting = {submitting}></ActivityForm>}
            </Grid.Column>
        </Grid>
    )
}