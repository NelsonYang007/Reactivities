import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import {format} from 'date-fns';
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface Props{
    activity : Activity;
}

export default function ActivityListItem({activity} : Props){
    //const {activityStore} = useStore();
    //const {deleteActivity, activitiesByDate, loading} = activityStore;
    //const [target, setTarget] = useState('');

    //Need to move outside of this function component if we want to use it.
    // function handleActivityDelete(e : SyntheticEvent<HTMLButtonElement>, id : string){
    //     setTarget(e.currentTarget.name);
    //     deleteActivity(id);
    // }

    // const handleActivityDelete = (e : SyntheticEvent<HTMLButtonElement>, id : string) => {
    //     setTarget(e.currentTarget.name);
    //     deleteActivity(id);
    // };
    
    return (
        <Segment.Group>
            <Segment>
                {
                    activity.isCancelled && 
                        <Label
                            attached='top'
                            color='red'
                            content='Cancelled'
                            style={{textAlign: 'center'}}
                        />
                    
                }
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' style={{marginBottom: 3}} circular 
                            src={activity.host?.image || '/assets/user.png'} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}> 
                                {activity.title} 
                            </Item.Header>
                            <Item.Description as='a'>Hosted by <Link to={`/profile/${activity.host?.username}`}> {activity.host?.displayName} </Link> </Item.Description>
                            {activity.isHost && (
                                <Item.Description>
                                    <Label basic color='orange'>
                                        You are hosting this activity
                                    </Label>
                                </Item.Description>
                            )}
                            {activity.isGoing && !activity.isHost && (
                                <Item.Description>
                                    <Label basic color='green'>
                                        You are going to this activity
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker'/> {activity.venue}
                </span>
            </Segment> 
            <Segment secondary>
                <ActivityListItemAttendee attendees={activity.attendees!} />
            </Segment>
            <Segment clearing>
                <span>
                    {activity.description}
                </span>
                <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='teal'/>    
            </Segment>   
        </Segment.Group>
    )
}