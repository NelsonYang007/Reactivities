//import React from "react";
import { Grid } from "semantic-ui-react";
//import { Activity } from "../../../app/models/activity";
// import ActivityDetails from "../details/ActivityDetails";
// import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";

// interface Props{
//     activities : Activity[];
//     // selectedActivity : Activity | undefined;
//     // selectActivity : (id:string) => void;
//     // cancelSelectActivity : () => void;
//     // editMode : boolean;
//     // openForm : (id: string) => void;
//     // closeForm : () => void;
//     //createOrEdit : (activity : Activity) => void;
//     deleteActivity : (id : string) => void;
//     submitting : boolean;
// }

//function AD(props : Props), this way is destructuring the properties with interface, Props that contained activity array(models)
//function AD({activities} : Props) , this way is an alternative way of destructuring with {activities} to pass properties down to AD.
export default observer (function ActivityDashboard(){ 

    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;
    //const {selectedActivity, editMode} = activityStore;

    useEffect(()=>{
       if(activityRegistry.size <= 1) loadActivities(); // only load activities if there are no activities in the registry
      }, [loadActivities]);

    if(activityStore.loadingInitial) return <LoadingComponent content='Loading activities....'></LoadingComponent>
    
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
                {/* <ActivityList activities={activities} deleteActivity={deleteActivity} submitting = {submitting}></ActivityList> */}

                <ActivityList></ActivityList>
            </Grid.Column>
            <Grid.Column width='6'>
                {/* {activities[0] && 
                <ActivityDetails activity={activities[0]}></ActivityDetails>}  */}
                {/* && is continue working if this is not null or defined by something */}
                {/* {selectedActivity && !editMode &&
                <ActivityDetails></ActivityDetails>}
                {editMode &&  
                <ActivityForm></ActivityForm>} */}
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
})