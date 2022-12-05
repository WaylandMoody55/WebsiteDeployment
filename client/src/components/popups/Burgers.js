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

  return (
    <>
      <Button style = {styles.catagory} onClick={handleShow}>
        Burgers
     </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Burger Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>Select:
        <>
        <div class="relative">
            <img class="scale-75" src={burger} style = {styles.img} alt="burger"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style = {styles.btn} name="classicBurger" value = "6.49" onClick={e => props.function(e.target.name,e.target.value)}>Classic Burger</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={cheeseburger} alt="cheeseBurger"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style = {styles.btn} name="cheeseBurger" value = "6.99" onClick={e => props.function(e.target.name,e.target.value)}>Cheese Burger</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={bacon} alt="baconBurger"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style = {styles.btn} name="baconBurger" value = "7.89" onClick={e => props.function(e.target.name,e.target.value)}>Bacon Burger</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={blackbean} alt="blackBean"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style = {styles.btn2} name="blackBeanBurger" value = "7.29" onClick={e => props.function(e.target.name,e.target.value)}>Black-Bean Burger</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={pattyMelt} alt="pattyMelt"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style = {styles.btn2} name="gigemPattyMelt" value = "7.29" onClick={e => props.function(e.target.name,e.target.value)}>Gig Em Patty Melt</button>
        </div>
        </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
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

    }
};