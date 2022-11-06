import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';

function RemoveSeasonal(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                    <Modal.Header closeButton>
                    <Modal.Title>Remove Seasonal Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) =>{
                            handleClose();
                            e.preventDefault();
                        }}
                        id="removeSeasonal" className="w-full max-w-sm">
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="name">
                                        Seasonal Item
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="seasonalItemName" type="text" defaultValue="" placeholder="Seasonal Item Name"/>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" form = "removeSeasonal">Remove Seasonal Item</button>
                    </Modal.Footer>
                </Modal>
        </>

    );
}

export default RemoveSeasonal;