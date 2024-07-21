import React from 'react';
import ReactDOM from 'react-dom/client';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';

import App from './App.js';

import reportWebVitals from './reportWebVitals.js';

const stripePromise = loadStripe('pk_test_51PXRbhKM7NIzWApUyTBQ4SgJPxdzscjDKhmXrBMg7NyotoMH9reM9Rp7SW3DwWbpJ5GZDzaYXUYdvwStAznvuyV300MZnwso6E'); // Replace with your Stripe publishable key

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
