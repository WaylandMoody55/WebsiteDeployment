import React from 'react';
import Button from 'react-bootstrap/Button';
import ServerSide from './ServerSide';
import "./Format.css"

function Order(){
    const cart = ServerSide.cart;

    return(
    <>
        {/* <div className="box3">
            <h5 style={styles.catg}>Beverages</h5 >
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
                    { cart ? cart.map((cartProduct, key) => <tr key={"0"}>
                      <td>{cartProduct.name}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.totalAmount}</td>
                      <td>
                        <button className='btn btn-danger btn-sm'>Remove</button>
                      </td>

                    </tr>)

                    : 'No Item in Cart'}
                </tbody>
            </table>

            <h5 style={styles.catg}>Food Items</h5 >
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

            <h5 style={styles.catg}>Dessert</h5 >
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
        </div> */}
        
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
    },
    catg:{
        backgroundColor: '#eee',
        padding: '5px 5px 5px 5px'
    }
};