import UpdateMenu from "./UpdateMenu";
import AddMenuItem from "./AddMenuItem";
import AddSeasonalItem from "./AddSeasonalItem";
import RemoveSeasonal from "./RemoveSeasonal";
import Button from 'react-bootstrap/Button';
import React, { useRef, useState, useEffect } from 'react';

function ViewEditMenu(){
    //This is where you would get the list of all the items and prices
    const [menuItems, setMenuItems] = useState([
        /*
        {name: "MenuItem1", price: "Price1"},
        {name: "MenuItem2", price: "Price2"},
        {name: "MenuItem3", price: "Price3"},
        {name: "MenuItem4", price: "Price4"},
        {name: "MenuItem5", price: "Price5"},
        {name: "MenuItem6", price: "Price6"},
        */
    ]);

    async function test(){
        //console.log("test async inside effect");
        try {
            const res = await fetch("/menuTable", {
              method: "post",
              mode : "cors",
              // cache: 'no-cache',
              headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
                // "Accept": "application/json"
              }
            });
  
            if (!res.ok) {
              const message = `An error has occured: ${res.status} - ${res.statusText}`;
              throw new Error(message);
            }
  
            // grabs data from server response 
            const data = await res.json()
            console.log(data)
            
            const newMenu = data;

            setMenuItems(newMenu);

      }
  
      catch (err) {
          console.log(err.messeage);
      }

    }


    test();
    /*
    useEffect(()=>{
        //console.log("hello from view Edit Menu");
        test();
    })
    */


    return(
    <>
        {/*Buttons with popup windows*/}
        <div className = "flex flex-wrap justify-center space-x-5 px-5 py-5">
            <Button variant="danger" href="/Inventory">
                Back
            </Button>
            <UpdateMenu/>
            <AddMenuItem/>
            <AddSeasonalItem/>
            <RemoveSeasonal/>
        </div>
        {/*Table*/}
        <div class ="px-5 flex justify-center items-center">
            <table class = "table-auto w-full shadow-md mt-5 rounded border-separate border-spacing-y-3 px-2">
                <thead>
                    <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map(item => {
                    return (
                        <tr>
                        <td>{item.name}</td>
                        <td>{item.price}</td>

                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </div>
    </>

//
    );
}

export default ViewEditMenu;