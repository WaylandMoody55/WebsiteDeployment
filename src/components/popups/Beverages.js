import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import drink from './project3_foodpics/drink.jpg'


function Beverages(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button style = {styles.catagory} onClick={handleShow}>
        Beverages
     </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Beverage Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>Select:
        <>
        <div class="relative">
            <img class="scale-75" src={drink} alt="drink"></img>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="fountainDrink" value = "2.45" onClick={e => props.function(e.target.name,e.target.value)}>Fountain Drink</button>
        </div>
        </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Beverages;

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