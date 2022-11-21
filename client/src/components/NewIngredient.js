import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useRef } from 'react';

function NewIngredient(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const itemName = useRef(null);
    const quantity = useRef(null);
    const price = useRef(null);
    const units = useRef(null);
    const storage = useRef(null);

    async function newIngredient(){
        const postData = {
            name: itemName.current.value,
            amount: quantity.current.value,
            price: price.current.value,
            units: units.current.value,
            storage: storage.current.value
        };
        try{
            const res = await fetch("/newIngredient",{
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
                    Add New Ingredient
                </Button>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Add New Ingredient</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) =>{
                            handleClose();
                            e.preventDefault();
                            newIngredient();
                        }}
                        id="newIngredient" className="w-full max-w-sm">
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="name">
                                        New Ingredient Name
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="newIngredientName" type="text" defaultValue="" placeholder="Ingredient Name" ref={itemName}/>
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="quantity">
                                        Quantity
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="newIngredientQuantity" type="text" defaultValue="" placeholder="0.00" ref={quantity}/>
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="individualPrice">
                                        Individual Price
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="individualPrice" type="text" defaultValue="" placeholder="0.00" ref={price}/>
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="units">
                                        Units
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="units" type="text" defaultValue="" placeholder="pounds/individual" ref={units}/>
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="units">
                                        Storage
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="storage" type="text" defaultValue="" placeholder="shelf/frozen/etc" ref={storage}/>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" form = "newIngredient">Add New Ingredient</button>
                    </Modal.Footer>
                </Modal>
        </>

    );
}

export default NewIngredient;