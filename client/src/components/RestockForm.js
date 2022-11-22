import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useRef } from 'react';

function RestockForm(){
    const [show, setShow] = useState(false);
    const [restockID, setRestockID] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    //Three functions, one for ID, one for quantity, one for update
    const item = useRef(null);
    const vendor = useRef(null);
    const quantity = useRef(null);
    
    var id = 0;
    
    //getting restockID, 
    async function getRestockID(){
        
        const postData = {
            name: item.current.value,
            vendor: vendor.current.value,
            quantity: quantity.current.value
        };
        
        
        try {
            const res = await fetch("/restockID", {
                method: "post",
                mode : "cors",
                // cache: 'no-cache',
                headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
                // "Accept": "application/json"
                },
                body: JSON.stringify(postData),
            });
            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }
    
            // grabs data from server response 
            const data = await res.json()
            //console.log(data.max)
            
            //const updateID = data.max
            //console.log(updateID);
            //setRestockID(updateID);
            //id = data.max;
            //console.log("ID inside get ID is :: "+id);

        }
        catch (err) {
            console.log(err.messeage);
        }
    }
    //const id = restockID
    


    async function updateRestock(){
        const postData = {
            name: item.current.value,
            quantity: quantity.current.value
        };
        
        console.log("sending name: " + item.current.value)
        console.log("sending q: " + quantity.current.value)

        try {
            const res = await fetch("/updateRestock", {
                method: "post",
                mode : "cors",
                // cache: 'no-cache',
                headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
                // "Accept": "application/json"
                },
                body: JSON.stringify(postData),
            });
            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }
        }
        catch (err) {
            console.log(err.messeage);
        }
    }
    


    return(
        <>
        <Button variant="primary" onClick={handleShow}>
                    Restock Form
                </Button>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Submit Restock Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) =>{
                            handleClose();
                            e.preventDefault();
                            getRestockID();
                            updateRestock();
                        }}
                        id="restockForm" className="w-full max-w-sm">
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="name">
                                        Ingredient
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="itemName" type="text" defaultValue="" placeholder="Ingredient Name" ref={item}/>
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="Vendor">
                                        Vendor
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="newPrice" type="text" defaultValue="" placeholder="Vendor Name" ref={vendor}/>
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="quantity">
                                        Quantity
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="newPrice" type="text" defaultValue="" placeholder="0.00" ref={quantity}/>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" form = "restockForm">Submit Restock Form</button>
                    </Modal.Footer>
                </Modal>
        </>

    );
}

export default RestockForm;