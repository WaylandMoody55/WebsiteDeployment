import EditInventory from "./EditInventory";
import NewIngredient from "./NewIngredient";
import RestockForm from "./RestockForm";
import RestockHistory from "./RestockHistory";
import Button from 'react-bootstrap/Button';

function Inventory(){
    const inventoryItems = [
        {name: "Ingredient1", quantity:"Quantity1", individualPrice: "Price1", units: "unit1", storage: "storage1"},
        {name: "Ingredient2", quantity:"Quantity2", individualPrice: "Price2", units: "unit2", storage: "storage2"},
        {name: "Ingredient3", quantity:"Quantity3", individualPrice: "Price3", units: "unit3", storage: "storage3"},
        {name: "Ingredient4", quantity:"Quantity4", individualPrice: "Price4", units: "unit4", storage: "storage4"},
        {name: "Ingredient5", quantity:"Quantity5", individualPrice: "Price5", units: "unit5", storage: "storage5"},
        {name: "Ingredient6", quantity:"Quantity6", individualPrice: "Price6", units: "unit6", storage: "storage6"},
        {name: "Ingredient7", quantity:"Quantity7", individualPrice: "Price7", units: "unit7", storage: "storage7"},
        {name: "Ingredient8", quantity:"Quantity8", individualPrice: "Price8", units: "unit8", storage: "storage8"},
        {name: "Ingredient9", quantity:"Quantity9", individualPrice: "Price9", units: "unit9", storage: "storage9"},
      ]

    return(
        <>
        <div class = "flex flex-wrap justify-center space-x-5 px-5 py-5">
            <Button variant="danger" href="/ManagerSide">
                Back
            </Button>
            <RestockForm/>
            <RestockHistory/>
            <NewIngredient/>
            <EditInventory/>
            <Button variant="primary" href="/ViewEditMenu">
                View/Edit Menu 
            </Button>
            
        </div>
        
        <div class ="px-5 flex justify-center items-center">
            <table class = "table-auto w-full shadow-md mt-5 rounded border-separate border-spacing-y-3 px-2">
                <thead>
                    <tr>
                    <th>Ingredient Name</th>
                    <th>Quantity</th>
                    <th>Individual Price</th>
                    <th>Units</th>
                    <th>Storage</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryItems.map(item => {
                    return (
                        <tr>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.individualPrice}</td>
                        <td>{item.units}</td>
                        <td>{item.storage}</td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default Inventory
