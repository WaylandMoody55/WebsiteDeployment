import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

// import Header from './ServerHeader' //NOT USED CAN BE DELETED
import Search from './SearchBar'
import Order from './Order' //NOT USED CAN BE DELETED
import Burgers from './popups/Burgers';
import Chicken from './popups/Chicken';
import Desserts from './popups/Desserts';
import Salads from './popups/Salads';
import Seasonal from './popups/Seasonal';
import Add from './popups/Add';
import Beverages from './popups/Beverages';

function ServerSide(){
    const serverName = "Jane Doe";
    const OrderNum = '001';

    const [cart, setCart] = useState([]);
 
    const addToCart = async(product) => {
        // Check if duplicates and add to quantity
        console.log(product);
        let addingProduct = {
        'name': "name",
        'quantity': 1,
        'totalAmount': 100,
      }
      setCart([...cart, addingProduct]);
      console.log(cart);
    };

    const clear = async() => {
        const newCart = cart.filter(cartItem => cartItem [0]);
        setCart(newCart);
    };

    const remove = async(product) => {
        // if duplicate only remove 1
        // const newCart =cart.filter(cartItem => cartItem.id !== product.id);
        const newCart = cart.filter(cartItem => cartItem [0]);
        setCart(newCart);
    };

    //This is where you would get the list of all the items and prices
    return(
    <>
        <div className="wrapper">
            <div className="box1">
            <Button variant="danger" href="/Inventory" style = {styles.logout}>
                Logout
            </Button>

            <label style = {styles.name} >Server: {serverName}</label>
            </div>

            <div className="box2">
            <Button variant="warning" onClick ={() => clear()}  style = {styles.logout}>
                Clear
            </Button>

            <label style = {styles.name} >Order #: {OrderNum} </label>
            </div>
            <Search />
            <Order cart = {addToCart}/>
            {/* Start Of Cart */}
            <div className="box3">
            <h5 style={styles.catg}>Cart</h5 >
            <table className='table table-light'>
                <thead>
                    <tr>
                        <td>Item</td>
                        <td>QTY</td>
                        <td>Price</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {/* cart.map((cartProduct, key) => <tr key={key}>
                      <td>{cartProduct.name}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.totalAmount}</td>
                      <td>
                        <button className='btn btn-danger btn-sm' onClick={() => remove(cartProduct)}>Remove</button>
                      </td>

                    </tr>) */}
                    {cart.map(item => {
                    return (
                        <tr>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.totalAmount}</td>
                        <td>
                            <Button variant='danger' onClick={() => remove("item")}> Remove</Button>
                        </td>
                        </tr>
                    );
                    })} 
                </tbody>
            </table>
            <h2 className='px-2 text-black' style={styles.amnt}>Total amount: $$$</h2>

            <div>
                <Button style = {styles.pay}>
                    Pay Now
                </Button>
            </div>
        </div>
        {/* End of Cart */}
            
            <div className="box5">
                <Burgers />
                <Chicken />
                <Desserts />
                <Beverages />
                <Salads />
                <Seasonal />
                <Add />

                <Button style = {styles.catagory} onClick = {() => addToCart("item")}>
                    TEST
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
    },
    search:{
        marginTop: '5px',
    },
    pay:{
        alignItems: 'center',
        width: '400px'
    },
    amnt:{
        marginLeft: '55px'
    },
    catg:{
        backgroundColor: '#eee',
        padding: '5px 5px 5px 5px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    logout:{
        marginTop: '1px',
        marginLeft: '5px',
    },
    name:{
        marginTop: '2px',
        fontSize: '24px',
        fontWeight: 'bold',
        marginLeft: '60px',
    },
};