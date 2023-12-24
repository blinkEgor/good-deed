'use client'

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  username: string;
  password: string;
}

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [registrationMessage, setRegistrationMessage] = useState('');

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Here, you would typically make an API request to your backend
    // to handle user registration and store the data securely.

    // For simplicity, we'll just log the details to the console.
    console.log('Registering user:', data);

    // Update the state or redirect the user after successful registration.
    setRegistrationMessage('Registration successful!');
  };

  return (
    <div className='text-gray-100'>
      <h1>Registration Page</h1>
      <form
        className='flex-col items-center' 
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>
          Username:
          <input
            className='bg-gray-600'
            type="text"
            {...register('username', { required: 'Username is required' })}
          />
        </label>
        <div>{errors.username && <span>{errors.username.message}</span>}</div>

        <br />

        <label>
          Password:
          <input
            className='bg-gray-600'
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
        </label>
        <div>{errors.password && <span>{errors.password.message}</span>}</div>

        <br />

        <button type="submit">Register</button>
      </form>

      <div>{registrationMessage}</div>
    </div>
  );
};