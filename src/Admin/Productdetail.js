import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Productdetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.log('Error in fetching:', err));
  }, [id]);

  const handleRemove = async () => {
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      navigate(-1, { replace: true });
    } catch {
      console.log('Error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-gray-50 p-12 mt-12 rounded-2xl shadow-lg border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full lg:w-80 h-80 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-teal-800">{item.name}</h2>
            <p className="text-lg text-teal-700">{item.description}</p>
            <p className="text-md text-gray-600">
              <span className="font-medium">Category:</span> {item.category}
            </p>
            <p className="text-md text-gray-600">
              <span className="font-medium">Material:</span> {item.material}
            </p>
            <p className="text-2xl font-bold text-teal-800">${item.price}</p>
          </div>
          <div className="mt-8 flex gap-6">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-3 bg-red-600 text-lg text-white font-semibold rounded-md hover:bg-red-700 transition duration-300"
            >
              Back
            </button>
            <button
              onClick={() =>navigate(`/productdetail/${item.id}`) }
              className="flex-1 py-3 bg-teal-700 text-lg text-white font-semibold rounded-md hover:bg-teal-800 transition duration-300"
            >
              Edit
            </button>
            <button
              onClick={handleRemove}
              className="flex-1 py-3 bg-red-700 text-lg text-white font-semibold rounded-md hover:bg-red-800 transition duration-300"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetail;

