import React,{useState,useEffect} from 'react'
import Cars from './Cars.jsx'
// import CardOrders from './CardOrders.jsx'
import CardDetails from './CardDetails.jsx'
import TextField from '@mui/material/TextField';
import CartItems from './CartItems.jsx'
import Button from '@mui/material/Button';
import axios from 'axios'

function Evaluation() {

    const [state,setState] = useState([])
    const [refresh,setRefresh] = useState(false)
    const [loading,setLoading] = useState(true)

    const [value,setValue] = useState({
        year:"",
        type:""
    })

    function handleValue(e){
        // console.log(e.target.value)
        setValue({...value,[e.target.name]:e.target.value})
    }

    function handleByYear(){
        console.log(value)
        const data = state.filter((ele) => parseInt(ele.year)===parseInt(value.year))
        console.log(data);
        setState([...data])

    }
    function handleByType(){
        setState([...state.filter((ele) => ele.type===value.type)])
    }

    useEffect(() =>{
        setLoading(true)
        async function fetchData(){
            const config = {
                url:`http://localhost:3000/cars`,
                method:"get"
            }
            const data = await axios(config)
            setState([...data.data])
        }
        fetchData()
        // console.log(state);
        setLoading(false)

    },[refresh])

    function handleSort(){
        setState([...state.sort((a,b) => parseInt(a.price)-parseInt(b.price))])
    }

    return (
        <div style={{display: 'flex',justifyContent:"space-between"}}>
            <div>
                <h2>ADD NEW CAR</h2>
                <Cars refresh={setRefresh} />
            </div>
            <div style={{width:"800px",borderRight:"2px solid grey",borderLeft:"2px solid grey"}}>
                <h2>ALL CARS</h2>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <Button style={{marginTop:"25px"}} onClick={handleSort} variant="contained">Sort by Price</Button>
                    <TextField style={{width:"80px",height:"50px",marginTop:"25px"}}
                        name="year"
                        label="Year"
                        defaultValue="year"
                        onChange={(e) => handleValue(e)}
                    />
                    <Button style={{marginTop:"25px"}} onClick={handleByYear} variant="contained">Filter by Year</Button>
                    <TextField style={{width:"80px",height:"50px",marginTop:"25px"}}
                        name="type"
                        label="Type"
                        defaultValue="Type"
                        onChange={(e) => handleValue(e)}
                    />
                    <Button style={{marginTop:"25px"}} onClick={handleByType} variant="contained">Filter by Type</Button>
                </div>
                {loading===true?<h1>Loading...</h1>:<div style={{display: "flex",flexWrap:"wrap",marginTop:"25px"}}>
                    {
                        state.map((ele) => {
                            return(
                                <CardDetails name={ele.carname} 
                                
                                refresh = {setRefresh}
                                key = {ele.id}
                                id = {ele.id}
                                price={ele.price} model={ele.type} 
                                year={ele.year} imageUrl={ele.imageUrl} />
                            )
                        })
                    }
                </div>}
            </div>
            <CartItems />
        </div>
    )
}

export default Evaluation
