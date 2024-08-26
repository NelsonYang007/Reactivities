import { Button, Container, Dropdown, DropdownItem, DropdownMenu, Image, Menu, MenuItem } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { Link, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

// interface Props{
//     openForm : () => void;
// }

//export default function NavBar({openForm} : Props){

export default observer(function NavBar(){

    //const {activityStore} = useStore();
    const {userStore: {user, logout}} = useStore();

    return(
        <Menu inverted fixed='top'>
            <Container>
                <MenuItem as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt='' style={{marginRight: '10px'}}></img>
                    Reactivities
                </MenuItem>
                <MenuItem as={NavLink} to='/activities' name='Activities'></MenuItem>
                <MenuItem as={NavLink} to='/errors' name='Errors'></MenuItem>
                <MenuItem>
                    {/* <Button onClick={() => activityStore.openForm()} positive content='Create Activity' /> */}
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
                </MenuItem>
                {/* <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <DropdownItem as={Link} to={`/profile/${user?.userName}`} text='My profile' icon='user' />
                        <DropdownItem onClick={logout} text='Logout' icon='power' />
                    </Dropdown>
                </Menu.Item> */}
                <Menu.Item position='right'>
                <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                <Dropdown pointing='top left' text={user?.displayName}>
                    <DropdownMenu>
                        <DropdownItem as={Link} to={`/profiles/${user?.username}`} text='My profile' icon='user' />
                        <DropdownItem onClick={logout} text='Logout' icon='power' />
                    </DropdownMenu>
                </Dropdown>
            </Menu.Item>
            </Container>
        </Menu>
    )
})