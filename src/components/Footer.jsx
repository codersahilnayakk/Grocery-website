import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-2/3 text-gray-600'>
            Fresh produce, top-quality groceries, and everyday essentials delivered to your doorstep. Shop with us for the best prices and the utmost conveniece, anywhere in India.
            </p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-slate-600'>
                <li>+91 7063628574</li>
                <li>shreebhandar85@gmail.com</li>
                <li>Instagram</li>
            </ul>
        </div>
      </div>
      <div>
        <hr/>
        <p className='text-center my-4 text-sm'>Copyright2024@ fancygarments.com - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
