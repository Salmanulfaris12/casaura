import axios from 'axios'
import React, { useEffect,useState } from 'react'

const Productdetail = () => {
    const {id}=useParams()
    const [item,setItem]=useState({})

    useEffect(()=>{
        axios.get(`http://localhost:3001/products/${id}`)
        .then(res=>setItem())
    })
  return (
    <div></div>
  )
}

export default Productdetail