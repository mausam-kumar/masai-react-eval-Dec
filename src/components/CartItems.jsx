import axios from 'axios'
import React,{useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import CardDetails from './CardDetails.jsx'
import CardOrders  from './CardOrder.jsx';

function CartItems() {
    const [state,setState] = useState([])
    const [loading,setLoading] = useState(true)
    const [refresh,setRefresh] = useState(false)

    useEffect(() => {
        setLoading(true)
        async function fetchData(){
            const config = {
                method:'get',
                url: 'http://localhost:3000/orders'
            }
            const data = await axios(config)
            setState([...data.data])
        }
        fetchData()
        
        setLoading(false)
    },[refresh])

    function handleClick(){
        setRefresh((prev) =>!prev)
    }
    return (
        <div>
            <Button style={{marginTop:"25px"}} onClick={handleClick} variant="contained">Cart Items</Button>
            {
                loading===true?<h1>Loading...</h1>:
                <div>
                    {
                        state.map((ele) => {
                            return(
                                <CardOrders name={ele.name} 
                                
                                key = {ele.id}
                                id = {ele.id}
                                price={ele.price} model={ele.model} 
                                year={ele.year} imageUrl={ele.imageUrl} />
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default CartItems
