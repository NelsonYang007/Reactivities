//import React from "react";
import { Grid, Loader } from "semantic-ui-react";
//import { Activity } from "../../../app/models/activity";
// import ActivityDetails from "../details/ActivityDetails";
// import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import ActivityFilters from "./ActivityFilters";
//import { PagingParams } from "../../../app/models/pagination";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";

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
    const [loadingNext] = useState(false);

    // function handleGetNext(){
    //     setLoadingNext(true);
    //     setPagingParams(new PagingParams(pagination!.currentPage + 1));
    //     loadActivities().then(() => setLoadingNext(false));
    // }

    useEffect(()=>{
       if(activityRegistry.size <= 1) loadActivities(); // only load activities if there are no activities in the registry
      }, [loadActivities, activityRegistry.size]);

    //if(activityStore.loadingInitial && !loadingNext) return <LoadingComponent content='Loading activities....'></LoadingComponent>
    
    return(
        <Grid>
            <Grid.Column width='10'>
                {activityStore.loadingInitial && activityRegistry.size === 0 && !loadingNext ? (
                    <>
                        <ActivityListItemPlaceholder />
                        <ActivityListItemPlaceholder />
                    </>
                ) : (
                    //Move infinite scroll to here
                    // <InfiniteScroll 
                    //     pageStart={0} 
                    //     loadMore={handleGetNext} 
                    //     hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages} 
                    //     initialLoad={false} >
                    
                    // </InfiniteScroll>
                    <ActivityList />
                )}
                {/* <List>
                {activities.map(activity => (
                    <List.Item key={activity.id}>
                        {activity.title}
                    </List.Item>
                ))}
                </List> */}
                {/* <ActivityList activities={activities} deleteActivity={deleteActivity} submitting = {submitting}></ActivityList> */}
                
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
            <Grid.Column width={10}>
                <Loader active={loadingNext}></Loader>
            </Grid.Column>
        </Grid>
    )
})