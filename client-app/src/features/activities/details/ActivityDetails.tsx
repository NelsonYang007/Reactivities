import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSideBar from './ActivityDetailedSideBar';

interface Props{
    //activity : Activity;
    cancelSelectActivity : () => void;
    openForm : (id : string) => void;
}
//In this component, ActDetails, activity model is only passed as a single [0] one object.
//export default function ActivityDetails({activity,cancelSelectActivity,openForm} : Props){
export default observer(function ActivityDetails(){
    const {activityStore} = useStore();
    //const {selectedActivity: activity, openForm, cancelSelectedActivity} = activityStore;
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams()

    useEffect(() => {
        if(id) loadActivity(id);
    }, [id, loadActivity]);

    if(loadingInitial || !activity){
        return <LoadingComponent/>;
    }

    return(
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat activityId={activity.id} />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSideBar attendees={activity.attendees!} />
            </Grid.Column>
        </Grid>
        // <Card fluid>
        //     <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
        //     <Card.Content>
        //     <Card.Header>{activity.title}</Card.Header>
        //     <Card.Meta>
        //         <span>{activity.date}</span>
        //     </Card.Meta>
        //     <Card.Description>
        //         {activity.description}
        //     </Card.Description>
        //     </Card.Content>
        //     <Card.Content extra>
        //         <Button.Group widths='2'>
        //             {/* <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit'></Button> */}
        //             <Button as={Link} to={`/manage/${activity.id}`} basic color='blue' content='Edit'></Button>
        //             {/* <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel'></Button> */}
        //             <Button as={Link} to={'/activities'} basic color='grey' content='Cancel'></Button>
        //         </Button.Group>
        //     </Card.Content>
        // </Card>

    )
})   