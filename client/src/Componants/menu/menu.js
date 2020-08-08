import React from 'react'
import ReactDOM from 'react-dom'
import Meal from '../meal/meal'
import './menu.css';
import Button from '@material-ui/core/Button';


function Menu (){
   const addToBasket =()=>{
    var checkboxes = document.getElementsByTagName('input');
    for(var i = 0 ; i < checkboxes.length ; i++){
        if(checkboxes[i].checked === true){
            console.log(i)
        }
        checkboxes[i].checked = false;
    }
   }
    
    const handleSubmit = () =>{
        addToBasket();
        alert ("add to the basket")
    }
    const test = [1,2,3,4,5,6,7,8,9,10]
   return (
       <div id='mealDiv'>
        
               <div class="cards">
               {test.map(()=>{
                    return  <Meal  />
                })}
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