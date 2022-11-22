import Button from 'react-bootstrap/Button';
import React, { useState, useEffect} from 'react';

function RestockReport(){

    /*const restockReportArray = [
        {name: "napkins", quantity: "2", units: "pounds"}
      ]
    */
    const[restockReportArray, setRestockReportArray] = useState([]);

    async function getRestockReportArray(){
        try {
            const res = await fetch("https://websitebackendtest.onrender.com/restockReport", {
                method: "post",
                mode : "cors",
                // cache: 'no-cache',
                headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
                // "Accept": "application/json"
                },
            });
    
            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }
    
            // grabs data from server response 
            const data = await res.json()
            
            console.log(data)

            setRestockReportArray(data);

        }
        catch (err) {
            console.log(err.messeage);
        }
    }

    useEffect(() => {
        getRestockReportArray();
    })

    return(
        <>
        <div class = "flex flex-wrap justify-center space-x-5 px-5 py-5">
            <Button variant="danger" href="/ManagerSide">
                    Back
            </Button>
        </div>
        <div class ="px-5 flex justify-center items-center">
            <table class = "table-auto w-full shadow-md mt-5 rounded border-separate border-spacing-y-3 px-2">
                <thead>
                    <tr>
                    <th>Ingredient Name</th>
                    <th>Quantity</th>
                    <th>Units</th>
                    </tr>
                </thead>
                <tbody>
                    {restockReportArray.map(item => {
                    return (
                        <tr>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.units}</td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default RestockReport