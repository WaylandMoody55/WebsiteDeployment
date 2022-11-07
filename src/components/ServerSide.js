// import Button from 'react-bootstrap/Button';
import React from 'react';

import Header from './ServerHeader'
import Search from './SearchBar'
import Order from './Order'
import Burgers from './popups/Burgers';
import Chicken from './popups/Chicken';
import Desserts from './popups/Desserts';
import Salads from './popups/Salads';
import Seasonal from './popups/Seasonal';
import Add from './popups/Add';
import Beverages from './popups/Beverages';

function ServerSide(){
     
    //This is where you would get the list of all the items and prices
    return(
    <>

        {/*Buttons with popup windows*/}
        
        <div className="wrapper">
            <Header />
            <Search />
            <Order />
            
            <div className="box5">
                <Burgers />
                <Chicken />
                <Desserts />
                <Beverages />
                <Salads />
                <Seasonal />
                <Add />
                
            </div> 
        </div>
    </>


    );
}

export default ServerSide;