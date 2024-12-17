import React from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup"
// import * as Yup from 'yup';
import axios from 'axios';

const AddProducts = () => {
  // Formik setup with initial values, validation schema, and submit handler
  const formik = useFormik({
    initialValues: {
      ProductName: '',
      ProductDescription: '',
      CategoryId: '',
      Material: '',
      ProductPrice: '',
      MRP: '',
      Stock: '',
      image: null,

    },
    validationSchema: Yup.object({
      ProductName: Yup.string().required('Product name is required'),
      ProductDescription: Yup.string().required('Product description is required'),
      // CategoryId: Yup.number().required('Category is required'),
      Material: Yup.string().required('Material is required'),
      ProductPrice: Yup.number()
        .required('Price is required')
        .positive('Price must be greater than or equal to 0'),
      MRP: Yup.number()
        .required('MRP is required')
        .positive('MRP must be greater than or equal to 0'),
      Stock: Yup.number()
        .required('Stock is required')
        .min(0, 'Stock must be greater than or equal to 0'),
    }),
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
    
      // Add the DTO fields to `productdto`
      formData.append("ProductName", values.ProductName);
      formData.append("ProductDescription", values.ProductDescription);
      formData.append("CategoryId", values.CategoryId);
      formData.append("Material", values.Material);
      formData.append("ProductPrice", values.ProductPrice);
      formData.append("MRP", values.MRP);
      formData.append("Stock", values.Stock);
      
      formData.append("image", values.image); 
    
      axios
        .post('https://localhost:7151/api/Product/Add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`, 
          },
        })
        .then((res) => {
          console.log(res.data);
          alert("Product Added successfully");
          resetForm(); 
        })
        .catch((err) => console.error("Error fetching users:", err.response?.data || err.message));
    },
    
  });
  

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 md:p-8 mt-10 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl md:text-3xl font-semibold text-teal-800 mb-6">Add New Product</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Item Name */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-teal-700">Item Name</label>
          <input
            type="text"
            name="ProductName"
            value={formik.values.ProductName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
          />
          {formik.touched.productName && formik.errors.ProductName && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.ProductName}</p>
          )}
        </div>

        {/* Item Description */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-teal-700">Item Description</label>
          <textarea
            name="ProductDescription"
            value={formik.values.ProductDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150 resize-none"
            rows="4"
          ></textarea>
          {formik.touched.ProductDescription && formik.errors.ProductDescription && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.ProductDescription}</p>
          )}
        </div>

        {/* Item Category */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-teal-700">Item Category</label>
          <select
            name="CategoryId"
            value={formik.values.CategoryId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            <option value="2006">Sofas</option>
            <option value="2007">Tables</option>
            <option value="2010">Dining Tables</option>
            <option value="2009">Chairs</option>
            <option value="2008">Beds</option>
          </select>
          {formik.touched.category && formik.errors.CategoryId && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.CategoryId}</p>
          )}
        </div>

        {/* Item Price */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-teal-700">Item Price</label>
          <input
            type="number"
            name="ProductPrice"
            value={formik.values.ProductPrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
          />
          {formik.touched.ProductPrice && formik.errors.ProductPrice && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.ProductPrice}</p>
          )}
        </div>

        {/* Item Material */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-teal-700">Item Material</label>
          <input
            type="text"
            name="Material"
            value={formik.values.Material}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
          />
          {formik.touched.Material && formik.errors.Material && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.Material}</p>
          )}
        </div>

                {/* Item Stock */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-teal-700">Item Stock</label>
          <input
            type="number"
            name="Stock"
            value={formik.values.Stock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
          />
          {formik.touched.Stock && formik.errors.Stock && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.Stock}</p>
          )}
        </div>

        {/* Item MRP */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-teal-700">Item MRP</label>
          <input
            type="number"
            name="MRP"
            value={formik.values.MRP}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
          />
          {formik.touched.MRP && formik.errors.MRP && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.MRP}</p>
          )}
        </div>


        {/* Item Image  */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            name="image"
            onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            accept="image/*"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-teal-800 text-white font-semibold rounded-md hover:bg-teal-900 focus:outline-none focus:ring-4 focus:ring-teal-600 transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;


