import React from 'react'
import ReactDOM from 'react-dom'
import Meal from '../meal/meal'
import './menu.css';

function Menu (){
    const test = [1,2,3,4,5,6,7,8,9,10]
   return (
       <div id='mealDiv'>
               <div class="cards">
               {test.map(()=>{
                    return  <Meal />
                })}
               </div>
       </div>
   )
}

export default Menu;