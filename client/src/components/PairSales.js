import Button from 'react-bootstrap/Button';
import {useRef, useState} from 'react';

function PairSales(){
    const[pairSalesArray, setRestockReportArray] = useState([]);
    // const pairSalesArray = [
    //     {item1: "Temp", item2: "Temp2", amount: "Temp3"},
    //   ]

    const initialDate = useRef(null);
    const endingDate = useRef(null);

    async function submitDates() {
        console.log(initialDate.current.value)
        console.log(endingDate.current.value)
        const postData = {
            initial: initialDate.current.value,
            ending: endingDate.current.value
          };
          try {
          const res = await fetch("/pairSales", {
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
          console.log(data)
          setRestockReportArray(data)
        }
        catch (err) {
            console.log(err.messeage);
        }
        initialDate.current.value = "MM/DD/YYYY"
        endingDate.current.value = "MM/DD/YYYY"
    }

    return(
        <>
        <div className="login">
        <div class = "flex flex-wrap justify-center space-x-5 px-5 py-5">
            <Button variant="danger" href="/ManagerSide">
                    Back
            </Button>
        </div>
        <form>
            <div class="form-group">
                <label for="topLabel">Insert time frame</label>
                <input type="email" class="form-control" id="initialDate" placeholder="MM/DD/YYYY" ref={initialDate}></input>
                <label for="toLabel">to</label>
                <input type="email" class="form-control" id="endDate" placeholder="MM/DD/YYYY" ref = {endingDate}></input>
                <Button variant="primary" onClick={submitDates}>
                    Submit
                </Button>
            </div>
        </form>
        <div class ="px-5 flex justify-center items-center">
            <table class = "table-auto w-full shadow-md mt-5 rounded border-separate border-spacing-y-3 px-2 bg-gray-500">
                <thead class="bg-gray-500">
                    <tr class="bg-gray-500">
                    <th class="bg-gray-500">Item 1</th>
                    <th class="bg-gray-500">Item 2</th>
                    <th class="bg-gray-500">Pair Sales</th>
                    </tr>
                </thead>
                <tbody class="bg-gray-500">
                    {pairSalesArray.map(item => {
                    return (
                        <tr class="bg-gray-500">
                        <td class="bg-gray-500">{item.item1}</td>
                        <td class="bg-gray-500">{item.item2}</td>
                        <td class="bg-gray-500">{item.amount}</td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </div>
        </div>
        </>
    );
}

export default PairSales