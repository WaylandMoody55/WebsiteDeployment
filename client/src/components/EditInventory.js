import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useRef } from 'react';

function EditInventory(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const itemName = useRef(null);
    const quantity = useRef(null);

    async function editIneventory(){
        const postData = {
            name: itemName.current.value,
            amount: quantity.current.value
        };

        try{
            const res = await fetch("/editInventory",{
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
                    Edit Inventory
                </Button>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton style={styles.headFoot}>
                    <Modal.Title>Edit Inventory</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={styles.back}>
                        <form onSubmit={(e) =>{
                            handleClose();
                            e.preventDefault();
                            editIneventory();
                        }}
                        id="editInventory" className="w-full max-w-sm">
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block white font-bold md:text-right mb-1 md:mb-0 pr-4" for="name">
                                        Ingredient Name
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="ingredientName" type="text" defaultValue="" placeholder="Ingreident Name" ref={itemName}/>
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="quantity">
                                        New Quantity
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="newQuantity" type="text" defaultValue="" placeholder="0.00" ref={quantity}/>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer style={styles.headFoot}>
                    <Button variant="secondary" onClick={handleClose} style={styles.close}>
                        Close
                    </Button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" form = "editInventory">Edit Inventory</button>
                    </Modal.Footer>
                </Modal>
        </>

    );
}

export default EditInventory;

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