import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Retrieve the logged-in user's name and expiry from localStorage
    const userData = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userData) {
      const currentTime = Date.now();

      if (currentTime < userData.expiry) {
        setUserName(userData.name); // Update the state with the user's name
      } else {
        // If the session has expired, clear the localStorage
        localStorage.removeItem('loggedInUser');
      }
    }
  }, []);

  return (
    <div className='flex flex-row border border-gray-400'>
      <div className='w-full flex items-center justify-center py-10'>
        <div className='text-[#414141]'>
          {userName && <h2 className="text-xl font-semibold mb-4">Hello, {userName}</h2>}
          <div className='flex items-center gap-2'>
            <p className='w-8 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm'>Order Your DAILY GROCERY</p>
          </div>
          <h1 className='text-3xl leading-relaxed'>#Free Delivery</h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm'>SHOP NOW</p>
            <p className='w-8 h-[1px] bg-[#414141]'></p>
          </div>
        </div>
      </div>
      <img className="w-2/5" src={assets.hero_img} alt="Hero" />
    </div>
  );
};

export default Hero;
