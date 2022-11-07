import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import burger from './project3_foodpics/burger.jpg'
import cheeseburger from './project3_foodpics/cheeseburger.webp'
import bacon from './project3_foodpics/baconCheeseburger.webp'
import blackbean from './project3_foodpics/blackbeanburger.webp'

function Burgers() {
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
        <Button><img src={burger} alt="burger" /></Button> 
        <Button><img src={cheeseburger} alt="cheese burger" /></Button>
        <Button><img src={bacon} alt="bacon burger" /></Button>
        <Button><img src={blackbean} alt="black bean burger" /></Button>
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
    }
};