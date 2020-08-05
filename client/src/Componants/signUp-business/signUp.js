// import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { positions } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import './style.css';
import image from '../Pictures/pic.png';
import React, { useState } from 'react';

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
  const [state,setState] = useState({name:'', email:'',password:'',phone:'',restPhone:'',location:''});

  let handleChange = (e) =>{
    let input = e.target.value;
    setState({[e.target.name]:input});
    console.log(state);
  }

  
let handleSubmit = (e) =>{
  // e.preventDefault();
  // axios.get('/signin',{email:state.email,pass:state.password}).then((result)=>{
  //   console.log(result)
  // }).catch((err)=>{
  //   console.log("err signing in!"+err);
  // })
  // alert('you have been sucessfully signed up!');
}

  return (
    <div className='container1'>
      <div className='in'>
        <div className='form'>
          <form className={classes.root} id="form" noValidate autoComplete='off'>
          <h1>
                Sign Up 
            </h1>
          <TextField id="standard-basic" label="Business name" type="name" name="name" value={state.name} onChange={(e)=>handleChange(e)}/ > <br></br><br></br>
             <TextField id="standard-basic" label="Business email" type="email" name="email" value={state.email} onChange={(e)=>handleChange(e)}/><br></br><br></br>
             <TextField id="standard-basic" label="Password" type="password" name="password" value={state.password} onChange={(e)=>handleChange(e)} /><br></br><br></br>
            <TextField id="standard-basic" label="Business phone" type="name" name="phone" value={state.phone} onChange={(e)=>handleChange(e)} /><br></br><br></br>
           <TextField id="standard-basic" label="Restraunt phone" type="name" name="restPhone" value={state.restPhone} onChange={(e)=>handleChange(e)} /><br></br><br></br>
           <TextField id="standard-basic" label="Location" type="name" name="location" value={state.location} onChange={(e)=>handleChange(e)} /><br></br><br></br> 
           <Button variant='contained' id="btn" onSubmit={handleSubmit()}>
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
