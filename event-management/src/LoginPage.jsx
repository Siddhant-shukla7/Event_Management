import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './LoginPage.css';   

function LoginPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();  // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.post('http://localhost:5000/api/users/create', {
          name,
          email
        })
        .then(response => {
          console.log(response.data);
          // Navigate to the Create Event page after successful login
          navigate('/create-event');  // Use the correct path for the Create Event page
        })
        .catch(error => {
          console.error(error);
        });
        
      console.log('User logged in successfully!');
      alert('Login successful!');
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="login-label">Email:</label>
        <input
          type="email"
          id="email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="name" className="login-label">Name:</label>
        <input
          type="text"
          id="name"
          className="login-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
