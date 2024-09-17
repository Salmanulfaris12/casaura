import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3001/category")
      .then((res) => setCategories(res.data))
      .catch(()=>console.log("fetching error...."))
  }, []);

  const take=(category)=>{
    navigate(`/category/${category}`)
  }

  return (
    <div id='categories-section' className="bg-gray-100 py-10">
      <div className=" mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-teal-800 mb-8  text-center">Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
          {categories.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden" onClick={()=>take(item.name)}>
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-teal-800 mb-2">{item.name}</h2>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
