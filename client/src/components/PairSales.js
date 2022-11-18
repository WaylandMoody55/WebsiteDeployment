import Button from 'react-bootstrap/Button';

function PairSales(){

    const pairSalesArray = [
        {item1: "Temp", item2: "Temp2", amount: "Temp3"},
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
                    <th>Item 1</th>
                    <th>Item 2</th>
                    <th>Pair Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {pairSalesArray.map(item => {
                    return (
                        <tr>
                        <td>{item.item1}</td>
                        <td>{item.item2}</td>
                        <td>{item.amount}</td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default PairSales