import Button from 'react-bootstrap/Button';
import React, { Component, useState } from 'react';

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
// import Modal from 'react-bootstrap/Modal';

function CustomerSide(){
    const [show, setShow] = useState(false);

    const serverName = "Jane Doe";
    const OrderNum = '001';

    const testName = "test";
    const testAmount = 1000000;

    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

 
    const addToCart = async(menuName,menuPrice) => {
    
        //Checks if item is already in cart
        let findProductInCart = await cart.find(i=>{
            return i.name === menuName
        });
        let newtotalAmount = totalAmount + parseFloat(menuPrice);
        setTotalAmount(newtotalAmount);

        if(findProductInCart){
            let newCart = [];
            let newItem;

            cart.forEach(cartItem => {
                if(cartItem.name === menuName){
                newItem = {
                    'name': menuName,
                    'quantity': cartItem.quantity + 1,
                    'totalAmount': menuPrice * (cartItem.quantity + 1),
                }
                newCart.push(newItem);
                }else{
                newCart.push(cartItem);
                }

            });
            setCart(newCart);
        }
        else{
            let addingProduct = {
                'name': menuName,
                'quantity': 1,
                'totalAmount': menuPrice,
            }
            setCart([...cart, addingProduct]);
        }
        
    };

    const clear = async() => {
        const newCart = cart.filter(cartItem => cartItem [0]);
        setCart(newCart);
        setTotalAmount(0);
    };

    const remove = async(product) => {
        // if duplicate only remove 1
        // const newCart =cart.filter(cartItem => cartItem.id !== product.id);
        let newtotalAmount = totalAmount - (product.totalAmount/product.quantity);
        setTotalAmount(newtotalAmount);
        let findProductInCart = await cart.find(i=>{
            return i.name === product.name
        });
        if(product.quantity > 1 && findProductInCart){
            let newCart = [];
            let newItem;

            cart.forEach(cartItem => {
                if(cartItem.name === product.name){
                newItem = {
                    'name': product.name,
                    'quantity': cartItem.quantity - 1,
                    'totalAmount': product.totalAmount - (product.totalAmount/cartItem.quantity),
                }
                newCart.push(newItem);
                }else{
                newCart.push(cartItem);
                }

            });
            setCart(newCart);
        }
        else{
            const newCart = cart.filter(cartItem => cartItem.name !== product.name);
            setCart(newCart);
        }


        // var totalPrice = parseFloat(product.totalAmount);
        // var totalQuantity = parseFloat(product.quantity);
        // setTotal(t => t - (totalPrice/totalQuantity)); 
        //console.log(product.totalAmount/product.quantity); //total amount is the overall price per catagory need to somehow find the quantity 

    };

    //This is where you would get the list of all the items and prices
    return(
    <>
        <div className="wrapper">
            <div className="box1">
            <Button variant="primary" href="/Login">Employee Login</Button>
            </div>

            <div className="box2">
            
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
                    {cart.map(item => {
                    return (
                        <tr key = {item.name}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.totalAmount}</td>
                        <td>
                            <Button variant='danger' onClick={() => remove(item)}> Remove</Button>
                        </td>
                        </tr>
                    );
                    })} 
                </tbody>
            </table>
            <h2 className='px-2 text-black' style={styles.amnt}>Total amount: ${totalAmount}</h2>

            <div>
                { totalAmount !== 0 ? <div>
                  <Button style = {styles.pay} onClick ={() => clear()}>
                    Pay Now
                </Button>

                </div> : <Button style = {styles.pay}  disabled >
                    Pay Now
                </Button>

                }

            </div>
        </div>
        {/* End of Cart */}
            
            <div className="box5">
                <Burgers function={addToCart}/>
                <Chicken function={addToCart}/>
                <Desserts function ={addToCart}/>
                <Beverages function ={addToCart}/>
                <Salads function = {addToCart}/>
                <Seasonal />
                <Add function={addToCart}/>

                <Button style = {styles.catagory} name="comboCharge" value = "3.29" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Combo Charge
                </Button>

                {/*<button name="test" value = "20000" onClick={e => addToCart(e.target.name,e.target.value)}>TEST</button> */}
            </div> 
        </div>
    </>


    );
}

export default CustomerSide;

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