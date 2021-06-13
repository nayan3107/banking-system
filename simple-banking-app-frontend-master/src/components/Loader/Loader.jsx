import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop } from '@material-ui/core';
import './Loader.css';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const Loader = ({}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div className='spinner'>
          <div className='cube1'></div>
          <div className='cube2'></div>
        </div>
      </div>
    </Backdrop>
  );
};

Loader.propTypes = {};

export default Loader;
