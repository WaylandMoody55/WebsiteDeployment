import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import chickensand from './project3_foodpics/chickensand.webp'
import spicychickensand from './project3_foodpics/spicychickensand.webp'
import chickentenders from './project3_foodpics/chickentenders.jpg'

function Chicken() {
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
        <Button><img src={chickensand} alt="chicken sandwich" /></Button>
        <Button><img src={spicychickensand} alt="spicy chicken sandwich" /></Button>
        <Button><img src={chickentenders} alt="chicken tenders" /></Button>
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