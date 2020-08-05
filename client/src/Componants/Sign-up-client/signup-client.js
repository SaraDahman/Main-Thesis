import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import image from '../Pictures/pic.png';
import { useState } from 'react';
import axios from 'axios';

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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  let handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/user/signup', {
        firstName: firstName,
        lastName: lastName,
        phone: phoneNumber,
        email: email,
        password: password,
      })
      .then((response) => {
        alert(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='container'>
      <div className='in'>
        <div className='form'>
          <form className={classes.root} noValidate autoComplete='off'>
            <h1>Sign Up</h1>
            <TextField
              id='standard-basic'
              label='Fist Name'
              type='text'
              value={firstName}
              name='firstName'
              onChange={(event) => setFirstName(event.target.value)}
            />
            <br /> <br></br>
            <TextField
              id='standard-basic'
              label='Last Name'
              type='text'
              value={lastName}
              name='lastName'
              onChange={(event) => setLastName(event.target.value)}
            />
            <br />
            <br></br>
            <TextField
              id='standard-basic'
              label='Email'
              type='email'
              value={email}
              name='email'
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            <br></br>
            <TextField
              id='standard-basic'
              label='Password'
              type='password'
              value={password}
              name='password'
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <br></br>
            <TextField
              id='standard-basic'
              label='Phone Number'
              type='number'
              value={phoneNumber}
              name='phoneNumber'
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
            <Button variant='contained' id='btn' onClick={handleSubmit}>
              Sign Up
            </Button>
          </form>
        </div>
      </div>
      <div className='in'>
        <img src={image} className='img' alt='' />
      </div>
    </div>
  );
}

export default SignupClient;
