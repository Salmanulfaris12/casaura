import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-8xl font-bold text-red-700 mb-4">404</h1>
      <p className="text-xl text-red-700 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-teal-800 text-white font-semibold rounded-md hover:bg-teal-900 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NoMatch;
