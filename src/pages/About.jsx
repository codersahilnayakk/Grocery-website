import React from 'react'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'
import { assets } from '../assets/assets'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-row gap-16'>
        <img className='max-w-[450px]' src={assets.logo} alt="" />
        <div className='flex flex-col justify-center gap-6 w-2/4 text-gray-600'>
          <p>If you are looking for farm fresh fruits and vegetables, world-class breads, top-quality pulses and food grains, dairy products, then, SHREE BHANDAR has got you covered.</p>
          <p>No more getting stuck in traffic jams, paying for parking, standing in long queues and carrying heavy bags- get everything you need, when you need, right at your doorstep. Right from fresh fruits and vegetables, rice and dals, spices and seasonings to packaged products-we have it all.</p>
          <b className='text-gray-600'>Our Mission</b>
          <p>Our mission at Shree Bhandar is to allow user to choose from a wide range of options in every category, exclusively handpicked to help you find the best quality available at lowest prices. Select a time slot for delivery and your order will be delivered right to your doorstep anywhere in two pincodes 713364, 713386 over West Bengal.</p>
        </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-row text-sm mb-20'>
        <div className='border px-16 py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='border px-16 py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className='border px-16 py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default About
