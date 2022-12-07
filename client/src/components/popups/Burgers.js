import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import burger from './project3_foodpics/burger.jpg'
import cheeseburger from './project3_foodpics/cheeseburger.webp'
import bacon from './project3_foodpics/baconCheeseburger.webp'
import blackbean from './project3_foodpics/blackbeanburger.webp'
import pattyMelt from './project3_foodpics/pattymelt.jpg'

function Burgers(props) {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //Translate Stuff
  const[buttonText, setButtonText] = useState("Burgers");
  let reqButtonText = "Burgers";

  const[modalTitleText, setModalTitleText] = useState("Burger Options");
  let reqModalTitleText = "Burger Options";

  const[selectText, setSelectText] = useState("Select");
  let reqSelectText = "Select";

  const[closeText, setCloseText] = useState("Close");
  let reqCloseText = "Close";

  const[classicBurgerText, setClassicBurgerText] = useState("Classic Burger");
  let reqClassicBurgerText = "Classic Burger";

  const[cheeseBurgerText, setCheeseBurgerText] = useState("Cheese Burger");
  let reqCheeseBurgerText = "Cheese Burger";

  const[baconBurgerText, setBaconBurgerText] = useState("Bacon Burger");
  let reqBaconBurgerText = "Bacon Burger";

  const[blackBeanText, setBlackBeanText] = useState("Black-Bean Burger");
  let reqBlackBeanText = "Black-Bean Burger";

  const[pattyMeltText, setPattyMeltText] = useState("Gig Em Patty Melt")
  let reqPattyMeltText = "Gig Em Patty Melt";




  if(props.language != "EN"){
    props.translate(props.language,reqButtonText,setButtonText);
    props.translate(props.language,reqModalTitleText,setModalTitleText);
    props.translate(props.language,reqSelectText,setSelectText);
    props.translate(props.language,reqCloseText,setCloseText);
    
    props.translate(props.language,reqClassicBurgerText,setClassicBurgerText);
    props.translate(props.language,reqCheeseBurgerText,setCheeseBurgerText);
    props.translate(props.language,reqBaconBurgerText,setBaconBurgerText);
    props.translate(props.language,reqBlackBeanText,setBlackBeanText);
    props.translate(props.language,reqPattyMeltText,setPattyMeltText);
    


  }

  return (
    <>
      <Button style = {styles.catagory} onClick={handleShow}>
        {buttonText}
     </Button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton style = {styles.headFoot}>
          <Modal.Title>{modalTitleText}</Modal.Title>
        </Modal.Header>
        <Modal.Body style = {styles.back}>{selectText}:
        <>
        <div class="relative">
            <img class="scale-75" src={burger} style = {styles.img} alt="burger"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style = {styles.btn} name="classicBurger" value = "6.49" onClick={e => props.function(e.target.name,e.target.value,classicBurgerText)}>{classicBurgerText}</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={cheeseburger} alt="cheeseBurger"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style = {styles.btn} name="cheeseBurger" value = "6.99" onClick={e => props.function(e.target.name,e.target.value,cheeseBurgerText)}>{cheeseBurgerText}</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={bacon} alt="baconBurger"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style = {styles.btn} name="baconBurger" value = "7.89" onClick={e => props.function(e.target.name,e.target.value,baconBurgerText)}>{baconBurgerText}</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={blackbean} alt="blackBean"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style = {styles.btn2} name="blackBeanBurger" value = "7.29" onClick={e => props.function(e.target.name,e.target.value,blackBeanText)}>{blackBeanText}</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={pattyMelt} alt="pattyMelt"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style = {styles.btn2} name="gigemPattyMelt" value = "7.29" onClick={e => props.function(e.target.name,e.target.value,pattyMeltText)}>{pattyMeltText}</button>
        </div>
        </>
        </Modal.Body>
        <Modal.Footer style = {styles.headFoot}>
          <Button variant="secondary" onClick={handleClose} style = {styles.close}>
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

export default Burgers;

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
      marginTop: '140px',
    },
    img:{

    },
    back:{
      backgroundColor: '#4C4E52',
      color: 'white'
    },
    headFoot:{
      backgroundColor: '#6F7378',
      color: 'white'
    },
    close:{
      backgroundColor: '#4C4E52',
      color: 'white'
    }
};