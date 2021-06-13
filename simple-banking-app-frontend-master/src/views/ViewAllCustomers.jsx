import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormContainer } from '../components/FormContainer';
import { Typography, IconButton } from '@material-ui/core';
import { CUSTOMERS } from '../constants/routes';
import { ArrowForward, ChevronRight } from '@material-ui/icons';

const Home = (props) => {
  const history = useHistory();

  return (
    <FormContainer>
      <Typography variant='h4' align='center' gutterBottom>
        View All Customers
      </Typography>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton size='medium' onClick={() => history.push(CUSTOMERS)}>
          Go <ArrowForward color='primary' />
        </IconButton>
      </div>
    </FormContainer>
  );
};

Home.propTypes = {};

export default Home;
