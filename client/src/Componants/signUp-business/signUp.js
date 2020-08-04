import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { positions } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import './style.css';
import image from '../Pictures/pic.png';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '350px',
    },
  },
}));

 function SignUp() {
  const classes = useStyles();

  return (
    <div className='container1'>
      <div className='in'>
        <div className='form'>
          <form className={classes.root} id="form" noValidate autoComplete='off'>
          <h1>
                Sign Up 
            </h1>
          <TextField id="standard-basic" label="Business name" type="name" /> <br></br><br></br>
             <TextField id="standard-basic" label="Business email" type="email"/><br></br><br></br>
             <TextField id="standard-basic" label="Password" type="password" /><br></br><br></br>
            <TextField id="standard-basic" label="Business phone" type="name" /><br></br><br></br>
           <TextField id="standard-basic" label="Restraunt phone" type="name" /><br></br><br></br>
           <TextField id="standard-basic" label="Location" type="name" /><br></br><br></br> 
           <Button variant='contained' id="btn">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
      <div className='in'>
       <img src = {image} alt="" className="img"></img>
      </div>
    </div>
  );
}

export default SignUp;
