import React ,{useState} from 'react';
import {Form, Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

function SearchBox(props) {

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('')

    const submitHandler =(e) =>{
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/search/${keyword}`);
        } else {
            navigate(`/`);
        }
    }
    return (
        <div>
            <Form onSubmit={submitHandler} className='d-flex flex-row'>
                <Form.Control
                    type='text'
                    name='q'
                    onChange={(e)=> setKeyword(e.target.value)}
                    placeholder = 'Search Product...'
                    className='mr-sm-2 ml-sm-5'
                ></Form.Control>
                <Button type='submit' variant='outline-success' className='p-2'>
                    Search
                </Button>
            </Form>
            
        </div>
    );
}

export default SearchBox;