import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3001/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.log('fetching error', err));
  }, []);

  const withoutAdmin = users.filter((user) => !user.isAdmin);
  const take = (userid) => {
    navigate(`/admin/userd/${userid}`);
  };

  return (
    <div className='bg-gray-100 min-h-screen p-4 sm:p-8'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold text-teal-800 mb-6'>User List</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {withoutAdmin.map((user) => (
            <div
              key={user.id}
              onClick={() => take(user.id)}
              className='bg-white shadow-md rounded-lg p-6 cursor-pointer border border-gray-200 transition-transform duration-300 transform hover:scale-105'
            >
              <h2 className='text-lg font-semibold text-teal-700 mb-2'>
                User ID: {user.id}
              </h2>
              <p className='text-gray-600'>
                <span className='font-medium'>Name:</span> {user.name}
              </p>
              <p className='text-gray-600 truncate'>
                <span className='font-medium'>Email:</span> {user.email}
              </p>
              <p className='text-gray-900 font-medium'>
                Status: {user.isAllowed ? (
                  <span className='text-green-700 font-bold'>ACTIVE</span>
                ) : (
                  <span className='text-red-700 font-bold'>BLOCKED</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Userlist;

