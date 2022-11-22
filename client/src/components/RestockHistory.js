import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
// import "./modalResize.css"


function RestockHistory(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /*
    const restockHistory = [
        {restockID: "1", date:"01/01/2022", ingredient: "ingredient1", vendor:"vendor1", quantity: "quantity1"},
        {restockID: "2", date:"01/02/2022", ingredient: "ingredient2", vendor:"vendor2", quantity: "quantity2"},
        {restockID: "3", date:"01/03/2022", ingredient: "ingredient3", vendor:"vendor3", quantity: "quantity3"},
        {restockID: "4", date:"01/04/2022", ingredient: "ingredient4", vendor:"vendor4", quantity: "quantity4"},
        {restockID: "5", date:"01/05/2022", ingredient: "ingredient5", vendor:"vendor5", quantity: "quantity5"},
        {restockID: "6", date:"01/06/2022", ingredient: "ingredient6", vendor:"vendor6", quantity: "quantity6"},
        {restockID: "7", date:"01/07/2022", ingredient: "ingredient7", vendor:"vendor7", quantity: "quantity7"},
    ]
    */

    const[restockHistory, setRestockHistory] = useState([]);

    async function getRestockTable(){
        try {
            const res = await fetch("https://websitebackendtest.onrender.com/restockTable", {
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
            setRestockHistory(data);

        }
        catch (err) {
            console.log(err.messeage);
        }
    }

    useEffect(()=>{
        //console.log("hello from view Edit Menu");
        getRestockTable();
    })

    return(
        <>
        <div className="width-90vm height-90vm">
        <Button variant="primary" onClick={handleShow}>
                    Restock History
        </Button>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Restock History</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class ="px-2 flex justify-center items-center space-x-2">
                            <table class = "table-auto w-full shadow-md mt-5 rounded border-separate border-spacing-y-5 px-2 space-x-2 border-spacing-x-50">
                                <thead>
                                    <tr>
                                    <th>Restock ID</th>
                                    <th>Order Date</th>
                                    <th>Ingredient</th>
                                    <th>Vendor</th>
                                    <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {restockHistory.map(item => {
                                    return (
                                        <tr>
                                        <td>{item.restockid}</td>
                                        <td>{item.orderdate}</td>
                                        <td>{item.item}</td>
                                        <td>{item.vendor}</td>
                                        <td>{item.amount}</td>
                                        </tr>
                                    );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                </div>
        </>

    );
}

export default RestockHistory;