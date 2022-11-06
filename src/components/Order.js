import React from 'react';
import Button from 'react-bootstrap/Button';
import "./Format.css"

function Order(){
    const order = [
        {name: "Item", quantity:"QTY", price: "price"},
        {name: "Item", quantity:"QTY", price: "price"},
      ]

    return(
    <>
        <div className="box3">
            <h5>Beverages</h5>
            <table className='table table-light'>
                <thead>
                    <tr>
                        <td>Item</td>
                        <td>QTY</td>
                        <td>Price</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {order.map(item => {
                    return (
                        <tr>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>
                            <Button variant='danger'> Remove</Button>
                        </td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>

            <h4>Food Items</h4>
            <table className='table table-light'>
                <thead>
                    <tr>
                        <td>Item</td>
                        <td>QTY</td>
                        <td>Price</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {order.map(item => {
                    return (
                        <tr>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>
                            <Button variant='danger'> Remove</Button>
                        </td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>

            <h4>Dessert</h4>
            <table className='table table-light'>
                <thead>
                    <tr>
                        <td>Item</td>
                        <td>QTY</td>
                        <td>Price</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {order.map(item => {
                    return (
                        <tr>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>
                            <Button variant='danger'> Remove</Button>
                        </td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
            <h2 className='px-2 text-black' style={styles.amnt}>Total amount: $$$</h2>

            <div>
                <Button style = {styles.pay}>
                    Pay Now
                </Button>
            </div>
        </div>
        
    </>
    );
}

export default Order;
 
const styles = {
    search:{
        marginTop: '5px',
    },
    pay:{
        alignItems: 'center',
        width: '400px'
    },
    amnt:{
        marginLeft: '55px'
    }
};