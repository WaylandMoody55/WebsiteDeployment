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
        </>
    );
}

export default PairSales