import Button from 'react-bootstrap/Button';
import React, { Component, useState, useEffect, useRef } from 'react';

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

function ServerSide(){
    let numberReady = true
    let nameReady = false
    // const serverName = "Jane Doe";
    let today = new Date();
    let day = ""
    if (today.getDate() < 10) {
        day = "0" + today.getDate()
    }
    const date = (today.getMonth() + 1) + "/" + day + "/" + today.getFullYear()
    const testName = "test";
    const testAmount = 1000000;

    const [menuItemPrices, setMenuPrices] = useState(true)
    const [cart, setCart] = useState([]);
    const [show, setOrderNum] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [serverName, setName] = useState("employee")
    const serverID = sessionStorage.getItem('loginNum')
    const [seasonal,setSeasonal] = useState([])
    const [newItems, setNewItems] = useState([])
    async function orderNumber() {
          try {
            const res = await fetch("/orderNumber", {
              method: "get",
              mode : "cors",
              // cache: 'no-cache',
              headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
                // "Accept": "application/json"
              },
            });
  
            if (!res.ok) {
              const message = `An error has occured: ${res.status} - ${res.statusText}`;
              throw new Error(message);
            }
  
            // grabs data from server response 
            const data = await res.json()
            console.log(data)
            setOrderNum(data.max +1)
        }

            catch (err) {
                console.log(err.messeage);
            }
    }
    // async function getMenuItemPrices() {
    //     try{
    //         const res = await fetch("/getMenuItemPrices",{
    //         method: "get",
    //         mode: "cors",
    //         headers: {
    //                 "Content-Type": "application/json",
    //                 "x-access-token": "token-value",
    //                 },
    //         });
            
    //         if(!res.ok){
    //         const message = `An error has occured: ${res.status} - ${res.statusText}`;
    //             throw new Error(message);
    //         }

    //         const data = await res.json()
    //         // console.log(data)
    //         setMenuPrices(data)
    //         console.log(menuItemPrices)
            
            
    //     }
    //     catch(err){
    //         console.log(err.message);
    //     }
    // }

    async function getServerName() {
        const postData = {
            employeeID: serverID
        };
        try{
            const res = await fetch("/getEmployeeName",{
            method: "post",
            mode: "cors",
            headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value",
                    },
                body: JSON.stringify(postData),
            });
            
            if(!res.ok){
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }

            const data = await res.json()
            setName(data.firstname + " " + data.lastname)
            
            
        }
        catch(err){
            console.log(err.message);
        }
    }


    async function getNewItems(){
        try {
          const res = await fetch("/newItems", {
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
    
          const data = await res.json();
          setNewItems(data);
    
        }
        catch (err) {
          console.log(err.messeage);
        } 
      }

      async function getSeasonalItems(){
        try {
          const res = await fetch("/seasonalItems", {
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
    
          const data = await res.json();
          setSeasonal(data);
    
        } 
      catch (err) {
          console.log(err.messeage);
      }
      }

    



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
        setCart([]);
        setTotalAmount(0);
    };

    // updated way to send order that fixes race issues
    async function sendOrder(price) {
        var itemArray = new Array()
        cart.map(item => {
            for (let i = 0; i < item.quantity; i++){
                console.log(item.name);
                itemArray.push(item.name)
            }
            })
            console.log(itemArray)
        const postData = {
            onum: show, 
            price: price,
            date: date,
            itemlist: itemArray
        }

        try{
            const res = await fetch("/sendOrder",{
            method: "post",
            mode: "cors",
            headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value",
                    },
                body: JSON.stringify(postData),
            });
            
            if(!res.ok){
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }

            const data = await res.json()
            console.log(data)
            
        }
        catch(err){
            console.log(err.message);
        }


    }

    // async function Oinsert(price){
        
    //     const postData = {
    //         onum: show,
    //         price: price,
    //         date: date
    //     };
            
    //     try{
    //         const res = await fetch("/updateO",{
    //         method: "post",
    //         mode: "cors",
    //         headers: {
    //                 "Content-Type": "application/json",
    //                 "x-access-token": "token-value",
    //                 },
    //             body: JSON.stringify(postData),
    //         });
            
    //         if(!res.ok){
    //         const message = `An error has occured: ${res.status} - ${res.statusText}`;
    //             throw new Error(message);
    //         }

    //         const data = await res.json()
    //         console.log(data)
            
    //     }
    //     catch(err){
    //         console.log(err.message);
    //     }
    // }

    // async function OPTitem(item){
        
    //     const postData = {
    //         onum: show,
    //         oitem: item,
    //         date: date

            
    //     };
            
    //     try{
    //         const res = await fetch("/updateOPT",{
    //         method: "post",
    //         mode: "cors",
    //         headers: {
    //                 "Content-Type": "application/json",
    //                 "x-access-token": "token-value",
    //                 },
    //             body: JSON.stringify(postData),
    //         });
            
    //         if(!res.ok){
    //         const message = `An error has occured: ${res.status} - ${res.statusText}`;
    //             throw new Error(message);
    //         }
    //         const data = await res.json()
    //         console.log(data)
            
    //     }
    //     catch(err){
    //         console.log(err.message);
    //     }
    // }

    // async function updateIngredients(){
        
    //     const postData = {
    //         onum: show
    //     };
            
    //     try{
    //         const res = await fetch("/updateIngredients",{
    //         method: "post",
    //         mode: "cors",
    //         headers: {
    //                 "Content-Type": "application/json",
    //                 "x-access-token": "token-value",
    //                 },
    //             body: JSON.stringify(postData),
    //         });
            
    //         if(!res.ok){
    //         const message = `An error has occured: ${res.status} - ${res.statusText}`;
    //             throw new Error(message);
    //         }
    //         const data = await res.json()
    //         console.log(data)
            
    //     }
    //     catch(err){
    //         console.log(err.message);
    //     }
    // }

    // async function fillOPT(){
    //     var itemArray = new Array()
    //     cart.map(item => {
    //         for (let i = 0; i < item.quantity; i++){
    //             console.log(item.name);
    //             itemArray.push(item.name)
    //             // OPTitem(item.name);
    //             // const [items, setItems] = useState([]);

    //             // const postData2 = {
    //             //     name: item.name
    //             // }
    //             // try {
    //             //     const res = await fetch("/getIng", {
    //             //         method: "post",
    //             //         mode : "cors",
    //             //         // cache: 'no-cache',
    //             //         headers: {
    //             //         "Content-Type": "application/json",
    //             //         "x-access-token": "token-value",
    //             //         // "Accept": "application/json"
    //             //         },
    //             //         body: JSON.stringify(postData2)
    //             //     });
            
    //             //     if (!res.ok) {
    //             //         const message = `An error has occured: ${res.status} - ${res.statusText}`;
    //             //         throw new Error(message);
    //             //     }
            
    //             //     // grabs data from server response 
    //             //     const data = await res.json()
                    
    //             //     console.log(data)
        
    //             //     setItems(data);
    //             // }
    //             // catch (err) {
    //             //     console.log(err.messeage);
    //             // }
    //             // items.map( ing => {
    //             //     const postData3 =  {
    //             //         name: ing.name
    //             //     }
    //             //     try {
    //             //         const res = await fetch("/rmItem", {
    //             //             method: "post",
    //             //             mode : "cors",
    //             //             // cache: 'no-cache',
    //             //             headers: {
    //             //             "Content-Type": "application/json",
    //             //             "x-access-token": "token-value",
    //             //             // "Accept": "application/json"
    //             //             },
    //             //             body: JSON.stringify(postData3)
    //             //         });
                
    //             //         if (!res.ok) {
    //             //             const message = `An error has occured: ${res.status} - ${res.statusText}`;
    //             //             throw new Error(message);
    //             //         }
                
    //             //         // grabs data from server response 
    //             //         const data = await res.json()
                        
    //             //         console.log(data)
    //             //     }
    //             //     catch (err) {
    //             //         console.log(err.messeage);
    //             //     }
    //             // })
    //         }
    //     })
    
    // };

    // function fillO(){
    //     Oinsert(totalAmount);
    // }
    async function processOrder(){
        // fillOPT();
        // //something bad happens
        // fillO();
        // // updateIngredients()
        // updateIngredients();
        sendOrder(totalAmount)
        clear();
        orderNumber()
        orderNumber()
        orderNumber()
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

    useEffect(()=>{
            // getMenuItemPrices();
            getNewItems();
            getSeasonalItems();
            getServerName();
            orderNumber();
    },[])

    if (!menuItemPrices) {
        return <div>Loading...</div>
      }
    
    //This is where you would get the list of all the items and prices
    return(
    <>
        <div className="wrapper">
            <div className="box1">
            <Button variant="danger" href="/Login" style = {styles.logout}>
                Logout
            </Button>

            <label style = {styles.name} >Server: {serverName}</label>
            </div>

            <div className="box2">
            <Button variant="warning" onClick ={() => clear()}  style = {styles.logout}>
                Clear
            </Button>

            <label style = {styles.name} >Order #: {show} </label>
            </div>
            {/* <Search /> */}
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
                        <td>{parseFloat(item.totalAmount).toFixed(2)}</td>
                        <td>
                            <Button variant='danger' onClick={() => remove(item)}> Remove</Button>
                        </td>
                        </tr>
                    );
                    })} 
                </tbody>
            </table>
            <label  style={styles.amnt}>Total amount: ${Math.abs(totalAmount.toFixed(2))}</label>

            <div>
                { totalAmount !== 0 ? <div>
                  <Button style = {styles.pay} onClick ={processOrder}>
                    Pay Now
                </Button>

                </div> : <Button style = {styles.pay} disabled>
                    Pay Now
                </Button>

                }

            </div>
        </div>
        {/* End of Cart */}
            
            <div className="box5">
                {/*
                <Burgers function={addToCart}/>
                <Chicken function={addToCart}/>
                <Desserts function ={addToCart}/>
                <Beverages function ={addToCart}/>
                <Salads function = {addToCart}/>
                <Seasonal />
                <Add function={addToCart}/>
                */}
                {/* <Burgers function={addToCart}/> */}
                <div style = {styles.space}>Burgers</div>
                <Button style = {styles.catag} name="classicBurger" value = "6.5"  onClick={e => addToCart(e.target.name,e.target.value)}>
                    Classic Burger
                </Button>
                <Button style = {styles.catag} name="cheeseBurger" value = "6.99" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Cheese Burger
                </Button>
                <Button style = {styles.catag} name="baconBurger" value = "7.89" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Bacon Burger
                </Button>
                <Button style = {styles.catag} name="blackBeanBurger" value = "7.29" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Black-Bean Burger
                </Button>
                <Button style = {styles.catag} name="gigemPattyMelt" value = "7.29" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Gig Em Patty Melt
                </Button>
                <div style = {styles.space}>Chicken</div>
                {/* <Chicken function={addToCart}/> */}
                <Button style = {styles.catag} name="chickenSandwich" value = "7.49" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Chicken Sandwich
                </Button>
                <Button style = {styles.catag} name="spicyChickenSandwich" value = "7.99" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Spicy Chicken Sandwich
                </Button>
                <Button style = {styles.catag} name="chickenTender" value = "7.49" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Chicken Tenders
                </Button>
                <div style = {styles.space}>Desserts</div>
                {/* <Desserts function ={addToCart}/> */}
                <Button style = {styles.catag} name="aggieShakeVanilla" value = "4.49" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Vanilla Shake
                </Button>
                <Button style = {styles.catag} name="aggieShakeChocolate" value = "4.49" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Chocolate Shake
                </Button>
                <Button style = {styles.catag} name="aggieShakeStrawberry" value = "4.49" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Strawberry Shake
                </Button>
                <Button style = {styles.catag} name="iceCreamCupVanilla" value = "3.29" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Vanilla Ice Cream
                </Button>
                <Button style = {styles.catag} name="iceCreamCupChocolate" value = "3.29" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Chocolate Ice Cream
                </Button>
                <Button style = {styles.catag} name="iceCreamCupStrawberry" value = "3.29" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Strawberry Ice Cream
                </Button>
                <Button style = {styles.catag} name="cookieSandwich" value = "4.49" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Cookie Sandwich
                </Button>
                <div style = {styles.space}> Misc. </div>

                <Button style = {styles.catag} name="comboCharge" value = "3.29" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Combo Charge
                </Button>
                <Button style = {styles.catag} name="comboCharge" value = "2.29" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Fries
                </Button>
                <Button style = {styles.catag} name="comboCharge" value = "7.29" onClick={e => addToCart(e.target.name,e.target.value)}>
                    Loaded Fries
                </Button>

                <div style = {styles.space}>New Items</div>
                {newItems.map(item => {
                    return(
                        <Button style = {styles.catag} name= {item.name} value = {item.price} onClick={e => addToCart(e.target.name,e.target.value)}>
                        {item.name}
                        </Button>
                    )
                })}

                <div style = {styles.space}>Seasonal Items</div>
                {seasonal.map(item => {
                    return(
                        <Button style = {styles.catag} name= {item.name} value = {item.price} onClick={e => addToCart(e.target.name,e.target.value)}>
                        {item.name}
                        </Button>
                    )
                })}

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
        marginLeft: '55px',
        fontWeight: 'bold',
        fontSize: '30px',
    },
    catg:{
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
    catag:{
        width: '150px',
        height: '150px',
        marginLeft: '20px',
        marginTop: '20px',
    },
    space:{
        height: '20px',
        marginLeft: '30px',
        marginTop: '20px',
        fontWeight: 'bold',
    },
};