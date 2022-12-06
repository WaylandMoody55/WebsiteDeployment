import Button from 'react-bootstrap/Button';
import React, { Component, useState, useEffect, useReducer} from 'react';

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
import NewItems from './popups/NewItems';
// import Modal from 'react-bootstrap/Modal';
import { GoogleMap, useJsApiLoader, LoadScript, useLoadScript } from '@react-google-maps/api';

var exportLoginNum = 0;
const containerStyle = {
  width: '400px',
  height: '400px',
  marginLeft: '300px',
  marginTop: '20px',
};

const center = {
  lat: 30.61257,
  lng: -96.34074
};

function CustomerSide(){

    
    //Translate Stuff

    //State Variables(need one state and one to translate)
    const[newLang, setNewLang] = useState("EN")
    const[counter, setCounter] = useState(0);
    //Old Variables
    const[ogtext, setOGText] = useState("something to translate") //what is displayed
    let testText = "something to translate" //what actually is being requested



    //New Variables
    const[cartText,setCartText] = useState("Cart");
    let reqCartText = "Cart";

    const[orderNumText, setOrderNumText] = useState("Order");
    let reqOrderNumText = "Order";

    const[itemText, setItemText] = useState("Item");
    let reqItemText = "Item";

    const[qtyText, setQTYText] = useState("QTY");
    let reqQTYText = "QTY";

    const[priceText, setPriceText] = useState("Price")
    let reqPriceText = "Price";

    const[actionText, setActionText] = useState("Action");
    let reqActionText = "Action"

    const[totalAmountText, setTotalAmountText] = useState("Total Amount");
    let reqTotalAmountText = "Total Amount";

    const[firstPayNowText, setFirstPayNowText] = useState("Pay Now");
    let reqFirstPayNowText = "Pay Now";

    const[secondPayNowText, setSecondPayNowText] = useState("Pay Now");
    let reqSecondPayNowText = "Pay Now";

    const[removeText, setRemoveText] = useState("Remove");
    let reqRemoveText = "Remove";

    const[currentLocationText, setCurrentLocationText] = useState("Current Location");
    let reqCurrentLocationText = "Current Location";


    //Two sets for every menu item
        //one for the button name
        //one for the cart name(maybe, might be able to just use the button name inside the cart)
    const[comboChargeText, setComboChargeText] = useState("Combo Charge");
    let reqComboChargeText = "Combo Charge";

    const[quantityText, setQuantityText] = useState(0); 




    //Functions
    async function changeLanguage(toLang,text,setter){
        //Actual fetching
        let fromLang = 'en';  
        //let toLang = 'no'; // translate to norwegian
        //let text = 'something to translate';
        console.log("Translating: " + text + " TO: " + toLang)
    
        const API_KEY = [process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY];
    
        let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
        url += '&q=' + encodeURI(text);
        url += `&source=${fromLang}`;
        url += `&target=${toLang}`;
    
        fetch(url, { 
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
        .then(res => res.json())
        .then((response) => {
          //console.log(response);
          console.log("response from google: ", response.data.translations[0].translatedText);
          setter(response.data.translations[0].translatedText)
        })
        .catch(error => {
          console.log("There was an error with the translation request: ", error);
        });
      }

      
      const handleChange = event => {
        console.log(event.target.value);
        setNewLang(event.target.value);
      };
      
    
    async function translateCustomerSide(){
        //forceUpdate();
        changeLanguage(newLang,reqCartText,setCartText);
        changeLanguage(newLang,reqOrderNumText,setOrderNumText);
        changeLanguage(newLang,reqItemText,setItemText);
        changeLanguage(newLang,reqQTYText,setQTYText);
        changeLanguage(newLang,reqPriceText,setPriceText);
        changeLanguage(newLang,reqActionText,setActionText);
        changeLanguage(newLang,reqTotalAmountText,setTotalAmountText);
        changeLanguage(newLang,reqFirstPayNowText,setFirstPayNowText);
        changeLanguage(newLang,reqSecondPayNowText,setSecondPayNowText);
        changeLanguage(newLang,reqRemoveText,setRemoveText);
        changeLanguage(newLang,reqCurrentLocationText,setCurrentLocationText);
        changeLanguage(newLang,reqComboChargeText,setComboChargeText);
        

        
        
        setNewLang("en")
    }



    
    const [orderNum, setOrderNum] = useState(0);
    const serverName = "Jane Doe";
    let today = new Date();
    let day = ""
    if (today.getDate() < 10) {
        day = "0" + today.getDate()
    }
    const date = (today.getMonth() + 1) + "/" + day + "/" + today.getFullYear()
    console.log(date)
    const testName = "test";
    const testAmount = 1000000;

    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

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
          //console.log(data)
          setOrderNum(data.max +1)
      }

          catch (err) {
              console.log(err.messeage);
          }
  }
    const addToCart = async(menuName,menuPrice,translatedName) => {
        console.log(translatedName)
    
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
                    'translatedName' : translatedName
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
                'translatedName' : translatedName
            }
            setCart([...cart, addingProduct]);
        }
        
    };

    const clear = async() => {
        const newCart = cart.filter(cartItem => cartItem [0]);
        setCart(newCart);
        setTotalAmount(0);
    };

    async function Oinsert(price){
        
        const postData = {
            onum: orderNum,
            price: price,
            date: date
        };
            
        try{
            const res = await fetch("/updateO",{
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

    async function OPTitem(item){ //this is the actual querying
        
        const postData = {
            onum: orderNum,
            oitem: item,
            date: date

            
        };
            
        try{
            const res = await fetch("/updateOPT",{
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

    function fillOPT(){
        cart.map(item => {
            for (let i = 0; i < item.quantity; i++){
                console.log(item.name);
                OPTitem(item.name);
            }
        })
    };




    function fillO(){
        Oinsert(totalAmount);
    }
    async function processOrder(){
        fillOPT();
        //something bad happens
        fillO();


        
        clear();
        orderNumber();
        orderNumber();
        orderNumber();
        orderNumber();
        
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
                    'translatedName': product.translatedName
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
    /*
    useEffect(()=>{
        orderNumber();
    },[orderNum])
    */

    orderNumber();

    const {isLoaded} = useLoadScript({googleMapsApiKey: process.env.REACT_APP_SECRET_GoogleMapsAPIKey})

    if (!isLoaded) {
      return <div>Loading...</div>
    }

    //This is where you would get the list of all the items and prices
    return(
    <>
        <div className="wrapper">
            
            <div className='px-4 py-2'>
                <Button variant="primary" href="/Login">Employee Login</Button>
            </div>
            <div className='px-4 py-2 space-x-2'>
                <select id="selectLang" data-placeholder="Choose a Language..." onChange={handleChange}>
                    <option value="AF">Afrikaans</option>
                    <option value="SQ">Albanian</option>
                    <option value="AR">Arabic</option>
                    <option value="HY">Armenian</option>
                    <option value="EU">Basque</option>
                    <option value="BN">Bengali</option>
                    <option value="BG">Bulgarian</option>
                    <option value="CA">Catalan</option>
                    <option value="KM">Cambodian</option>
                    <option value="ZH">Chinese (Mandarin)</option>
                    <option value="HR">Croatian</option>
                    <option value="CS">Czech</option>
                    <option value="DA">Danish</option>
                    <option value="NL">Dutch</option>
                    <option value="ET">Estonian</option>
                    <option value="FI">Finnish</option>
                    <option value="FR">French</option>
                    <option value="KA">Georgian</option>
                    <option value="DE">German</option>
                    <option value="EL">Greek</option>
                    <option value="GU">Gujarati</option>
                    <option value="HE">Hebrew</option>
                    <option value="HI">Hindi</option>
                    <option value="HU">Hungarian</option>
                    <option value="IS">Icelandic</option>
                    <option value="ID">Indonesian</option>
                    <option value="GA">Irish</option>
                    <option value="IT">Italian</option>
                    <option value="JA">Japanese</option>
                    <option value="JW">Javanese</option>
                    <option value="KO">Korean</option>
                    <option value="LA">Latin</option>
                    <option value="LV">Latvian</option>
                    <option value="LT">Lithuanian</option>
                    <option value="MK">Macedonian</option>
                    <option value="MS">Malay</option>
                    <option value="ML">Malayalam</option>
                    <option value="MT">Maltese</option>
                    <option value="MI">Maori</option>
                    <option value="MR">Marathi</option>
                    <option value="MN">Mongolian</option>
                    <option value="NE">Nepali</option>
                    <option value="NO">Norwegian</option>
                    <option value="FA">Persian</option>
                    <option value="PL">Polish</option>
                    <option value="PT">Portuguese</option>
                    <option value="PA">Punjabi</option>
                    <option value="QU">Quechua</option>
                    <option value="RO">Romanian</option>
                    <option value="RU">Russian</option>
                    <option value="SM">Samoan</option>
                    <option value="SR">Serbian</option>
                    <option value="SK">Slovak</option>
                    <option value="SL">Slovenian</option>
                    <option value="ES">Spanish</option>
                    <option value="SW">Swahili</option>
                    <option value="SV">Swedish </option>
                    <option value="TA">Tamil</option>
                    <option value="TT">Tatar</option>
                    <option value="TE">Telugu</option>
                    <option value="TH">Thai</option>
                    <option value="BO">Tibetan</option>
                    <option value="TO">Tonga</option>
                    <option value="TR">Turkish</option>
                    <option value="UK">Ukrainian</option>
                    <option value="UR">Urdu</option>
                    <option value="UZ">Uzbek</option>
                    <option value="VI">Vietnamese</option>
                    <option value="CY">Welsh</option>
                    <option value="XH">Xhosa</option>
                </select>
            <Button variant="primary" onClick={() => translateCustomerSide()}>
                Translate
            </Button>
            <Button variant="primary" onClick={() => window.location.reload(false)}>
                English
            </Button>

            </div>

            <div className="box2">
            
            <label style = {styles.name} >{orderNumText} #: {orderNum} </label>
            </div>
            {/* <Search /> */}
            <Order cart = {addToCart}/>
            {/* Start Of Cart */}
            <div className="box3">
            <h5 style={styles.catg}>{cartText}</h5 >
            <table className='table table-light'>
                <thead>
                    <tr>
                        <td>{itemText}</td>
                        <td>{qtyText}</td>
                        <td>{priceText}</td>
                        <td>{actionText}</td>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => {
                        console.log(item.name)
                    return (
                        <tr key = {item.name}>
                        <td>{item.translatedName}</td>
                        <td>{item.quantity}</td>
                        <td>{parseFloat(item.totalAmount).toFixed(2)}</td>
                        <td>
                            <Button variant='danger' onClick={() => remove(item)}> {removeText}</Button>
                        </td>
                        </tr>
                    );
                    })} 
                </tbody>
            </table>
            <h2 className='px-2 text-black' style={styles.amnt}>{totalAmountText}: ${totalAmount.toFixed(2)}</h2>

            <div>
                { totalAmount !== 0 ? <div>
                  <Button style = {styles.pay} onClick ={() => processOrder()}>
                    {secondPayNowText}
                </Button>

                </div> : <Button style = {styles.pay}  disabled >
                    {firstPayNowText}
                </Button>

                }

            </div>
        </div>
        {/* End of Cart */}
            
            <div className="box5">
                <Burgers function={addToCart} translate={changeLanguage} language = {newLang}/>
                <Chicken function={addToCart} translate={changeLanguage} language = {newLang}/>
                <Desserts function ={addToCart} translate={changeLanguage} language = {newLang}/>
                <Beverages function ={addToCart} translate={changeLanguage} language = {newLang}/>
                <Salads function = {addToCart} translate={changeLanguage} language = {newLang}/>
                <Add function={addToCart}  translate={changeLanguage} language = {newLang}/>
                <Button style = {styles.catagory} name="comboCharge" value = "3.29"  onClick={e => addToCart(e.target.name,e.target.value,comboChargeText)}>
                    {comboChargeText}
                </Button>
                <NewItems function = {addToCart} translate={changeLanguage} language = {newLang}/>
                <Seasonal function = {addToCart} translate={changeLanguage} language = {newLang}/>



                <h3>{currentLocationText}: </h3>

                <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={18}
                >
                </GoogleMap>

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
        marginLeft: '130px',
    },
};