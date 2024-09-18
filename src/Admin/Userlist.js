import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Userlist = () => {
  const [users, setUsers] = useState([]);

    const navigate=useNavigate()

  useEffect(() => {
    axios
      .get('http://localhost:3001/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.log('fetching error', err));
  }, []);

  const take=(userid)=>{
    navigate(`/userlist/${userid}`)
  }

  return (
    <div className='bg-gray-100 min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6'>User List</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {users.map((user) => (
            <div
              key={user.id}
              onClick={()=>take(user.id)}
              className='bg-white shadow-md rounded-lg p-6 cursor-pointer border border-gray-200'
            >
              <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                User ID: {user.id}
              </h2>
              <p className='text-gray-600'>
                <span className='font-medium'>Name:</span> {user.name}
              </p>
              <p className='text-gray-600'>
                <span className='font-medium'>Email:</span> {user.email}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Userlist;
