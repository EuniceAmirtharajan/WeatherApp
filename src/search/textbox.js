import React, { useState, useEffect,useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { Col, Button, Row } from 'react-bootstrap';
const google = window.google = window.google ? window.google : {}

function Search(props) {

    let [city, setCity] = useState('');
    const [query, setQuery] = useState('');
    const cityRef = useRef();
    useEffect(() => {
        // Declare Options For Autocomplete
        const options = {
            types: ['(cities)'],
        };

        let autocomplete ='';
      
            autocomplete=  new google.maps.places.Autocomplete(
                document.getElementById('autocomplete'),
                options,
            );
       
       
        let handlePlaceSelect = () => {

            // Extract City From Address Object
            const addressObject = autocomplete.getPlace();
            const address = addressObject.address_components;
           
            // Check if address is valid
            if (address) {
                // Set State
               
                setCity(address[0].long_name);
                setQuery(addressObject.formatted_address);
            }
          
        }

            // Avoid paying for data that you don't need by restricting the set of
            // place fields that are returned to just the address components and formatted
            // address.
            autocomplete.setFields(['address_components', 'formatted_address']);

            // Fire Event when a suggested name is selected
            autocomplete.addListener('place_changed', handlePlaceSelect);
       
  
    }, []);
    let searchCity =(e)=>{
        e.preventDefault();
        if(!city){
            city=cityRef.current.value;
        }
      
        props.searchCity(city);
    }
    return (
        <Form>
            <Form.Group as={Row}>
                <Col sm={5}>
                    <Form.Control id="autocomplete" type="text" ref={cityRef} placeholder="Enter city name"></Form.Control>
                </Col>
                <Col sm={1}>
                    <Button variant="primary" type="submit" onClick={searchCity}>Submit</Button>
                </Col>
            </Form.Group>
        </Form>

    )
}

export default Search;