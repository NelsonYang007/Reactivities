import React from 'react';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';

interface Props{
    openForm : () => void;
}

export default function NavBar({openForm} : Props){

    return(
        <Menu inverted fixed='top'>
            <Container>
                <MenuItem header>
                    <img src="/assets/logo.png" alt='' style={{marginRight: '10px'}}></img>
                    Reactivities
                </MenuItem>
                <MenuItem name='Activities'></MenuItem>
                <MenuItem>
                    <Button onClick={openForm} positive content='Create Activity' />
                </MenuItem>
            </Container>
        </Menu>
    )
}