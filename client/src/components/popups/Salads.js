import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import salad from './project3_foodpics/ceasarsalad.jpg'

function Salads(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Translate Stuff
  const[buttonText, setButtonText] = useState("Salads");
  let reqButtonText = "Salads";

  const[modalTitleText, setModalTitleText] = useState("Salad Options");
  let reqModalTitleText = "Salad Options";
  
  const[selectText, setSelectText] = useState("Select");
  let reqSelectText = "Select";

  const[closeText, setCloseText] = useState("Close");
  let reqCloseText = "Close";

  const[saladText, setSaladText] = useState("Cesar Salad");
  let reqSaladText = "Cesar Salad";


  if(props.language != "EN"){
    props.translate(props.language,reqButtonText,setButtonText);
    props.translate(props.language,reqModalTitleText,setModalTitleText);
    props.translate(props.language,reqSelectText,setSelectText);
    props.translate(props.language,reqCloseText,setCloseText);

    props.translate(props.language,reqSaladText,setSaladText);
  }



  return (
    <>
      <Button style = {styles.catagory} onClick={handleShow}>
        {buttonText}
     </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={styles.headFoot}>
          <Modal.Title>{modalTitleText}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.back}>{selectText}:
        <>
        <div class="relative">
            <img class="scale-75" src={salad} alt="ceasarSalad"></img>
            <button style = {styles.btn} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="caesarSalad" value = "8.29" onClick={e => props.function(e.target.name,e.target.value,saladText)}>{saladText}</button>
        </div>
        </>
        </Modal.Body>
        <Modal.Footer style={styles.headFoot}>
          <Button variant="secondary" onClick={handleClose} style={styles.close}>
            {closeText}
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Salads;

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
      marginTop: '160px',
    },
     btn2:{
      marginTop: '140px',
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