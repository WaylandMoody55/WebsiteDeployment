import React from 'react';
import Button from 'react-bootstrap/Button';
import "./Format.css"

function ServerHeader(){

    const serverName = "Jane Doe";
    const OrderNum = '001';

    return(
    <>
        <div className="box1">
            <Button variant="danger" href="/" style = {styles.logout}>
                Logout
            </Button>

            <label style = {styles.name} >Server: {serverName}</label>
        </div>

        <div className="box2">
            <Button variant="warning" href="/Inventory" style = {styles.logout}>
                Clear
            </Button>

            <label style = {styles.name} >Order #: {OrderNum} </label>
        </div>
    </>
    );
}

export default ServerHeader;
 
const styles = {
    logout:{
        marginTop: '1px',
        marginLeft: '5px',
    },
    name:{
        marginTop: '2px',
        fontSize: '24px',
        fontWeight: 'bold',
        marginLeft: '60px',
    },
    search:{

    },
};