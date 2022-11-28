import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Seasonal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[seasonal,setSeasonal] = useState([])

  async function getSeasonalItems(){
    try {
      const res = await fetch("/seasonalItems", {
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
      setSeasonal(data);

  }
  catch (err) {
      console.log(err.messeage);
  }
  }


  useEffect(()=>{
    getSeasonalItems();
  })

  return (
    <>
      <Button style = {styles.catagory} onClick={handleShow}>
        Seasonal Items
     </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Seasonal Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>Select:
          {seasonal.map(item => {
            return(
              <button class = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" name = {item.name} value = {item.price} onClick={e => props.function(e.target.name,e.target.value)}>{item.name} </button>
            );
          })
          }
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

export default Seasonal;

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