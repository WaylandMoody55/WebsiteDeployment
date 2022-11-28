import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function NewItems(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newItems, setNewItems] = useState([]);

  
  


  return (
    <>
      <Button style = {styles.catagory} onClick={handleShow}>
        New Items
     </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>Select:</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewItems;

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