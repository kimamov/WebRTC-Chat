import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Avatar, Typography } from '@material-ui/core';

interface Props {
    activeUserList: {id: string, username: string}[]
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },

    }),
);

export default function ContactDrawer({activeUserList}: Props) {
    // todo switch this to and extendable drawer that overlaps the header
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                {activeUserList.length?
                    <List>
                        {activeUserList.map((activeUser) => (
                            <ListItem button key={activeUser.id+'_'+Date.now()}>
                                <ListItemIcon>
                                    <Avatar/>
                                </ListItemIcon>
                                <ListItemText primary={activeUser.username} />
                            </ListItem>
                        ))}
                    </List>
                    :
                    <Typography>
                        Noone online... 
                    </Typography>
                }
                
            </div>
        </Drawer>
    );
}