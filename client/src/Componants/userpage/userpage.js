import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import IconBarChart from "@material-ui/icons/BarChart";
import IconDashboard from "@material-ui/icons/Dashboard";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Meal from "../meal/meal";
import Home from "./userMeals";
import UserRestaurants from "./userRestaurants";
import { useHistory } from "react-router-dom"; //to redirect the page to the order page.

const useStyles = makeStyles((theme: theme) =>
  createStyles({
    root: {
      float: 'left',
      alignItems: 'left',
      width: '100%',
      maxWidth: 360,
      // marginTop: "-75px",
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

export default function NestedList() {
  let history = useHistory();

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [home, setHome] = React.useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [mealData, setmealsData] = useState([]);
  const [id, setId] = useState([]);
  const [restaurantsId, setrestaurantsId] = useState('');
  const [inputVal, setInputVal] = useState(false);
  const [meals, setMeals] = useState([]);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickH = () => {
    setHome(!home);
  };
  //refresh the page
  function refreshPage() {
    window.location.reload(false);
  }

  const orders = () => {
    window.location.href = "/order";
  };
  //get the name of Restaurants and put it in [{restaurants}]
  useEffect(() => {
    axios
      .get('/business')
      .then((res) => {
        console.log(res.data);
        if (res.data.length) {
          let arrBusiness = [];
          let arrMeals = [];
          for (var i = 0; i < res.data.length; i++) {
            arrBusiness.push({
              name: res.data[i].BusinessName,
              id: res.data[i].idBusiness,
              location: res.data[i].location,
              photo: res.data[i].BusinessImage,
            });
            arrMeals.push(res.data[i].meal);
          }
          setMeals(arrMeals);
          console.log(arrBusiness);
          setRestaurants(arrBusiness);
        }

        // setRestaurants(arrBusiness);
      })
      .catch((err) => {
        console.log(err, 'err catching data');
      });
  }, []);

  //Show the restaurant name in list [mealData]
  var showBusinessName = (restaurantsId) => {
    axios
      .get(`/business/meal/${restaurantsId}`)
      .then((res) => {
        if (res.data.length !== 0) {
          console.log(res.data);
          setmealsData(res.data);
        }
      })
      .catch((err) => {
        console.log(err, 'err catching data');
      });
    setHome(false);
  };

  const dashBoard = () => {
    setHome(true);
    console.log('dashBoard');
  };

  var test = () => {
    window.location.href = '/order';
  };
  const handleSubmit = () => {
    var arr = [];
    var checkboxes = document.getElementsByTagName('input');
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked === true) {
        console.log(checkboxes[i]);
        arr.push(checkboxes[i].id);
        var userId = localStorage.getItem('tokenIdBusiness');

        axios
          .post(`/order/add/${userId}`, {
            mealId: `${checkboxes[i].id}`,
            resId: `${restaurantsId}`,
            amount: `${checkboxes[i].value}`,
          })
          .then((res) => {
            console.log('sucess!', res);
          })
          .catch((err) => {
            console.log('err posting the data', err);
          });
      }
      checkboxes[i].checked = false;
      // refreshPage();
      // setId(id.push(checkboxes[i].id))
    }
    setId(arr);

    // the condition to jump to the order function >> the basket isn't empty
    if (arr.length !== 0) {
      alert("Add to cart");
      history.push("/order");
    } else {
      alert("please add something to the basket!");
      refreshPage();
    }
    setInputVal(true);
    var userId = localStorage.getItem('tokenIdBusiness');
    console.log(userId);
  };

  if (home === false) {
    console.log('item');
    return (
      <div>
        <div>
          <List
            component='nav'
            aria-labelledby='nested-list-subheader'
            subheader={
              <ListSubheader
                component='div'
                id='nested-list-subheader'
              ></ListSubheader>
            }
            className={classes.root}
          >
            <ListItem button onClick={dashBoard}>
              <ListItemIcon>
                <IconDashboard />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItem>
            <ListItem button onClick={orders}>
              <ListItemIcon>
                <IconBarChart />
              </ListItemIcon>
              <ListItemText primary='Orders' />
            </ListItem>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              <ListItemText primary='restaurants' />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {restaurants.map((name, i) => {
                  return (
                    <ListItem
                      key={i}
                      onClick={() => {
                        setrestaurantsId(restaurants[i].id);
                        // console.log(restaurantsId);
                        showBusinessName(restaurants[i].id);
                      }}
                      button
                      className={classes.nested}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={name.name} />
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </List>
        </div>
        <br />
        <div>
          <div className='cards'>
            {mealData.map((element, index) => {
              return (
                <div key={index}>
                  <Meal element={element} inputVal={inputVal} />
                </div>
              );
            })}
          </div>
          <br />
          <div>
            <Button
              style={{
                backgroundColor: '#c67506',
                color: 'white',
                marginLeft: '33%',
              }}
              variant='contained'
              onClick={handleSubmit}
            >
              Add to basket
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    console.log('home');
    return (
      <div>
        <div>
          <List
            component='nav'
            aria-labelledby='nested-list-subheader'
            subheader={
              <ListSubheader
                component='div'
                id='nested-list-subheader'
              ></ListSubheader>
            }
            className={classes.root}
          >
            <ListItem button onClick={dashBoard}>
              <ListItemIcon>
                <IconDashboard />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItem>
            <ListItem button onClick={test}>
              <ListItemIcon>
                <IconBarChart />
              </ListItemIcon>
              <ListItemText primary='Orders' />
            </ListItem>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              <ListItemText primary='restaurants' />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {restaurants.map((name, i) => {
                  return (
                    <ListItem
                      key={i}
                      onClick={() => {
                        console.log('test');
                        setrestaurantsId(restaurants[i].id);
                        // console.log(restaurantsId);
                        showBusinessName(restaurants[i].id);
                      }}
                      button
                      className={classes.nested}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={name.name} />
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </List>
        </div>
        {/* <UserRestaurants restaurants={restaurants} /> */}
        <br />
        <br />
        <Home meals={meals} />
        <UserRestaurants restaurants={restaurants} />
        {/*  <div>
          <Home meals={meals} />
          <br />
          <br />
        </div>
        <div>
          <UserRestaurants restaurants={restaurants} />
          <br />
          <br />
        </div>*/}
      </div>
    );
  }
}
