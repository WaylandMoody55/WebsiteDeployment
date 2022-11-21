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

  return (
    <>
      <Button style = {styles.catagory} onClick={handleShow}>
        Desserts
     </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dessert Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>Select:
        <>
        <div class="relative">
            <img class="scale-75" src={vanshake} alt="vanillaShake"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="aggieShakeVanilla" value = "4.49" onClick={e => props.function(e.target.name,e.target.value)}>Vanilla Shake</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={chocshake} alt="chocShake"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="aggieShakeChocolate" value = "4.49" onClick={e => props.function(e.target.name,e.target.value)}>Chocolate Shake</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={strawshake} alt="strawShake"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="aggieShakeStrawberry" value = "4.49" onClick={e => props.function(e.target.name,e.target.value)}>Strawberry Shake</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={vancream} alt="vanCream"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="iceCreamCupVanilla" value = "3.29" onClick={e => props.function(e.target.name,e.target.value)}>Vanilla Ice Cream</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={choccream} alt="chocCream"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="iceCreamCupChocolate" value = "3.29" onClick={e => props.function(e.target.name,e.target.value)}>Chocolate Ice Cream</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={strawcream} alt="strawCream"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="iceCreamCupStrawberry" value = "3.29" onClick={e => props.function(e.target.name,e.target.value)}>Strawberry Ice Cream</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={cookiesand} alt="cookieSandwich"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="cookieSandwich" value = "4.49" onClick={e => props.function(e.target.name,e.target.value)}>Cookie Sandwich</button>
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
    }
};