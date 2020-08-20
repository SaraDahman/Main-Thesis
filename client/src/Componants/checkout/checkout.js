import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
const STRIPE_PUBLISHABLE =
  'pk_test_51HBJ7dJOckawuOBrogK0VTI6hmwE6AYbwiCDDlxyNmOqlN6xSYhXOCJ3qnKnRnmolGtvReTIeyUZzBtbkDmitPwO00EG9Vcrc6';
const CURRENCY = 'USD';

const fromDollarToCent = amount => parseInt(amount * 100);
var userId = localStorage.getItem('tokenIdBusiness');
var resId = localStorage.getItem('resId');
const successPayment = data => {
  Swal.fire({
    title: 'Thanks for buying from us!',
    text: 'your meal is being prepared',
    icon: 'sucess',
    confirmButtonText: 'Cool'
  });
  axios
    .put(`/order/remove/${userId}`, {
      resId: resId
    })
    .then(res => {
      console.log('all refreshed successfully' + res.data);
    })
    .catch(err => {
      console.log(err + 'err deleteing data');
    });
  setTimeout(function() {
    window.location.href = '/user';
  }, 3000);
};

const errorPayment = data => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!'
  });
};

const onToken = (amount, description) => token =>
  axios
    .post('/stripeCheckout', {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
    email
    allowRememberMe
  />
);

export default Checkout;
