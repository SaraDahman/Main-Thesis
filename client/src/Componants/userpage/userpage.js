import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import IconBarChart from '@material-ui/icons/BarChart';
import IconDashboard from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Meal from '../meal/meal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      float: 'left',
      alignItems: 'left',
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [mealsData, setmealsData] = useState([]);
  const [id, setId] = useState([]);
  const [restaurantsId, setrestaurantsId] = useState('');
  const [inputVal, setInputVal] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
   //refresh the page 
   function refreshPage() {
    window.location.reload(false);
  }

  //get the name of Restaurants and put it in [{restaurants}]
  useEffect(() => {
    axios
      .get('/business')
      .then((res) => {
        console.log(res.data);
        if (res.data.length) {
          let arrBusiness = [];
          for (var i = 0; i < res.data.length; i++) {
            arrBusiness.push({
              name: res.data[i].BusinessName,
              id: res.data[i].idBusiness,
            });
          }
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
      refreshPage();
      // setId(id.push(checkboxes[i].id))
    }
    setId(arr);
    alert('Add to cart');
    setInputVal(true);
    var userId = localStorage.getItem('tokenIdBusiness');
    console.log(userId);
  };
  return (
    <div>
      <div>
        <div className='cards'>
          {mealsData.map((element, index) => {
            return (
              <div key={index}>
                <Meal element={element} inputVal={inputVal} />
              </div>
            );
          })}
        </div>
        <Button
          id='btn'
          variant='contained'
          onClick={handleSubmit}
          // href='./order'
        >
          Add to basket
        </Button>
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
          <ListItem button>
            <ListItemIcon>
              <IconDashboard />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem>
          <ListItem button>
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
    </div>
  );
}
