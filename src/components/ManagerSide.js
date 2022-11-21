import Button from 'react-bootstrap/Button';

function ManagerSide(){

    const managerName = "John Doe";

    const orderHistory = [
        {orderNum: "1",date: "01/01/2022", finalPrice: "20.00"},
        {orderNum: "2",date: "01/02/2022", finalPrice: "20.00"},
        {orderNum: "3",date: "01/03/2022", finalPrice: "20.00"},
        {orderNum: "4",date: "01/04/2022", finalPrice: "20.00"},
        {orderNum: "5",date: "01/05/2022", finalPrice: "20.00"},
        {orderNum: "6",date: "01/06/2022", finalPrice: "20.00"},
        {orderNum: "7",date: "01/07/2022", finalPrice: "20.00"},
        {orderNum: "8",date: "01/08/2022", finalPrice: "20.00"},
        {orderNum: "9",date: "01/09/2022", finalPrice: "20.00"},
      ]

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
        <div class ="px-5 flex justify-center items-center">
            <table class = "table-auto w-full shadow-md mt-5 rounded border-separate border-spacing-y-3 px-2">
                <thead>
                    <tr>
                    <th>Order Number</th>
                    <th>Date</th>
                    <th>Final Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderHistory.map(item => {
                    return (
                        <tr>
                        <td>{item.orderNum}</td>
                        <td>{item.date}</td>
                        <td>{item.finalPrice}</td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
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
