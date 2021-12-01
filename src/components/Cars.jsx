import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {v4 as uuid} from 'uuid'
import axios from 'axios'

function Cars({refresh}) {
    const [state,setState] = useState({
        carname:"",
        type:"",
        year:"",
        price:"",
        imageUrl:""
    })

    function handleState(e){
        var value = e.target.value

        setState({...state,[e.target.name]:value})

    }

    async function handleSumbit(){
        var value = {
            ...state,
            id:uuid()
        }

        var config = {
            url:`http://localhost:3000/cars`,
            data:value,
            method:'post'
        }

        await axios(config)
        alert('Sucess')
        refresh((prev) => !prev)

    }


    return (
        <div style={{display:"flex",flexDirection:"column",width:"350px"}}>
            <TextField style={{width:"350px",height:"50px",marginTop:"25px"}}
                name="carname"
                label="Name"
                defaultValue={state.name}
                onChange={(e) => handleState(e)}

            />
            <TextField style={{width:"350px",height:"50px",marginTop:"25px"}}
                name="type"
                label="Type"
                defaultValue={state.type}
                onChange={(e) => handleState(e)}
            />
            <TextField style={{width:"350px",height:"50px",marginTop:"25px"}}
                name="year"
                label="Year"
                defaultValue={state.year}
                onChange={(e) => handleState(e)}
            />
            <TextField style={{width:"350px",height:"50px",marginTop:"25px"}}
                name="price"
                label="Price"
                defaultValue={state.price}
                onChange={(e) => handleState(e)}
            />
            <TextField style={{width:"350px",height:"50px",marginTop:"25px"}}
                name="imageUrl"
                label="Image URL"
                defaultValue={state.imageUrl}
                onChange={(e) => handleState(e)}
            />
            <Button style={{marginTop:"25px"}} onClick={handleSumbit} variant="contained">Sumbit</Button>
        </div>
    )
}

export default Cars
