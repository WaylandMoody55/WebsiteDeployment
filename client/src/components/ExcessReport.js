import Button from 'react-bootstrap/Button';
import React, { useState, useEffect, useRef} from 'react';

function ExcessReport(){

      const date = "10/20/2022";
      const fDate = useRef(null)
      const[excessReportArray, setExcessReportArray] = useState([]);
      const[invArray, setTempArray] = useState([]);
      async function getFArray(){

        const postData = {
            Fdate: fDate,
            Tdate: date
        };

        try {
            const res = await fetch("/excessReport", {
                method: "post",
                mode : "cors",
                // cache: 'no-cache',
                headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
                // "Accept": "application/json"
                },
                body: JSON.stringify(postData)
            });
    
            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }
    
            // grabs data from server response 
            const data = await res.json()
            
            console.log(data)

            setTempArray(data);

        }
        catch (err) {
            console.log(err.messeage);
        }
    }
    async function getItems(i) {

            const postData1 = {
                name: i
            };

            try {
                const res = await fetch("/excessReport1", {
                    method: "post",
                    mode : "cors",
                    // cache: 'no-cache',
                    headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value",
                    // "Accept": "application/json"
                    },
                    body: JSON.stringify(postData1)
                });
        
                if (!res.ok) {
                    const message = `An error has occured: ${res.status} - ${res.statusText}`;
                    throw new Error(message);
                }
        
                // grabs data from server response 
                const data = await res.json()
                
                console.log(data)
    
                setTempArray(data);
    
            }
            catch (err) {
                console.log(err.messeage);
            }
            
    }

    async function getExcessReportArray() {
        getFArray();
        invArray.map( item => {

            getItems(item.name);

        })

    }

    return(
        <>
        <div class = "flex flex-wrap justify-center space-x-5 px-5 py-5">
            <Button variant="danger" href="/ManagerSide">
                    Back
            </Button>
        </div>
        <form>
            <div class="form-group">
                <label for="excessReportDate">Date</label>
                <input type="email" class="form-control" id="excessReportInput" placeholder="MM/DD/YYYY" ref = {fDate} ></input>
                <Button variant="primary">
                    Submit
                </Button>
            </div>
        </form>
        <div class ="px-5 flex justify-center items-center">
            <table class = "table-auto w-full shadow-md mt-5 rounded border-separate border-spacing-y-3 px-2">
                <thead>
                    <tr>
                    <th>Item</th>
                    </tr>
                </thead>
                <tbody>
                    {excessReportArray.map(item => {
                    return (
                        <tr>
                        <td>{item.item}</td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default ExcessReport