import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import ItemsCarousel from "react-items-carousel";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
var token = localStorage.getItem('tokenIdBusiness');

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    width: 270,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

function Orders() {
  const classes = useStyles();

  const [counter, setCounter] = useState(0);
  const [orders, setOrders] = useState([]);
  var [clientss, setClients] = useState({});

  useEffect(() => {
    async function rendering() {
      axios
        .get(`/meal/pending/${token}`)
        .then(async (response) => {
          var clients = response.data;
          console.log(response.data);
          // setOrders(response.data);
          setClients(clients);
          clientss = clients;

          ////////////////////////////
          var x = [];
          for (var key in clientss) {
            var id = key;
            console.log(id);
            let response = await axios.get(`/user/login/${id}`);

            var user = response.data;

            var obj = {
              name: '',
              phone: 0,
              orders: [],
            };
            obj.name = user.FullName;
            obj.phone = user.Phone;
            obj.orders = clientss[key];
            x.push(obj);
          }

          setOrders(x);
          console.log(x);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    rendering();
  }, [counter]);

  let decrement = (e) => {
    var mealId = e.target.name;
    var amount = e.target.value;
    axios
      .post(`/business/meal/pendingOne/${token}`, {
        mealId: mealId,
        mealAmount: -amount,
      })
      .then((response) => {
        console.log();
        console.log('quantitiy updated');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>ORDERS</h1>
      {orders.map((Element, index) => {
        return (
          <div key={index} className='orders'>
            <div>
              <h3>
                Client: &nbsp;
                {Element.name}
              </h3>
              <h3>
                Phone Number: &nbsp;
                {Element.phone}
              </h3>
            </div>
            <div className='orders'>
              {Element.orders.map((Element2, index2) => {
                return (
                  <div className='card1' key={index2}>
                    <img
                      src={Element2.image}
                      alt='Avatar'
                      style={{ width: '100%', height: '240px' }}
                    />
                    <div className='container1'>
                      <h4>
                        <b>{Element2.mealName}</b>
                        <br />
                        <span>{Element2.mealAmount}</span>
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button variant='contained' id='btn'>
              Confirm
            </Button>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default Orders;
