import Button from 'react-bootstrap/Button';
import './Format.css'
import React, { useRef, useState, useEffect } from 'react';
import TableScrollbar from 'react-table-scrollbar';

function ManagerSide(){
    const [managerName, setManagerName] = useState("employee")
    const [orderHistory, setHistory] = useState([]);
    const managerID = sessionStorage.getItem("loginNum")
    // const orderHistory = [
    //     {orderNum: "1",date: "01/01/2022", finalPrice: "20.00"},
    //     {orderNum: "2",date: "01/02/2022", finalPrice: "20.00"},
    //     {orderNum: "3",date: "01/03/2022", finalPrice: "20.00"},
    //     {orderNum: "4",date: "01/04/2022", finalPrice: "20.00"},
    //     {orderNum: "5",date: "01/05/2022", finalPrice: "20.00"},
    //     {orderNum: "6",date: "01/06/2022", finalPrice: "20.00"},
    //     {orderNum: "7",date: "01/07/2022", finalPrice: "20.00"},
    //     {orderNum: "8",date: "01/08/2022", finalPrice: "20.00"},
    //     {orderNum: "9",date: "01/09/2022", finalPrice: "20.00"},
    //   ]

    async function getHist(){
        //console.log("test async inside effect");
        try {
            const res = await fetch("/orderHistory", {
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
  
            // grabs data from server response 
            const data = await res.json()
            console.log(data)
            
            const newHist = data;

            setHistory(newHist);

      }
  
      catch (err) {
          console.log(err.messeage);
      }
    }

      async function getManagerName() {
        const postData = {
            employeeID: managerID
        };
        try{
            const res = await fetch("/getEmployeeName",{
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

            const data = await res.json()
            console.log(data)
            setManagerName(data.firstname + " " + data.lastname)
            
            
        }
        catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        //console.log("hello from view Edit Menu");
        getManagerName();
        getHist();
    })

    return(
        <>
        <div class = "px-5 py-2">
            <Button variant="danger" href="/">
                Logout
            </Button>
        </div>
        <div class = "flex justify-center items-center">
            <h3>Manager: {managerName}</h3>
        </div>
        {/* <div class ="px-5" style={{width: 'auto'}}>
        
        </div> */}
        <div class ="px-5" style={{width: 'auto'}}>
            <table class = "table-auto w-full shadow-md mt-5 rounded border-separate border-spacing-y-3 px-2">
                <thead>
                    <tr>
                    <th>Order Number</th>
                    <th>Date</th>
                    <th>Final Price</th>
                    </tr>
                </thead>
        </table>
            <TableScrollbar height="300px" >
            <table class = "table-auto w-full shadow-md mt-5 rounded border-separate border-spacing-y-3 px-2">
                {/* <thead class = "sticky top-0">
                    <tr>
                    <th>Order Number</th>
                    <th>Date</th>
                    <th>Final Price</th>
                    </tr>
                </thead> */}
                <tbody>
                    {orderHistory.map(item => {
                    return (
                        <tr>
                        <td>{item.ordernumber}</td>
                        <td>{item.date}</td>
                        <td>{item.finalprice}</td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
            </TableScrollbar>
        </div>
        <div className="d-grid gap-2 px-5 py-6">
            <Button variant="primary" size="lg" href="/Inventory">
                Inventory
            </Button>
        </div>
        <div className ="flex justify-center items-center pt-5 pb-3">
            <h3>Trend Analysis</h3>
        </div>
        <div class="flex flex-wrap justify-center space-x-5 px-5 pt-2 pb-5">
            <Button variant="primary" size="lg" href="/SalesReport">
                Sales Report
            </Button>
            <Button variant="primary"size="lg" href="/PairSales">
                Pair Sales
            </Button>
            <Button variant="primary" size="lg" href="/ExcessReport">
                Excess Report
            </Button>
            <Button variant="primary" size="lg" href="/RestockReport">
                Restock Report
            </Button>
        </div>
        </>
    );
}

export default ManagerSide
