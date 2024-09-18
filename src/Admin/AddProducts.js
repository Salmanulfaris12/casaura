import React, { useState } from 'react'

const AddProducts = () => {
    const [errors,setErrors]=useState({})
    const [formData,setFormData]=useState({
        id:"",
        name:"",
        description:"",
        category:"",
        price:"",
        material:"",
        image:""
    })

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

  return (
    <div>
        <div>
            <form>
                <label>Id</label>
                <input/>
            </form>
        </div>
    </div>
  )
}

export default AddProducts