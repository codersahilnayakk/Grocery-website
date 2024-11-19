import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const PlaceOrder = () => {
  const { onlyCOD, totalAmount } = useContext(ShopContext); // Assuming totalAmount is provided in ShopContext
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    // Check required fields
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Validate phone number (must be 10 digits)
    if (formData.phone && formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (validateForm()) {
      if (totalAmount <= 0) {
        setErrors({ totalAmount: 'Total must be greater than 0.00' });
      } else {
        alert('Order placed successfully', formData);
        // Proceed with placing the order and navigate
        navigate('/'); // Navigate to the home page after placing the order
      }
    }
  };

  return (
    <div className='flex flex-row justify-between gap-4 pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-[480px]'>
        <div className='text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <div className='w-full'>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              placeholder='First Name'
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          <div className='w-full'>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              placeholder='Last Name'
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
        </div>
        <div className='w-full'>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='Email Address'
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className='w-full'>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='Street'
          />
          {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
        </div>
        <div className='flex gap-3'>
          <div className='w-full'>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              placeholder='City'
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          <div className='w-full'>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              placeholder='State'
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>
        </div>
        <div className='flex gap-3'>
          <div className='w-full'>
            <select
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            >
              <option value="">Select Pincode</option>
              <option value="713364">713364</option>
              <option value="713386">713386</option>
            </select>
            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
          </div>
          <div className='w-full'>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              placeholder='Country'
            />
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>
        </div>
        <div className='w-full'>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='Phone'
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
      </div>
      <div className='mt-8'>
        <div className='mt-8 min-w-8'>
          <CartTotal />
          {errors.totalAmount && <p className="text-red-500 text-sm">{errors.totalAmount}</p>}
        </div>
        <div className='mt-8'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3'>
            <div onClick={() => onlyCOD()} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => onlyCOD()} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-semibold'>Cash On Delivery</p>
            </div>
          </div>
        </div>
        <div className='w-full mt-8 text-end'>
          <button onClick={handlePlaceOrder} className='bg-black text-white px-16 py-3 text-sm'>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
