import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from 'react';

import { SocketContext } from '../SocketContext'

const videoPlayerStyles = makeStyles(theme => ({
    video:{
        width: '550px',
        [theme.breakpoints.down('xs')]: {
            width: '300px',
        },
    },
    gridContainer:{
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    paper:{
        padding: '10px',
        margin: '10px',
        border: '2px solid #000'
    }
}));

const VideoPlayer = () => {

    const { name, call, callAccepted, videoSrc, callerVideo, callEnded, stream } = useContext(SocketContext);

    const classes = videoPlayerStyles();

    return (
        <Grid container className={classes.gridContainer}>
            {/* Video of the caller from this end */}
            {stream && ( // Display the video of/from the current machine, only if a stream is available, as it's not possible
                    <Paper className={classes.paper}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom>{ name || 'Name' }</Typography>
                            <video playsInline muted ref={videoSrc} autoPlay className={classes.video} />
                            {/* muted => muting the video on the current machine, and not the caller's video 
                                the ref used here is the main connection between the stream and video component*/}
                        </Grid>
                    </Paper>
            )}
            {/* Video of the other user */}
            {callAccepted && !callEnded && (
                    <Paper className={classes.paper}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom>{call.namr || 'Caller Name'}'</Typography>
                            <video playsinline ref={callerVideo} autoplay className={classes.video} />
                            {/* muted => muting the video on the current machine, and not the caller's video */}
                        </Grid>
                    </Paper>
            )}

        </Grid>
    )
}



export default VideoPlayer
