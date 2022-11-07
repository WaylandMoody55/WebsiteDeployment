import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Add() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button style = {styles.catagory} onClick={handleShow}>
        Add-ons
     </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add-on Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>Select:</Modal.Body>
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

export default Add;

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