import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {

  // useState basically creates a new object we we van store a value to refer back to 
  // in this case we are saving a default settinjg in the form state variable
  // setFormState is designated as the name of the function that can alter the values in formState
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });


  // this hook takes the ADD_USER function in wraps it in a js function
  // that function is then returned to us as addUser
  const [addUser, { error }] = useMutation(ADD_USER);
  // update state based on form input changes
  // this function acts as the event handler that takes the value and name from the event

  const handleChange = (event) => {
    const { name, value } = event.target;

    // the spread operator in this case allows for you to update the name and value without overriding 
    // the rest of the state object
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  // submit form (notice the async!)
const handleFormSubmit = async event => {
  event.preventDefault();

  // use try/catch instead of promises to handle errors
  try {
    const { data } = await addUser({
      variables: { ...formState }
    });
  
    Auth.login(data.addUser.token);
  } catch (e) {
    console.error(e);
  }
};

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-md-6'>
        <div className='card'>
          <h4 className='card-header'>Sign Up</h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                placeholder='Your username'
                name='username'
                type='username'
                id='username'
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <button className='btn d-block w-100' type='submit'>
                Submit
              </button>
            </form>
            {error && <div>Sign up failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
