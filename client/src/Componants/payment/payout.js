import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Map from '../map/googlemaps';
import axios from 'axios';
import Table from './tablePrice';
import Swal from 'sweetalert2';
import Checkout from '../checkout/checkout';

var userId = localStorage.getItem('tokenIdBusiness');

export default function AddressForm() {
  const [meals, setMeals] = useState([]);
  const [totalPrice, settotalPrice] = useState('');
  const [resId, setResId] = useState(Number);
  const [paymentMethod, setPaymentMethod] = useState('');

  function showButtons() {
    if (!paymentMethod) {
      return '';
    }
    if (paymentMethod === 'card') {
      return (
        <Checkout
          name={'Meals'}
          description={'Please confirm your payment information'}
          amount={totalPrice}
        />
      );
    } else {
      return (
        <button
          id='btn'
          onClick={() => {
            Swal.fire({
              title: 'Thanks for buying from us!',
              text: 'your meal is being prepared',
              icon: 'sucess',
              confirmButtonText: 'Cool',
            });
            var userId = localStorage.getItem('tokenIdBusiness');
            axios
              .put(`/order/remove/${userId}`, {
                resId: resId,
              })
              .then((res) => {
                console.log('all refreshed successfully' + res.data);
              })
              .catch((err) => {
                console.log(err + 'err deleteing data');
              });
            setTimeout(function () {
              window.location.href = '/userpage';
            }, 3000);
          }}
        >
          checkout
        </button>
      );
    }
  }
  // var totalPrice = 0;
  useEffect(() => {
    axios
      .get(`/order/find/${userId}`)
      .then((res) => {
        if (res.data.length !== 0) {
          var totalPrice = 0;
          for (var key in res.data) {
            setResId(key);
            localStorage.setItem('resId', key);
            console.log('payout', res.data[key]);
            setMeals(res.data[key]);
            res.data[key].map((element) => {
              return (totalPrice += element['price'] * element['mealAmount']);
              // console.log('test', totalPrice);
            });
          }
        }
        settotalPrice(totalPrice);
      })
      .catch((err) => {
        console.log(err, 'err catching data');
      });
  }, []);
  // var deleteAllOrders = resId => {
  //   var userId = localStorage.getItem('tokenIdBusiness');
  //   axios
  //     .put(`/order/remove/${userId}`, {
  //       resId: resId
  //     })
  //     .then(res => {
  //       console.log('all refreshed successfully' + res.data);
  //     })
  //     .catch(err => {
  //       console.log(err + 'err deleteing data');
  //     });
  // };
  // console.log('totalprice', totalPrice);
  return (
    <div>
      <div style={{ width: '55%', float: 'left', marginLeft: '30px' }}>
        <React.Fragment>
          <Typography variant='h6' gutterBottom>
            Shipping address
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='firstName'
                name='firstName'
                label='First name'
                fullWidth
                autoComplete='given-name'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='lastName'
                name='lastName'
                label='Last name'
                fullWidth
                autoComplete='family-name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id='address1'
                name='address1'
                label='Address line 1'
                fullWidth
                autoComplete='shipping address-line1'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='address2'
                name='address2'
                label='Address line 2'
                fullWidth
                autoComplete='shipping address-line2'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='city'
                name='city'
                label='City'
                fullWidth
                autoComplete='shipping address-level2'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id='state'
                name='state'
                label='State/Province/Region'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='zip'
                name='zip'
                label='Zip / Postal code'
                fullWidth
                autoComplete='shipping postal-code'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='country'
                name='country'
                label='Country'
                fullWidth
                autoComplete='shipping country'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color='secondary' name='saveAddress' value='yes' />
                }
                label='Use this address for delivery '
              />
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
      <div style={{ marginLeft: '62%' }}>
        <h2 style={{ marginTop: '40px' }}>CART TOTALS</h2>
        <hr></hr>
        <div>
          <Table meals={meals} />
        </div>
        <h3>
          Total
          <h3 style={{ marginLeft: '420px', marginTop: '-32px' }}>
            {totalPrice}
          </h3>
        </h3>
        <br></br>
        <hr></hr>
        <div>
          <div id='paymentMethods'>
            <p>Please choose your payment method !</p>
            <input
              name='paymentMethod'
              type='radio'
              id='payWithCard'
              value='card'
              onClick={() => {
                setPaymentMethod('card');
              }}
            />
            <label for='payWithCard'> Pay with card</label>
            <br />
            <input
              name='paymentMethod'
              type='radio'
              id='payCash'
              value='cash'
              onClick={() => {
                setPaymentMethod('cash');
              }}
            />
            <label for='payCash'> Pay cash</label>
            <br />
          </div>
          <span>{showButtons()}</span>
        </div>
      </div>
      <div style={{ float: 'left' }}>
        <label>check your location in map</label>
        <Map></Map>
      </div>
    </div>
  );
}
