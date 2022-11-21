import React from 'react';
import Button from 'react-bootstrap/Button';
import "./Format.css"

import Form from 'react-bootstrap/Form';

function SearchBar(){
    return(
    <>
        <div className="box4">
            <Form className="d-flex" style={styles.search}>
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
                <Button variant="primary">Search</Button>
            </Form>
        </div>
    </>
    );
}

export default SearchBar;
 
const styles = {
    search:{
        marginTop: '5px',
    },
};