import React, { useState } from 'react';
// import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
//-------------private route -------------//
import { Route, Redirect } from 'react-router-dom';

const authintication = {
  isLoggedIn: false,
  onAuthintication() {
    this.isLoggedIn = true;
  },
  ofAuthintication() {
    this.isLoggedIn = false;
  },
  getLoginStatus() {
    return this.isLoggedIn;
  },
};
//--------------------- private route --------------//

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Side Menu
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#f64f0f',
    color: 'white',
    height: '48px',
    margin: ' -1px 0px 16px',
  },
  input12: {
    backgroundColor: '#ff0018',
  },
}));

function SignIn(props) {
  // const history = useHistory();
  localStorage.setItem('isLoggedIn', false);
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  var checkPassword = (e) => {
    e.preventDefault();
    var location = localStorage.getItem('poslatitude');
    if (location.length > 0) {
      const user = {
        email: email,
        password: password,
      };
      axios
        .post('/login', {
          email: user.email,
          password: user.password,
        })
        .then((response) => {
          console.log('success');
          // if(response.data.confirmed) {

          // console.log(response.data);
          var token = response.data.token;
          console.log(response.data);
          // alert(response.data, "------ response.data ---- ")
          var decoded = jwtDecode(token);
          navigator.geolocation.getCurrentPosition((position) => {
            localStorage.setItem('poslatitude', position.coords.latitude);
            localStorage.setItem('poslongitude', position.coords.longitude);
            // setMarkers({
            //   lat: Number(localStorage.getItem("poslatitude")),
            //   lng: Number(localStorage.getItem("poslongitude")),
            // });
            console.log(
              localStorage.getItem('poslatitude'),
              localStorage.getItem('poslongitude')
            );
          });
          //--------- private route ------------//
          // authintication.onAuthintication();
          //-------------private route ----------//
          if (decoded.userId) {
            localStorage.setItem('tokenIdBusiness', decoded.userId);
            // alert('this is user');
            // window.location.reload("/menu");
            // history.push("/menu");
            authintication.onAuthintication();
            localStorage.setItem('isLoggedIn', true);
            props.history.push('/user');
          } else if (decoded.idBusiness) {
            // alert('this is business');
            localStorage.setItem('tokenIdBusiness', decoded.idBusiness);
            authintication.onAuthintication();
            localStorage.setItem('isLoggedIn', true);
            // window.location.reload();
            props.history.push('/res');
            // history.push("/res");
          }
          // }else {
          //   alert("please confirm your Email")
          // }

          //   alert(response.data);
          // history.push("/res");
        })
        .catch((err) => {
          console.log('err signing in!', err);
        });
    } else {
      alert('choose your location');
    }
  };

  return (
    <div>
      {/* <Map /> */}
      <Container component='main' maxWidth='xs'>
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography> */}
          <form className={classes.form} noValidate>
            <TextField
              className={classes.input1}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={(e) => handleChange(e)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={(e) => handleChange(e)}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              className={classes.submit}
              onClick={(e) => checkPassword(e)}
              href='/menu'
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('isLoggedIn') == 'true' ? (
        <Component {...props} />
      ) : (
        <Redirect to='/sign-in' />
      )
    }
  />
);
export { authintication, SignIn, PrivateRoute };
