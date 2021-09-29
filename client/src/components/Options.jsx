import { useContext, useState } from 'react'
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    gridContainer: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        },
    },
    container: {
        width: '600px',
        margin: '35px 0',
        padding: 0,
        [theme.breakpoints.down('xs')]: {
        width: '80%',
        },
    },
    margin: {
        marginTop: 20,
    },
    padding: {
        padding: 20,
    },
    paper: {
        padding: '10px 20px',
        border: '2px solid black',
    },
    }));

const Options = ({ children }) => {
    
    const { me, name, setName, callUser, callAccepted, leaveCall, callEnded } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    const classes = useStyles();

    return (

        <>
            <Container className={classes.container}> 
                <Paper elevation={10} className={classes.paper}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <Grid container className={classes.gridContainer}>
                            <Grid item xs={12} md={6} className={classes.padding}>
                                <Typography gutterBottom variant="h5">Account Info</Typography>
                                <TextField label="name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                                {console.log('me:',me)}
                                <CopyToClipboard text={me} className={classes.margin}>
                                    <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                                        Copy your ID
                                    </Button>
                                </CopyToClipboard>
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.padding}>
                                <Typography gutterBottom variant="h5">Make a call</Typography>
                                <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
                                {/* The button varies as per the status of the call */}
                                {callAccepted && !callEnded ? (
                                    <Button variant="contained" color="secondary" fullWidth startIcon={<PhoneDisabled fontSize="large" />} className={classes.margin} onClick={leaveCall} >
                                        Hang up
                                    </Button>
                                ):(
                                    <Button variant="contained" color="primary" fullWidth startIcon={<Phone fontSize="large" />} className={classes.margin} onClick={() => callUser(idToCall)} 
                                        // ->() is used so the callback() gets triggerred only after clicking the button, else the callback will be invoked-
                                        //- on component load as JS will find it as a function call
                                    >
                                        Call
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
                { children }
            </Container>
        </>
    )
}

export default Options
