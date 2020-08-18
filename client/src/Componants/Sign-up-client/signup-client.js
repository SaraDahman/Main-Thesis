import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import image from '../Pictures/pic.png';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

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
  const [phoneNumber, setPhoneNumber] = useState();
  const [warning, setWarning] = useState('');
  const [warning2, setWarning2] = useState('');
  // const [userId, setUserId] = use/State("");

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
        Swal.fire('User created successfully !!');
        Swal.fire('please confirm your email to be able to sign in');

        // alert(
        //   "User created successfully !!",
        //   "an Email has been sent to your account, please confirm your email to be able to sign in !"
        // );

        // const id = "" + response.data
        // setUserId(id);
        // console.log(userId, "------- user id -----")
        // alert(userId);
        axios
          .post(`/confirmEmail`, {
            userId: response.data,
            email: email,
          })
          .then(() => {
            console.log('confirmEmail is sent');
          });
      })
      .catch((err) => {
        console.log(err);
      });
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
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
            <br />

            <TextField
              id='standard-basic'
              label='Last Name'
              type='text'
              value={lastName}
              name='lastName'
              onChange={(event) => setLastName(event.target.value)}
            />
            <br />

            <TextField
              id='standard-basic'
              label='Email'
              type='email'
              value={email}
              name='email'
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />

            <TextField
              id='standard-basic'
              label='Password'
              type='password'
              value={password}
              name='password'
              onChange={(event) => {
                if (
                  event.target.value.length < 8 &&
                  event.target.value.length !== 0
                ) {
                  setWarning('it has to be greater than 8');
                  setPassword(event.target.value);
                } else {
                  setPassword(event.target.value);
                  setWarning('');
                }
              }}
            />
            <br />
            <h6>{warning}</h6>
            <TextField
              id='standard-basic'
              label='Phone Number'
              value={phoneNumber}
              name='phoneNumber'
              onChange={(event) => {
                //   if(typeof event.target.value !== "number"){
                //     setPhoneNumber(event.target.value);
                //     setWarning2('please add a vlaid number');
                //   }
                if (
                  event.target.value.length > 7 &&
                  event.target.value.length < 14 &&
                  event.target.value.length !== 0
                ) {
                  setPhoneNumber(event.target.value);
                  setWarning2('');
                } else if (event.target.value.length !== 0) {
                  if (event.target.value.length < 7) {
                    setPhoneNumber(event.target.value);
                    setWarning2('it has to be larger than 7');
                  } else {
                    setPhoneNumber(event.target.value);
                    setWarning2('it has to be less than 14');
                  }
                } else {
                  setPhoneNumber(event.target.value);
                  setWarning2('');
                }
              }}
            />
            <h6>{warning2}</h6>

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
