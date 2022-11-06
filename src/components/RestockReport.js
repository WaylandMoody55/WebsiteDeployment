import Button from 'react-bootstrap/Button';

function RestockReport(){

    const restockReportArray = [
        {name: "napkins", quantity: "2", units: "pounds"}
      ]

    return(
        <>
        <div class = "flex flex-wrap justify-center space-x-5 px-5 py-5">
            <Button variant="danger" href="/">
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