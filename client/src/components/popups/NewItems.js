import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function NewItems(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newItems, setNewItems] = useState([]);

  async function getNewItems(){
    try {
      const res = await fetch("/newItems", {
        method: "post",
        mode : "cors",
        // cache: 'no-cache',
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
          // "Accept": "application/json"
        }
      });
      if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
      }

      const data = await res.json();
      setNewItems(data);

    }
    catch (err) {
      console.log(err.messeage);
    } 
  }
  
  useEffect(()=>{
    getNewItems();
  })

  return (
    <>
      <Button style = {styles.catagory} onClick={handleShow}>
        New Items
     </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>Select:
          {newItems.map(item => {
            return(
              <>
              <p>
                <button class = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" name = {item.name} value = {item.price} onClick={e => props.function(e.target.name,e.target.value)}>{item.name} </button>
              </p>
              </>
              
            );
          })}
        </Modal.Body>
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