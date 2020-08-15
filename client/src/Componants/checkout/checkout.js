import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
// import STRIPE_PUBLISHABLE from './constants/stirpe';
// import PAYMENT_SERVER_URL from './constants/server';
const STRIPE_PUBLISHABLE =
  'pk_test_51HBJ7dJOckawuOBrogK0VTI6hmwE6AYbwiCDDlxyNmOqlN6xSYhXOCJ3qnKnRnmolGtvReTIeyUZzBtbkDmitPwO00EG9Vcrc6';
// const PAYMENT_SERVER_URL =

const CURRENCY = 'USD';

const fromDollarToCent = amount => parseInt(amount * 100);

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
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
    zipCode
    email
    allowRememberMe
  />
);

export default Checkout;
