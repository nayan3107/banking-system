import React from 'react';
import { withStyles, AppBar, Toolbar, Typography } from '@material-ui/core';
import navbarStyles from '../../assets/jss/Navbar';

const Navbar = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar
        position='sticky'
        className={classes.appBar}
        style={{ boxShadow: 'none' }}
      >
        <Toolbar className={classes.container}>
          <Typography variant='h6' className={classes.title}>
            Simple<span style={{ color: '#8EE4AF' }}> Banking</span> App
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(navbarStyles)(Navbar);
