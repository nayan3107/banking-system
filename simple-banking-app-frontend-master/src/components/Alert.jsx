import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Snackbar, makeStyles, Slide } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import AlertStyles from '../assets/jss/Alerts';

const useStyles = makeStyles(AlertStyles);

const MyAlert = () => {
  const { alerts } = useSelector((state) => {
    return {
      alerts: state.alert,
    };
  }, shallowEqual);

  const classes = useStyles();

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Snackbar
        key={alert.id}
        className={classes.root}
        TransitionComponent={Slide}
        open={alert.msg.length > 0 ? true : false}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert style={{ width: '100%' }} severity={alert.alertType}>
          <AlertTitle>{alert.msg}</AlertTitle>
        </Alert>
      </Snackbar>
    ))
  );
};

export default MyAlert;
