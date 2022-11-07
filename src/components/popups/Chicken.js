import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import chickensand from './project3_foodpics/chickensand.webp'
import spicychickensand from './project3_foodpics/spicychickensand.webp'
import chickentenders from './project3_foodpics/chickentenders.jpg'

function Chicken(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button style = {styles.catagory} onClick={handleShow}>
        Chicken
     </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chicken Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>Select:
        <>
        <div class="relative">
            <img class="scale-75" src={chickensand} alt="chickenSand"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="Chicken Sandwich" value = "40" onClick={e => props.function(e.target.name,e.target.value)}>Chicken Sandwich</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={spicychickensand} alt="spicyChickenSand"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="Spicy Chicken Sandwich" value = "40" onClick={e => props.function(e.target.name,e.target.value)}>Spicy Chicken Sandwich</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={chickentenders} alt="chickenTenders"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="Chicken Tenders" value = "40" onClick={e => props.function(e.target.name,e.target.value)}>Chicken Tenders</button>
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

export default Chicken;

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