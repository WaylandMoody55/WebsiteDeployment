import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import drink from './project3_foodpics/drink.jpg'


function Beverages(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Translation stuff
  const[buttonText, setButtonText] = useState("Beverages");
  let reqButtonText = "Beverages";

  const[modalTitleText, setModalTitleText] = useState("Beverage Options");
  let reqModalTitleText = "Beverage Options";

  const[selectText, setSelectText] = useState("Select");
  let reqSelectText = "Select";

  const[closeText, setCloseText] = useState("Close");
  let reqCloseText = "Close";

  const[fountainDrinkText, setFountainDrinkText] = useState("Fountain Drink");
  let reqFountainDrinkText = "Fountain Drink";


  if(props.language != "EN"){
    props.translate(props.language,reqButtonText,setButtonText);
    props.translate(props.language,reqModalTitleText,setModalTitleText);
    props.translate(props.language,reqSelectText,setSelectText);
    props.translate(props.language,reqCloseText,setCloseText);
    props.translate(props.language,reqFountainDrinkText,setFountainDrinkText);
    


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
            <img class="scale-75" src={drink} alt="drink"></img>
            <button style = {styles.btn} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="fountainDrink" value = "2.45"  onClick={e => props.function(e.target.name,e.target.value,fountainDrinkText)}>{fountainDrinkText}</button>
        </div>
        </>
        </Modal.Body>
        <Modal.Footer style={styles.headFoot}>
          <Button variant="secondary" onClick={handleClose} style={styles.close}>
            {closeText}
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
    },
    btn:{
      marginTop: '150px',
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