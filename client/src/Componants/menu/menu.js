import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Meal from "../meal/meal";
import "./menu.css";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { STATES } from "mongoose";
import axios from "axios";

function Menu() {
  const [name, setName] = useState([]); //for using the name of every single meal
  const [data, setData] = useState([]); //for fetching the data from the database

  const addToBasket = () => {
    var arr = [];
    var checkboxes = document.getElementsByTagName("input");
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked === true) {
        console.log(checkboxes[i].id);
        arr.push(checkboxes[i].id);
      }
      checkboxes[i].checked = false;
    }
    setName(arr);
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
    alert("add to the basket");
  };
  // const test = ['macarone','shesh kebab','shoraba'];
  // const test = [{name:'meal1',url:"https://i0.wp.com/www.eatthis.com/wp-content/uploads/2020/02/applebees-sirloin-steak-fajitas.jpg?fit=1200%2C879&ssl=1"},{name:'meal2',url:"https://s.yimg.com/uu/api/res/1.2/7BYSquiQvKtUTHsLtcLiJQ--~B/aD0xMDgwO3c9MTkyMDtzbT0xO2FwcGlkPXl0YWNoeW9u/http://media.zenfs.com/en-US/homerun/gobankingrates_644/b321eb6fca591b254132c5aa4d34f2f2"}]
  return (
    <div id="mealDiv">
      <div class="cards">
        {data.map((element) => {
          return (
            <div>
              <Meal element={element} />
            </div>
          );
        })}
      </div>
      <div id="ul">
        <ul>
          {name.map((ele) => {
            return <li>{ele}</li>;
          })}
        </ul>
      </div>
      <div>
        <Button id="btn" variant="contained" id="btn" onClick={handleSubmit}>
          Add to basket
        </Button>
      </div>
    </div>
  );
}

export default Menu;
