import Button from 'react-bootstrap/Button';
import React from 'react';

import Header from './ServerHeader'
import Search from './SearchBar'
import Order from './Order'
// import Catagories from './src/components/ServerCatagories'
// import Order from './src/components/ServerOrder'

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
                <Button style = {styles.catagory}>
                    Burgers
                </Button>

                <Button style = {styles.catagory}>
                    Chicken
                </Button>

                <Button style = {styles.catagory}>
                    Dessert
                </Button>

                <Button style = {styles.catagory}>
                    Beverages
                </Button>

                <Button style = {styles.catagory}>
                    Salads
                </Button>

                <Button style = {styles.catagory}>
                    Seasonal Items
                </Button>

                <Button style = {styles.catagory}>
                    Add-ons
                </Button>
            </div> 
        </div>
    </>


    );
}

export default ServerSide;

const styles = {
    container:{
        width: '100%',
    },
    catagory:{
        width: '200px',
        height: '200px',
        marginLeft: '20px',
        marginTop: '20px',
    }
};