import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useRef, useState } from 'react';

function RemoveSeasonal(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const itemName = useRef(null);

    async function removeSeasonal(){
        console.log(itemName.current.value);

        const postData = {
            name: itemName.current.value
        };

        try{
            const res = await fetch("/removeSeasonal",{
                method: "post",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value",
                },
                body: JSON.stringify(postData),
            });

            if(!res.ok){
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }
        }
        catch(err){
            console.log(err.message);
        }


    }


    return(
        <>
            <Button variant="primary" onClick={handleShow}>
                    Remove Seasonal Item
            </Button>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton style={styles.headFoot}>
                    <Modal.Title>Remove Seasonal Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={styles.back}>
                        <form onSubmit={(e) =>{
                            //console.log("clicked on remove");
                            handleClose();
                            e.preventDefault();
                            removeSeasonal();
                        }}
                        id="removeSeasonal" className="w-full max-w-sm">
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="name">
                                        Seasonal Item
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="seasonalItemName" type="text" defaultValue="" placeholder="Seasonal Item Name" ref = {itemName}/>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer style={styles.headFoot}>
                    <Button variant="secondary" onClick={handleClose} style={styles.close}>
                        Close
                    </Button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" form = "removeSeasonal">Remove Seasonal Item</button>
                    </Modal.Footer>
                </Modal>
        </>

    );
}

export default RemoveSeasonal;

const styles = {
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