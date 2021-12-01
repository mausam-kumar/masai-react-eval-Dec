import React from 'react'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styled from 'styled-components'
import axios from 'axios'

function CardDetails({imageUrl,name,price,model,year,id,refresh}) {

    async function handleClick(e){
        const config = {
            url:`http://localhost:3000/cars/${e.target.id}`,
            method:'get'

        }
        const data = await axios(config)
        console.log(data)
        const config2 = {
            data:data.data,
            url:`http://localhost:3000/orders`,
            method:'post'
        }

        await axios(config2)
        alert('Sucess')
        refresh((prev) => !prev)
    }
    return (
        <div style={{margin:"20px"}}>
            <Paper style={{width:"200px",padding:"20px"}}>
                
                <Wraper >
                    <img src={imageUrl} alt={name}style={{height:"150px","width":"150px"}} />
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:"0px"}}>
                        <h3>{name}</h3>
                        <h3>{model}</h3>
                        
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:"0px"}}>
                        <h3>{price}</h3>
                        <h3>{year}</h3>
                    </div>
                    <Button id={id} onClick={(e) => handleClick(e)} variant="contained">ADD TO CART</Button>

                </Wraper>
            </Paper>
        </div>
    )
}

export default CardDetails


const Wraper = styled.div`
    
`