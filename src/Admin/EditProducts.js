import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditProducts = () => {
    const {id}=useParams()
    const [errors,setErrors]=useState({})
    const [product,setProduct]=useState({
        name: '',
        description: '',
        category: '',
        price: '',
        material: '',
        image: '',
    })
    const navigate=useNavigate()

    const validate = () => {
        const errors = {};
        if (!product.name) errors.name = 'Name is required';
        if (!product.description) errors.description = 'Description is required';
        if (!product.category) errors.category = 'Category is required';
        if (!product.price) errors.price = 'Price is required';
        if (!product.material) errors.material = 'Material is required';
        if (!product.image) errors.image = 'Image URL is required';
        return errors;
      };

    useEffect(()=>{
        axios.get(`http://localhost:3001/products/${id}`)
        .then(res=>setProduct(res.data))
    },[])

    const handleChange=(e)=>{
        setProduct({
            ...product,
           [e.target.name]:e.target.value
        })

    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const validationErrors=validate()
        if(Object.keys(validationErrors).length>0){
            setErrors(validationErrors)
        }
        else{
            try{
                await axios.put(`http://localhost:3001/products/${id}`,product)
                setProduct({
                    name: '',
                    description: '',
                    category: '',
                    price: '',
                    material: '',
                    image: '',
                })
                setErrors({})
                alert("Product updated successfully")
                navigate(-1,{replace:true})
            }
            catch{
                console.log("error")
            }
        }

    }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 mt-10 rounded-xl shadow-lg border border-gray-200">
    <h2 className="text-3xl font-semibold text-teal-800 mb-6">Update Product</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label className="text-lg font-medium text-teal-700">Item Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="flex flex-col">
        <label className="text-lg font-medium text-teal-700">Item Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150 resize-none"
          rows="4"
        ></textarea>
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="flex flex-col">
        <label className="text-lg font-medium text-teal-700">Item Category</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
        />
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>

      <div className="flex flex-col">
        <label className="text-lg font-medium text-teal-700">Item Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>

      <div className="flex flex-col">
        <label className="text-lg font-medium text-teal-700">Item Material</label>
        <input
          type="text"
          name="material"
          value={product.material}
          onChange={handleChange}
          className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
        />
        {errors.material && <p className="text-red-500 text-sm mt-1">{errors.material}</p>}
      </div>

      <div className="flex flex-col">
        <label className="text-lg font-medium text-teal-700">Item Image URL</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
        />
        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-teal-800 text-white font-semibold rounded-md hover:bg-teal-900 focus:outline-none focus:ring-4 focus:ring-teal-600 transition duration-300"
      >
        Apply Changes
      </button>
    </form>
    <button
        onClick={()=>navigate(-1)}
        className="w-full py-3 mt-2 bg-red-800 text-white font-semibold rounded-md hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-600 transition duration-300"
      >
      Back
      </button>

  </div>
  )
}

export default EditProducts