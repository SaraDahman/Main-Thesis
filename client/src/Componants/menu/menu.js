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
            console.log(checkboxes[i].id)
        }
        checkboxes[i].checked = false;
    }
   }
    
    const handleSubmit = () =>{
        addToBasket();
        alert ("add to the basket")
    }
    // const test = ['macarone','shesh kebab','shoraba'];
    const test = [{name:'meal1',url:"https://i0.wp.com/www.eatthis.com/wp-content/uploads/2020/02/applebees-sirloin-steak-fajitas.jpg?fit=1200%2C879&ssl=1"},{name:'meal2',url:"https://s.yimg.com/uu/api/res/1.2/7BYSquiQvKtUTHsLtcLiJQ--~B/aD0xMDgwO3c9MTkyMDtzbT0xO2FwcGlkPXl0YWNoeW9u/http://media.zenfs.com/en-US/homerun/gobankingrates_644/b321eb6fca591b254132c5aa4d34f2f2"}]
   return (
       <div id='mealDiv'>
        
               <div class="cards">
               {test.map((element)=>{
                    return  <Meal element={element} />
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