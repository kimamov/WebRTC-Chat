import React from 'react'
import { Modal, createStyles, Theme, makeStyles, Typography } from '@material-ui/core';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }),
);


interface Props {

}


const ChatAppLoading = (props: Props) => {
    const classes = useStyles();
    return (
        <Modal
            open
            className={classes.modal}
            disableEnforceFocus
            disableAutoFocus
            aria-labelledby="chat loading modal"
            aria-describedby="currently creating your chat connection"
        >
            <Typography>
                LOADING :)
            </Typography>
        </Modal>
    )
}

export default ChatAppLoading
