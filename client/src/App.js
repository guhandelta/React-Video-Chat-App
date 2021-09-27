import { AppBar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { Notifications, Options,VideoPlayer } from './components';

const useStyles = makeStyles(theme =>({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const App = () => {

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.AppBar} position="static" color="inherit">
        <Typography variant="h2" align="center">Video Chat</Typography>
      </AppBar>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  )
}

export default App