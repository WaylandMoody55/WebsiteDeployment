import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import vanshake from './project3_foodpics/vanshake.jpg'
import chocshake from './project3_foodpics/chocshake.webp'
import strawshake from './project3_foodpics/strawshake.jpg'
import vancream from './project3_foodpics/vanicecream.webp'
import choccream from './project3_foodpics/chocicecream.webp'
import strawcream from './project3_foodpics/strawicecream.jpg'
import cookiesand from './project3_foodpics/cookiesand.jpg'

function Desserts(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //Translate Stuff 
  const[buttonText, setButtonText] = useState("Desserts");
  let reqButtonText = "Desserts";

  const[modalTitleText, setModalTitleText] = useState("Dessert Options");
  let reqModalTitleText = "Dessert Options";

  const[selectText, setSelectText] = useState("Select");
  let reqSelectText = "Select";
  
  const[closeText, setCloseText] = useState("Close");
  let reqCloseText = "Close";

  const[vanShakeText, setVanShakeText] = useState("Vanilla Shake");
  let reqVanShakeText = "Vanilla Shake";

  const[chocShakeText, setChocShakeText] = useState("Chocolate Shake");
  let reqChocShakeText = "Chocolate Shake";

  const[strawShakeText, setStrawShakeText] = useState("Strawberry Shake");
  let reqStrawShakeText = "Strawberry Shake";

  const[vanIceText, setVanIceText] = useState("Vanilla Ice Cream");
  let reqVanIceText = "Vanilla Ice Cream"

  const[chocIceText, setChocIceText] = useState("Chocolate Ice Cream");
  let reqChocIceText = "Chocolate Ice Cream"

  const[strawIceText, setStrawIceText] = useState("Strawberry Ice Cream");
  let reqStrawIceText = "Strawberry Ice Cream"

  const[cookSandText, setCookSandText] = useState("Cookie Sandwich");
  let reqCookSandText = "Cookie Sandwich"

  if(props.language != "EN"){
    props.translate(props.language,reqButtonText,setButtonText);
    props.translate(props.language,reqModalTitleText,setModalTitleText);
    props.translate(props.language,reqSelectText,setSelectText);
    props.translate(props.language,reqCloseText,setCloseText);

    props.translate(props.language,reqVanShakeText,setVanShakeText);
    props.translate(props.language,reqChocShakeText,setChocShakeText);
    props.translate(props.language,reqStrawShakeText,setStrawShakeText);

    props.translate(props.language,reqVanIceText,setVanIceText);
    props.translate(props.language,reqChocIceText,setChocIceText);
    props.translate(props.language,reqStrawIceText,setStrawIceText);

    props.translate(props.language,reqCookSandText,setCookSandText);

  }

  return (
    <>
      <Button style = {styles.catagory} onClick={handleShow}>
        {buttonText}
     </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitleText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectText}:
        <>
        <div class="relative">
            <img class="scale-75" src={vanshake} alt="vanillaShake"></img>
            <button style = {styles.btn} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="aggieShakeVanilla" value = "4.49" onClick={e => props.function(e.target.name,e.target.value,vanShakeText)}>{vanShakeText}</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={chocshake} alt="chocShake"></img>
            <button style = {styles.btn} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="aggieShakeChocolate" value = "4.49" onClick={e => props.function(e.target.name,e.target.value,chocShakeText)}>{chocShakeText}</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={strawshake} alt="strawShake"></img>
            <button style = {styles.btn2} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="aggieShakeStrawberry" value = "4.49" onClick={e => props.function(e.target.name,e.target.value,strawShakeText)}>{strawShakeText}</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={vancream} alt="vanCream"></img>
            <button style = {styles.btn} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="iceCreamCupVanilla" value = "3.29" onClick={e => props.function(e.target.name,e.target.value,vanIceText)}>{vanIceText}</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={choccream} alt="chocCream"></img>
            <button style = {styles.btn} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="iceCreamCupChocolate" value = "3.29" onClick={e => props.function(e.target.name,e.target.value,chocIceText)}>{chocIceText}</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={strawcream} alt="strawCream"></img>
            <button style = {styles.btn} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="iceCreamCupStrawberry" value = "3.29" onClick={e => props.function(e.target.name,e.target.value,strawIceText)}>{strawIceText}</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={cookiesand} alt="cookieSandwich"></img>
            <button style = {styles.btn} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="cookieSandwich" value = "4.49" onClick={e => props.function(e.target.name,e.target.value,cookSandText)}>{cookSandText}</button>
        </div>
        </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {closeText}
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Desserts;

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
    btn:{
      marginTop: '150px',
    },
     btn2:{
      marginTop: '290px',
    },
    img:{

    }
};