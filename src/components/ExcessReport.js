import Button from 'react-bootstrap/Button';

function ExcessReport(){

    const excessReportArray = [
        {item: "Temp"},
        {item: "Temp"}
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
                <label for="excessReportDate">Date</label>
                <input type="email" class="form-control" id="excessReportInput" placeholder="MM/DD/YYYY"></input>
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