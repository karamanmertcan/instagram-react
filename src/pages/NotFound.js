import React, { useEffect } from 'react';
import Header from '../components/Header';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Not Found! - Instagram';
  }, []);
  return (
    <div className="bg-gray-100">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">Not Found</p>
      </div>
    </div>
  );
};

export default NotFound;
