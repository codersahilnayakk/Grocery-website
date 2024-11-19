import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import Title from './Title';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);
    useEffect(()=>{
        const temp = products.filter((item)=>(item.bestseller))
        setBestSeller(temp.slice(0,5))
    },[])
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLER'} />
        <p className='w-3/4 m-auto text-xs text-gray-600'>
        Discover our top-rated products that customers love and keep coming back for. From fresh produce to pantry staples, these items are favorites in kitchens everywhere for their quality and value. Whether you're stocking up for the week or looking for something special, these bestsellers are tried, tested, and trusted by our loyal shoppers.
</p>
        <div className='grid grid-cols-5 gap-4 pt-7'>
            {
                bestSeller.map((item)=>(
                    <ProductItem key={item._id} item={item} />
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default BestSeller
