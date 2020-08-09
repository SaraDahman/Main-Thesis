import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Button from "@material-ui/core/Button";


function Order() {
  const [orders, setOrders] = useState([]);

  var userId = localStorage.getItem("tokenIdBusiness");
  useEffect(() => {
    axios
      .get(`/order/find/${userId}`)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err, "err catching data");
      });
  }, [])
  var orderName = [];
  for(var i = 0 ; i< orders.length ; i++){
    orderName.push(orders[i].addDate);
  }
  return (
   
    <div>
      <h1>Your Basket</h1>
  <ul>{orderName.map((order)=>{
   return <li>{order}</li>
  })}</ul>
     <Button variant="contained" id="btn" >
           buy
            </Button>
    </div>
  );
}

export default Order;
