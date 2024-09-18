import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Productlist = () => {
  const [categories, setCategories] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    axios
      .get('http://localhost:3001/category')
      .then((res) => setCategories(res.data))
      .catch((err) => console.log('Fetching error...', err));
  }, []);

  const take=(productcategory)=>{
    navigate(`/productlist/${productcategory}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {categories.map((item) => (
          <div
            key={item.id}
            onClick={()=>take(item.name)}
            className="flex items-center border border-gray-200 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-teal-800">
                {item.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productlist;

