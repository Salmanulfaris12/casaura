import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditProducts = () => {
    const {id}=useParams()
    const [errors,setErrors]=useState({})
    const [product,setProduct]=useState({
      ProductName: '',
      ProductDescription: '',
      CategoryId: '',
      Material: '',
      ProductPrice: '',
      MRP: '',
      Stock: '',
      image: null,
    })
    const navigate=useNavigate()

    const validate = () => {
        const errors = {};
        if (!product.ProductName) errors.ProductName = 'Name is required';
        if (!product.ProductDescription) errors.ProductDescription = 'Description is required';
        if (!product.CategoryId) errors.CategoryId = 'Category is required';
        if (!product.ProductPrice) errors.ProductPrice = 'Price is required';
        if (!product.Material) errors.Material = 'Material is required';
        if(!product.MRP)errors.MRP='Mrp is required';
        if(!product.Stock)errors.Stock='stock is Required'
        if(product.Stock < 1) errors.Stock = 'stock must greater than 1'
        if(product.MRP < product.ProductPrice) errors.MRP = 'mrp must greater than price';
        if (!product.image) errors.image = 'Image URL is required';
        return errors;
      };

    useEffect(()=>{
        axios.get(`https://localhost:7151/api/Product/GetById/${id}`)
        .then(res=>{console.log(res.data.data);
    const dataRes=  res.data.data
    let CategoryId
    if(dataRes.categoery=="Sofas")CategoryId=2006
    else if(dataRes.categoery=="Tables")CategoryId=2007
    else if(dataRes.categoery=="Dining Tables")CategoryId=2010
    else if(dataRes.categoery=="Chairs")CategoryId=2009
    else if(dataRes.categoery=="Beds")CategoryId=2008
   
          setProduct(
            {
              ProductName:dataRes.productName,
              ProductDescription:dataRes.productDescription,
              CategoryId:CategoryId,
              Material:dataRes.material,
              ProductPrice:dataRes.productPrice,
              MRP:dataRes.mrp,
              Stock:dataRes.stock,
              image: dataRes.image,
            }

          )})
    },[])

    const handleChange = (e) => {
      const { name, value } = e.target;
      setProduct({
        ...product,
        [name]: value, // Dynamically update the field by its name
      });
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setProduct({
          ...product,
          image: file, // Set the file object to the 'image' field
      });
  };
    

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const validationErrors=validate()
        if(Object.keys(validationErrors).length>0){
            setErrors(validationErrors)
        }
        else{
            try{
              const formData = new FormData();
              Object.keys(product).forEach((key) => {
                  formData.append(key, product[key]);
              });
                await axios.put(`https://localhost:7151/api/Product/Update/${id}`,formData,{
                  headers: {
                    'Content-Type': 'multipart/form-data',
                     Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
                })
                setProduct({
                  ProductName: '',
                  ProductDescription: '',
                  CategoryId: '',
                  Material: '',
                  ProductPrice: '',
                  MRP: '',
                  Stock: '',
                  image: null,
                })
                setErrors({})
                alert("Product updated successfully")
                navigate(-1,{replace:true})
            }
            catch(err){
                console.log("error",err.response?.data)
                alert(`${err.response?.data.error}`)
            }
        }

    }

  return (
    <div className="w-2/3 mx-auto bg-white p-8 mt-10 rounded-xl shadow-lg border border-gray-200">
    <h2 className="text-3xl font-semibold text-teal-800 mb-6">Update Product</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label className="text-lg font-medium text-teal-700">Item Name</label>
        <input
          type="text"
          name="ProductName"
          value={product.ProductName}
          onChange={handleChange}
          className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
        />
        {errors.ProductName && <p className="text-red-500 text-sm mt-1">{errors.ProductName}</p>}
      </div>

      <div className="flex flex-col">
        <label className="text-lg font-medium text-teal-700">Item Description</label>
        <textarea
          name="ProductDescription"
          value={product.ProductDescription}
          onChange={handleChange}
          className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150 resize-none"
          rows="4"
        ></textarea>
        {errors.ProductDescription && <p className="text-red-500 text-sm mt-1">{errors.ProductDescription}</p>}
      </div>


      <div className="flex flex-col">
      <label className="text-lg font-medium text-teal-700">Item Category</label>
      <select
        name="CategoryId"
        value={product.CategoryId}
        onChange={handleChange}
        className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
      >
            <option value={null} >
               Select the Category
            </option>
            <option value={2006}>Sofas</option>
            <option value={2007}>Tables</option>
            <option value={2010}>Dining Tables</option>
            <option value={2009}>Chairs</option>
            <option value={2008}>Beds</option>
      </select>
      {errors.CategoryId && <p className="text-red-500 text-sm mt-1">{errors.CategoryId}</p>}
    </div>


      <div className="flex flex-col">
        <label className="text-lg font-medium text-teal-700">Item Price</label>
        <input
          type="number"
          name="ProductPrice"
          value={product.ProductPrice }
          onChange={handleChange}
          className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
        />
        {errors.ProductPrice && <p className="text-red-500 text-sm mt-1">{errors.ProductPrice}</p>}
      </div>

      <div className="flex flex-col">
        <label className="text-lg font-medium text-teal-700">Item Material</label>
        <input
          type="text"
          name="Material"
          value={product.Material}
          onChange={handleChange}
          className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
        />
        {errors.Material && <p className="text-red-500 text-sm mt-1">{errors.Material}</p>}
      </div>

        {/* Item MRP */}
        <div className="flex flex-col">
        <label className="text-lg font-medium text-teal-700">Item MRP</label>
        <input
            type="number"
            name="MRP"
            value={product.MRP}
            onChange={handleChange}
            className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
        />
        {errors.MRP && <p className="text-red-500 text-sm mt-1">{errors.MRP}</p>}
    </div>

      {/* Item Stock */}
      <div className="flex flex-col">
          <label className="text-lg font-medium text-teal-700">Item Stock</label>
          <input
              type="number"
              name="Stock"
              value={product.Stock}
              onChange={handleChange}
              className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
          />
          {errors.Stock && <p className="text-red-500 text-sm mt-1">{errors.Stock}</p>}
      </div>
      <div className="flex flex-col">
          <label className="text-lg font-medium text-teal-700">Item Image</label>
          <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
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