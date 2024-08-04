import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';
import { Fragment } from 'react';

// interface Props{
//     activities : Activity[];
//     //selectActivity : (id:string) => void;
//     deleteActivity : (id : string) => void;
//     submitting : boolean;
// }

export default observer(function ActivityList(){
    const {activityStore} = useStore();
    //const {activitiesByDate} = activityStore;
    const {groupedActivities} = activityStore;
    // const [target, setTarget] = useState('');


    // function handleActivityDelete(e : SyntheticEvent<HTMLButtonElement>, id : string){
    //     setTarget(e.currentTarget.name);
    //     deleteActivity(id);
    // }

    

    return(
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                        {activities.map(activity => (
                            // <Item key={activity.id}>
                            //     <Item.Content>
                            //         <Item.Header as='a'>{activity.title}</Item.Header>
                            //         <Item.Meta>{activity.date}</Item.Meta>
                            //         <Item.Description> 
                            //             <div>{activity.description}</div>
                            //             <div>{activity.city}, {activity.venue}</div>
                            //         </Item.Description>
                            //         <Item.Extra>
                            //             {/* <Button onClick={() => activityStore.selectActivity(activity.id)} floated='right' content='view' color='blue'></Button> */}
                            //             <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='view' color='blue'></Button>
                            //             <Button name={activity.id} loading={loading && target === activity.id} onClick={(e) => handleActivityDelete(e,activity.id)} floated='right' content='delete' color='red'></Button>
                            //             <Label basic content={activity.category}></Label>
                            //         </Item.Extra>
                            //     </Item.Content>
                            // </Item>
                            <ActivityListItem key={activity.id} activity={activity} />
                        ))}
                </Fragment>
            ))}
        </>
       
    )
})