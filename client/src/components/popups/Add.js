import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import fries from './project3_foodpics/fries.jpg'
import loadedFries from './project3_foodpics/loadedFries.jpg'

function Add(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button style = {styles.catagory} onClick={handleShow}>
        Add-ons
     </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={styles.headFoot}>
          <Modal.Title>Add-on Options</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.back}>Select:
          <>
          <div class="relative">
              <img class="scale-75" src={fries} alt="fries"></img>
              <button style = {styles.btn} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="frenchFries" value = "2.69" onClick={e => props.function(e.target.name,e.target.value)}>Fries</button>
          </div>
          </>
          <>
          <div class="relative">
              <img class="scale-75" src={loadedFries} alt="loadedFries"></img>
              <button style = {styles.btn2} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="loadedFries" value = "6.49" onClick={e => props.function(e.target.name,e.target.value)}>Loaded Fries</button>
          </div>
          </>

        </Modal.Body>
        <Modal.Footer style={styles.headFoot}>
          <Button variant="secondary" onClick={handleClose} style={styles.close}>
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
    },
    btn:{
      marginTop: '270px',
    },
     btn2:{
      marginTop: '300px',
    },
    img:{

    },
    back:{
      backgroundColor: '#4C4E52',
      color: 'white'
    },
    headFoot:{
      backgroundColor: '#6F7378',
      color: 'white'
    },
    close:{
      backgroundColor: '#4C4E52',
      color: 'white'
    }
};