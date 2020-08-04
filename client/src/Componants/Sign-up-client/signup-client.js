import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import image from '../Pictures/pic.png';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '350px',
    },
  },
}));

function SignupClient() {
  const classes = useStyles();

  return (
    <div className='container'>
      <div className='in'>
        <div className='form'>
          <form className={classes.root} noValidate autoComplete='off'>
            <h1>Sign Up</h1>
            <TextField id='standard-basic' label='Fist Name' type='text' />
            <br /> <br></br>
            <TextField id='standard-basic' label='Last Name' type='text' />
            <br /><br></br>
            <TextField id='standard-basic' label='Email' type='email' />
            <br /><br></br>
            <TextField id='standard-basic' label='Password' type='password' />
            <br /><br></br>
            <TextField id='standard-basic' label='Phone Number' type='number' />
            <Button variant='contained' id="btn">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
      <div className='in'>
        <img src={image} className='img'/>
      </div>
    </div>
  );
}

export default SignupClient;
