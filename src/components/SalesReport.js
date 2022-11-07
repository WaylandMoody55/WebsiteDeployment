import Button from 'react-bootstrap/Button';

function SalesReport(){

    const salesReportArray = [
        {item: "Temp", sales: "Temp2"},
      ]

    return(
        <>
        <div class = "flex flex-wrap justify-center space-x-5 px-5 py-5">
            <Button variant="danger" href="/ManagerSide">
                    Back
            </Button>
        </div>
        <form>
            <div class="form-group">
                <label for="topLabel">Insert time frame</label>
                <input type="email" class="form-control" id="initialDate" placeholder="MM/DD/YYYY"></input>
                <label for="toLabel">to</label>
                <input type="email" class="form-control" id="endDate" placeholder="MM/DD/YYYY"></input>
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
                    <th>Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {salesReportArray.map(item => {
                    return (
                        <tr>
                        <td>{item.item}</td>
                        <td>{item.sales}</td>
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