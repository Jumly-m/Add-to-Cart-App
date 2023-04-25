

// Challenge: Import 'initializeApp' from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js  ";

// Challenge: Import the 'getDatabase' from
// "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import {getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const appSettings= {
    databaseURL:"https://fir-app-f434e-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);

//console.log(app);

const database= getDatabase(app);
//create a ref variable
const shoppingListDB = ref(database,"shoppingList");


const  inputFieldEl= document.getElementById("input-field");

const addButtonEl = document.getElementById("add-button");

const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click",function(){
    let inputValue = inputFieldEl.value;

     
    push(shoppingListDB, inputValue);
  
    // Challenge: Clear the input field when button is pressed

    clearInputFieldEl()

    // Challenge: Append a new <li> with text content inputValue to the 'shopping-list' <ul>
    
});




onValue(shoppingListDB,function(snapshot){


    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
        setList(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
    
    
});


function clearShoppingListEl(){
    shoppingListEl.innerHTML="";
}

function clearInputFieldEl(){

    inputFieldEl.value ="";
}

function setList(item) {
   
   let itemID =item[0]
   
   let itemValue =item[1]

    let newEl = document.createElement("li")
    
    newEl.textContent =itemValue

    
    // Challenge: Attach an event listener to newEl and make it so you console log the id of the item when it's pressed.
    newEl.addEventListener("dblclick", function(){
        // Challenge: Make a let variable called 'exactLocationOfItemInDB' and set it equal to ref(database, something) where you substitute something with the code that will give you the exact location of the item in question.
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
};