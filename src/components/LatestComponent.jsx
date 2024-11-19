import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestComponent = () => {
    const {products} = useContext(ShopContext);
    const [latestProducts,setLatestProduct] = useState([]);
    useEffect(()=>{
      setLatestProduct(products.slice(0,15));
    },[])
    // console.log(products)
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'SPECIAL'} text2={'DEALS'}/>
        <p className='w-3/4 m-auto text-xs text-gray-600'>
        Don’t miss out on our limited-time offers! Enjoy great savings on top products, from fresh produce to pantry essentials. These deals won’t last long, so stock up while you can!
        </p>
      </div>
      <div className='grid grid-cols-5 gap-4'>
        {
          latestProducts.map((item)=>(
            <ProductItem key={item._id} item={item}/>
          ))
        }
      </div>
    </div>
  )
}

export default LatestComponent
