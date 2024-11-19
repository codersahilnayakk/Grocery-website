import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Save new user to localStorage (simulating users.json)
  const saveUserToLocalStorage = (newUser) => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || []; // Get existing users (if any)
    existingUsers.push(newUser);  // Add new user to the list
    localStorage.setItem('users', JSON.stringify(existingUsers));  // Store back to localStorage
  };

  // Get users from localStorage (simulating users.json)
  const getUsersFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('users')) || []; // Fetch users (if any)
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form data
  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      return 'Email and Password are required';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    return null;  // Validation passed
  };

  // Handle form submission (Sign Up / Login)
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (currentState === 'Sign Up') {
      // Check if email already exists
      const users = getUsersFromLocalStorage();
      if (users.some(user => user.email === formData.email)) {
        setError('Email already exists!');
        return;
      }

      // Save new user to localStorage (simulating users.json)
      saveUserToLocalStorage(formData);
      setError('');
      alert('User created successfully!');
    } else {
      // Login Logic
      const users = getUsersFromLocalStorage();
      const user = users.find(user => user.email === formData.email && user.password === formData.password);
      if (user) {
        setError('');
        alert('Login successful');
        const expiryTime = Date.now() + 5 * 60 * 1000; // 5 minutes from now
        localStorage.setItem('loggedInUser', JSON.stringify({ name: user.name, expiry: expiryTime }));
        navigate('/'); // Redirect to the home page
      }
      else {
        setError('Invalid email or password');
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>
        {
          currentState === 'Sign Up' &&
          <input
            type="text"
            name="name"
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Name'
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        }
        <input
          type="email"
          name="email"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Password'
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forget your password</p>
          {
            currentState === 'Login' ? (
              <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
            ) : (
              <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
            )
          }
        </div>
        <button className='bg-black text-white font-light px-8 mt-4'>
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Login;
