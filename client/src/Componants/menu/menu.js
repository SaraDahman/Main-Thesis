import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import Meal from '../meal/meal'
import './menu.css';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { STATES } from 'mongoose';
import axios from 'axios';

function Menu (){
   const [id,setId] = useState([]); //for using the id of every single meal 
   const [data,setData] = useState([]); //for fetching the data from the database 

   const addToBasket =()=>{
       var arr = [];
        var checkboxes = document.getElementsByTagName('input');
        for(var i = 0 ; i < checkboxes.length ; i++){
            if(checkboxes[i].checked === true){
                console.log(checkboxes[i].id);
                arr.push(checkboxes[i].id);
                // setId(checkboxes[i].id)
                // console.log(checkboxes[i]);
                }
            checkboxes[i].checked = false;
            // setId(id.push(checkboxes[i].id))
        }
        setId(arr);

   }

     useEffect(() =>{
      axios.get('/business/meal/5999965')
      .then((res)=>{
          console.log(res.data);
          setData(res.data);

      })
      .catch((err)=>{
          console.log(err,"err catching data");
      })
        },[])

    const handleSubmit = () =>{
        // mealId: req.body.mealId,
        // resId: req.body.resId,
        // userId: req.params.userId,
        addToBasket();
       alert("whatsup");
       var userId = localStorage.getItem("tokenIdBusiness");
    //    console.log(id);
       for(var i = 0 ; i < id.length ; i++){
           console.log('this is good ')
             axios.post('./order/add/:userId',{mealId:id[i],resId:5999965,userId:userId})
             .then(()=>{
                 console.log("sucess!")
             }).catch((err)=>{
                 console.log("err posting the data",err);
             })
       }
    }
    console.log(id);
    // const test = ['macarone','shesh kebab','shoraba'];
    // const test = [{name:'meal1',url:"https://i0.wp.com/www.eatthis.com/wp-content/uploads/2020/02/applebees-sirloin-steak-fajitas.jpg?fit=1200%2C879&ssl=1"},{name:'meal2',url:"https://s.yimg.com/uu/api/res/1.2/7BYSquiQvKtUTHsLtcLiJQ--~B/aD0xMDgwO3c9MTkyMDtzbT0xO2FwcGlkPXl0YWNoeW9u/http://media.zenfs.com/en-US/homerun/gobankingrates_644/b321eb6fca591b254132c5aa4d34f2f2"}]
   return (
       <div id='mealDiv'>
        
               <div className="cards">
               {data.map((element , index)=>{
                    return (<div key ={index}> 
                        <Meal element={element} />

               </div> )
                })}
               </div>
               <div id="ul">
                   <ul>
                       {id.map((ele,index)=>{
                          return <li key={index}>{ele}</li>
                       })}
                   </ul>
               </div>
               <div>
               <Button id="btn" variant='contained' id='btn' onClick={handleSubmit}>
              Add to basket
            </Button>             
            </div>
       </div>
   )
}

export default Menu;