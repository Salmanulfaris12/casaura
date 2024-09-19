import axios from 'axios';
import React, { useState } from 'react';

const AddProducts = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    material: '',
    image: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.description) errors.description = 'Description is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.price) errors.price = 'Price is required';
    if (!formData.material) errors.material = 'Material is required';
    if (!formData.image) errors.image = 'Image URL is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      axios
        .post('http://localhost:3001/products', { ...formData })
        .then((res) => {
          console.log(res.data);
          setFormData({
            name: '',
            description: '',
            category: '',
            price: '',
            material: '',
            image: '',
          });
          setErrors({});
        })
        .catch((err) => console.log('Error in submitting', err));
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 mt-10 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-teal-800 mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="text-lg font-medium text-teal-700">Item Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-medium text-teal-700">Item Description</label>
          <textarea
            name="description"
            value={formData.description}
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
            value={formData.category}
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
            value={formData.price}
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
            value={formData.material}
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
            value={formData.image}
            onChange={handleChange}
            className="p-3 mt-1 border border-gray-300 rounded-md focus:border-teal-600 focus:ring-2 focus:ring-teal-500 outline-none transition ease-in-out duration-150"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
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
