import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext)
  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // Added state for total amount

  useEffect(() => {
    const tempData = [];
    let total = 0; // Variable to calculate the total

    // Loop through cartItems to calculate total
    for (const i in cartItems) {
      for (const j in cartItems[i]) {
        if (cartItems[i][j] > 0) {
          tempData.push({
            _id: i,
            size: j,
            quantity: cartItems[i][j]
          });

          // Find the product corresponding to the cart item
          const productData = products.find((prod) => prod._id === i); // Fix: match `i` to product `_id`
          if (productData) {
            total += productData.price * cartItems[i][j]; // Add item price * quantity to total
          }
        }
      }
    }

    console.log("Updated cartData:", tempData);
    console.log("Updated totalAmount:", total);

    setCartData(tempData); // Update cart data
    setTotalAmount(total); // Update total amount
  }, [cartItems, products]); // Recalculate total whenever cartItems or products change

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {
          cartData.map((item) => {
            const productData = products.find((prod) => prod._id === item._id);
            return (
              <div key={item.id} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-20' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-3 py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input type="number" onChange={(e) => e.target.value === '' || e.target.value === '0' ? 0 : updateQuantity(item._id, item.size, Number(e.target.value))} className='border w-14 px-2 py-1' min={1} defaultValue={item.quantity} />
                <img onClick={() => updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} className='cursor-pointer w-5 mr-4' alt="" />
              </div>
            )
          })
        }
        <div className='flex justify-end my-20'>
          <div className='w-[450px]'>
            <CartTotal />
            <div className='w-full text-end'>
              <Link to='/place-order'>
                {/* Disable the button if totalAmount is less than or equal to 0 */}
                <button className='bg-black text-white text-sm my-8 px-8 py-3' disabled={totalAmount <= 0}>PROCEED TO CHECKOUT</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
