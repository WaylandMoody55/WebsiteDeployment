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
      const res = await fetch("https://websitebackendtest.onrender.com/seasonalItems", {
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
  }, [])

  //Translate Stuff
  const[buttonText, setButtonText] = useState("Seasonal Items");
  let reqButtonText = "Seasonal Items";

  const[modalTitleText, setModalTitleText] = useState("Seasonal Options");
  let reqModalTitleText = "Seasonal Options";

  const[selectText, setSelectText] = useState("Select");
  let reqSelectText = "Select";

  const[closeText, setCloseText] = useState("Close");
  let reqCloseText = "Close";

  if(props.language != "EN"){
    props.translate(props.language,reqButtonText,setButtonText);
    props.translate(props.language,reqModalTitleText,setModalTitleText);
    props.translate(props.language,reqSelectText,setSelectText);
    props.translate(props.language,reqCloseText,setCloseText);
  }

  return (
    <>
      <Button style = {styles.catagory} onClick={handleShow}>
        {buttonText}
     </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={styles.headFoot}>
          <Modal.Title>{buttonText}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.back}>{selectText}:
          {seasonal.map(item => {
            return(
              <>
              <div class = "relative py-2">
                <button class = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" name = {item.name} value = {item.price} onClick={e => props.function(e.target.name,e.target.value,item.name)}>{item.name} </button>
              </div>
              </>
            );
          })
          }
        </Modal.Body>
        <Modal.Footer style={styles.headFoot}>
          <Button variant="secondary" onClick={handleClose} style={styles.close}>
            {closeText}
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
