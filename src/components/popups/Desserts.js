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

function Desserts() {
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
        <Button><img src={vanshake} alt="vanilla shake" /></Button>
        <Button><img src={chocshake} alt="chocolate shake" /></Button>
        <Button><img src={strawshake} alt="strawberry shake" /></Button>
        <Button><img src={vancream} alt="vanilla ice cream" /></Button>
        <Button><img src={choccream} alt="chocolate ice cream" /></Button>
        <Button><img src={strawcream} alt="strawberry ice cream" /></Button>
        <Button><img src={cookiesand} alt="cookie sandwich" /></Button>
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