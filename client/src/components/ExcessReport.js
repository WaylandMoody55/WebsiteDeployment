import Button from 'react-bootstrap/Button';
import React, { useState, useEffect, useRef} from 'react';
//only works for items that have sold at least once within the time period.

function ExcessReport(){

      const date = "12/06/2022";
      const fDate = useRef(null)
      const[excessReportArray, setExcessReportArray] = useState([]);

      async function getFArray(){
            //console.log("here")
            const postData = {
                Fdate: fDate.current.value,
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
                
                //console.log(data)
                console.log("done")
                console.log(data)
                setExcessReportArray(data);

            }
            catch (err) {
                console.log(err.messeage);
            }
    }
    /*
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
                console.log("done")
    
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
            var num = item.count;
            


        })

    }
    */

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
                <Button variant="primary" onClick={e => getFArray()}>
                    Submit
                </Button>
            </div>
        </form>
        <div class ="px-5 flex justify-center items-center">
            <table class = "table-auto w-full shadow-md mt-5 rounded border-separate border-spacing-y-3 px-2 bg-gray-500">
                <thead class="bg-gray-500">
                    <tr class="bg-gray-500">
                    <th class="bg-gray-500">Item</th>
                    <th class="bg-gray-500"> Units</th>
                    </tr>
                </thead>
                <tbody class="bg-gray-500">
                    {excessReportArray.map(item => {
                    return (
                        <tr class="bg-gray-500">
                        <td class="bg-gray-500">{item[0]}</td>
                        <td class="bg-gray-500">{item[1]}</td>
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