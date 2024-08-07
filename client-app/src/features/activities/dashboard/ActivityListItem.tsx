import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import {format} from 'date-fns';

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
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}> 
                                {activity.title} 
                            </Item.Header>
                            <Item.Description as='a'>Hosted by Bob</Item.Description>
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
                Attendes go here
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