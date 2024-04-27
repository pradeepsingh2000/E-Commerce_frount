import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Checkout from "./Checkout"
import "./Checkout.css";
import { getCartList } from "../../Services/Products/ProductsApi";
import { useSelector } from "react-redux";
import { SendAddress, selectedLoggerInUser } from "../../Redux/Auth/authSlice";

const stripePromise = loadStripe("pk_test_51NyxTZSABipdGMeGExogAUYlsYes7A6cC8m47QCNsZL1xcxPVyp4EbvmsxugFsnV0mDvvzPCF88BrQWJnM6VZdDq003E5pV0Nl");
const token = localStorage.getItem('token')
export default function Stripe() {
  const [order,setOrder] = useState()
  const [placeOrder,setPlaceOrder] = useState(false)
  const user = useSelector(selectedLoggerInUser)
  const address = useSelector(SendAddress)

    console.log(address.address,'address');
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCartList();
        if (response.status) {
          console.log('in getCart')
          setOrder(response.data[0]);
          console.log(response.data[0])
          
          setPlaceOrder(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  

  useEffect(() => {
    if (placeOrder && user.token) {
      const ordersend ={
        order:order,
        setAdd:address.address
      }
      console.log('go in if')
      fetch("http://localhost:10000/customer/products/createOrder", {
        method: "POST",
        headers: {Authorization: user.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ordersend),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [placeOrder,user]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <Checkout />
        </Elements>
      )}
    </div>
  );
}