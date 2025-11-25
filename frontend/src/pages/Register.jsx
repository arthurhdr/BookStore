import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // ← Adicione esta linha

  const { username, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5555/auth/register', {
        username,
        email,
        password,
      });

      // ATUALIZAR O CONTEXT EM VEZ DE APENAS O LOCALSTORAGE
      login(response.data); // ← Esta linha substitui o localStorage.setItem
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
        
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Username
            </label>
            <input
              type='text'
              name='username'
              value={username}
              onChange={onChange}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500'
              placeholder='Enter your username'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Email
            </label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500'
              placeholder='Enter your email'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Password
            </label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500'
              placeholder='Enter your password'
            />
          </div>

          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Confirm Password
            </label>
            <input
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={onChange}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500'
              placeholder='Confirm your password'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50'
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className='mt-4 text-center'>
          <p>
            Already have an account?{' '}
            <Link to='/login' className='text-sky-500 hover:text-sky-600'>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;