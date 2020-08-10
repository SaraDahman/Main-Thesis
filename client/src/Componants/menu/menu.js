import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Meal from "../meal/meal";
import "./menu.css";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { STATES } from "mongoose";
import axios from "axios";

function Menu() {
  const [id, setId] = useState([]); //for using the id of every single meal
  const [data, setData] = useState([]); //for fetching the data from the database
 // amount:amount
  //sending the data seleceted to the database && fetching in the ordered.js function 
  const addToBasket = () => {
    var arr = [];
    var checkboxes = document.getElementsByTagName("input");
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked === true) {
        console.log(checkboxes[i]);
        arr.push(checkboxes[i].id);
        var userId = localStorage.getItem("tokenIdBusiness");
        axios
          .post(`/order/add/${userId}`, {
            mealId: `${checkboxes[i].id}`,
            resId: `147111`, 
           
          })
          .then((res) => {
            console.log("sucess!", res);
          })
          .catch((err) => {
            console.log("err posting the data", err);
          });
      }
      checkboxes[i].checked = false;
    }
    setId(arr);
  };

  useEffect(() => {
    axios
      .get("/business/meal/5999965")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err, "err catching data");
      });
  }, []);

  const handleSubmit = () => {
    addToBasket();
    alert("whatsup");
    var userId = localStorage.getItem("tokenIdBusiness");
    
  };

  //mapping thro every single meal in the menu 
  return (
    <div id="mealDiv">
      <div className="cards">
        {data.map((element, index) => {
          return (
            <div key={index}>
              <Meal element={element} />
            </div>
          );
        })}
      </div>
      <div id="ul">
        <ul>
          {id.map((ele, index) => {
            return <li key={index}>{ele}</li>;
          })}
        </ul>
      </div>
      <div>
        <Button id="btn" variant="contained" id="btn" onClick={handleSubmit} href="./order">
          Add to basket
        </Button>
      </div>
    </div>
  );
}

export default Menu;
