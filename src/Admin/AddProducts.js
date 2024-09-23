import React from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup"
// import * as Yup from 'yup';
import axios from 'axios';

const AddProducts = () => {
  // Formik setup with initial values, validation schema, and submit handler
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      category: '',
      price: '',
      material: '',
      image: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Description is required'),
      category: Yup.string().required('Category is required'),
      price: Yup.number().required('Price is required').positive('Price must be positive'),
      material: Yup.string().required('Material is required'),
      image: Yup.string().url('Invalid URL format').required('Image URL is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      axios
        .post('http://localhost:3001/products', values)
        .then((res) => {
          console.log(res.data);
          resetForm();
        })
        .catch((err) => console.log('Error in submitting', err));
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
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Item Description */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-teal-700">Item Description</label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150 resize-none"
            rows="4"
          ></textarea>
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
          )}
        </div>

        {/* Item Category */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-teal-700">Item Category</label>
          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            <option value="Sofas">Sofas</option>
            <option value="Tables">Tables</option>
            <option value="Dining Tables">Dining Tables</option>
            <option value="Gaming chairs">Gaming chairs</option>
            <option value="Chairs">Chairs</option>
            <option value="Beds">Beds</option>
            <option value="Mattresses">Mattresses</option>
          </select>
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.category}</p>
          )}
        </div>

        {/* Item Price */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-teal-700">Item Price</label>
          <input
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
          />
          {formik.touched.price && formik.errors.price && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
          )}
        </div>

        {/* Item Material */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-teal-700">Item Material</label>
          <input
            type="text"
            name="material"
            value={formik.values.material}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
          />
          {formik.touched.material && formik.errors.material && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.material}</p>
          )}
        </div>

        {/* Item Image URL */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-teal-700">Item Image URL</label>
          <input
            type="text"
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
          />
          {formik.touched.image && formik.errors.image && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
          )}
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


