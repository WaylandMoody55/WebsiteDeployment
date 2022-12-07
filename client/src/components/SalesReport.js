import Button from 'react-bootstrap/Button';
import React, { useState, useEffect, useRef} from 'react';


function SalesReport(){

    /*const salesReportArray = [
        {item: "Temp", sales: "Temp2"},
      ]
    */
      
      //const [show, setShow] = useState(false);

      const[salesReportArray, setSalesReportArray] = useState([]);
      const toDate = useRef(null);
      const fromDate = useRef(null);
      async function getSalesReportArray(){
        const postData = {
                fDate: fromDate.current.value,
                tDate: toDate.current.value     
        }
        console.log(fromDate.current.value)
        console.log(toDate.current.value)
    
        try {
            const res = await fetch("/salesReport", {
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
            const newArray = data;

            setSalesReportArray(data);

        }
        catch (err) {
            console.log(err.messeage);
        }
    }

    /*
    useEffect(() => {
        getSalesReportArray();
    })
    */

    return(
        <>
        <div class = "flex flex-wrap justify-center space-x-5 px-5 py-5">
            <Button variant="danger" href="/ManagerSide">
                    Back
            </Button>
        </div>
        <form >
            <div class="form-group">
                <label for="topLabel">Insert time frame</label>
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="initialDate"
                    type="text"
                    defaultValue=""
                    placeholder= "MM/DD/YYYY"
                    ref = {fromDate}
                />
                <label for="toLabel">to</label>
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="endDate"
                    type="text"
                    defaultValue=""
                    placeholder= "MM/DD/YYYY"
                    ref = {toDate}
                />
                <Button variant="primary" onClick={getSalesReportArray}>
                    Submit
                </Button>
            </div>
        </form>
        <div class ="px-5 flex justify-center items-center">
            <table class = "table-auto w-full shadow-md mt-5 rounded border-separate border-spacing-y-3 px-2 bg-gray-500">
                <thead class="bg-gray-500">
                    <tr class="bg-gray-500">
                    <th class="bg-gray-500">Item</th>
                    <th class="bg-gray-500">Sales</th>
                    </tr>
                </thead>
                <tbody class="bg-gray-500">
                    {salesReportArray.map(item => {
                    return (
                        <tr class="bg-gray-500">
                        <td class="bg-gray-500">{item.name}</td>
                        <td class="bg-gray-500">{item.count}</td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default SalesReport