import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import chickensand from './project3_foodpics/chickensand.webp'
import spicychickensand from './project3_foodpics/spicychickensand.webp'
import chickentenders from './project3_foodpics/chickentenders.jpg'

function Chicken(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //Tranalste Stuff
  const[buttonText, setButtonText] = useState("Chicken");
  let reqButtonText = "Chicken";

  const[modalTitleText, setModalTitleText] = useState("Chicken Options");
  let reqModalTitleText = "Chicken Options";

  const[selectText, setSelectText] = useState("Select");
  let reqSelectText = "Select";

  const[closeText, setCloseText] = useState("Close");
  let reqCloseText = "Close";

  const[chickenSandText, setChickenSandText] = useState("Chicken Sandwich");
  let reqChickSandText = "Chicken Sandwich";

  const[sChickenSandText, setSChickenSandText] = useState("Spicy Chicken Sandwich");
  let reqSChickSandText = "Spicy Chicken Sandwich";

  const[chickenTendText, setChickenTendText] = useState("Chicken Tenders");
  let reqChickTendText = "Chicken Tenders";




  if(props.language != "EN"){
    props.translate(props.language,reqButtonText,setButtonText);
    props.translate(props.language,reqModalTitleText,setModalTitleText);
    props.translate(props.language,reqSelectText,setSelectText);
    props.translate(props.language,reqCloseText,setCloseText);

    props.translate(props.language,reqChickSandText,setChickenSandText);
    props.translate(props.language,reqSChickSandText,setSChickenSandText);
    props.translate(props.language,reqChickTendText,setChickenTendText);




  }

  return (
    <>
      <Button style = {styles.catagory} onClick={handleShow}>
        {buttonText}
     </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitleText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectText}:
        <>
        <div class="relative">
            <img class="scale-75" src={chickensand} alt="chickenSand"></img>
            <button style = {styles.btn} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="chickenSandwich" value = "7.49" onClick={e => props.function(e.target.name,e.target.value,chickenSandText)}>{chickenSandText}</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={spicychickensand} alt="spicyChickenSand"></img>
            <button style = {styles.btn} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="spicyChickenSandwich" value = "7.99" onClick={e => props.function(e.target.name,e.target.value,sChickenSandText)}>{sChickenSandText}</button>
        </div>
        </>
        <>
        <div class="relative">
            <img class="scale-75" src={chickentenders} alt="chickenTenders"></img>
            <button style = {styles.btn} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="chickenTender" value = "7.49" onClick={e => props.function(e.target.name,e.target.value,chickenTendText)}>{chickenTendText}</button>
        </div>
        </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
    },
    btn:{
      marginTop: '133px',
    },
     btn2:{
      marginTop: '140px',
    },
    img:{

    }
};