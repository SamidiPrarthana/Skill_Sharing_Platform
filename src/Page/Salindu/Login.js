import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// This component is designed to work with your Spring Boot backend controller:
// @PostMapping("/login")
// Uses UserRepository.findByEmail and checks password matching

const LoginForm = () => {
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;
    
    if (!credentials.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }
    
    if (!credentials.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }
    
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Using the login endpoint from your Spring Boot controller
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials)
        });
        
        const data = await response.json();
        
        if (response.ok) {
          console.log("Login successful:", data);
          
          // Store user ID in localStorage
          localStorage.setItem('userId', data.id);
          localStorage.setItem('isLoggedIn', 'true');
          
          // Navigate to dashboard or home page after successful login
          navigate('/userprofile');
        } else {
          console.error("Login failed:", data.message);
          setErrors({ auth: data.message || "Wrong email or password" });
        }
      } catch (error) {
        console.error("Error during login:", error);
        setErrors({ auth: "Connection error. Please try again later." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Form styles - matching the registration form's traditional theme
  const formStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    fontFamily: 'Arial, sans-serif'
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#333',
    borderBottom: '2px solid #5c913b',
    paddingBottom: '15px',
    marginBottom: '25px',
    fontSize: '24px'
  };

  const inputGroupStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold',
    color: '#444',
    fontSize: '16px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease'
  };

  const errorStyle = {
    color: '#d32f2f',
    fontSize: '14px',
    marginTop: '5px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#5c913b',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '15px',
    transition: 'background-color 0.3s ease',
    fontWeight: 'bold'
  };

  const forgotPasswordStyle = {
    textAlign: 'right',
    marginTop: '10px',
    fontSize: '14px'
  };

  const linkStyle = {
    color: '#5c913b',
    textDecoration: 'none',
    cursor: 'pointer'
  };

  const registerContainerStyle = {
    textAlign: 'center',
    marginTop: '20px',
    padding: '15px 0',
    borderTop: '1px solid #ddd'
  };

  // Loading spinner styles
  const spinnerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20px',
    marginTop: '15px'
  };

  const spinnerStyle = {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #5c913b',
    animation: 'spin 1s linear infinite'
  };

  return (
    <div style={formStyle}>
      <h2 style={headerStyle}>User Login</h2>
      
      {errors.auth && <div style={errorStyle}>{errors.auth}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            style={inputStyle}
            autoComplete="email"
            placeholder="Enter your email address"
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>
        
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            style={inputStyle}
            autoComplete="current-password"
            placeholder="Enter your password"
          />
          {errors.password && <div style={errorStyle}>{errors.password}</div>}
        </div>
        
        <div style={forgotPasswordStyle}>
          <span 
            style={linkStyle}
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password?
          </span>
        </div>
        
        <button 
          type="submit" 
          style={{
            ...buttonStyle,
            backgroundColor: isLoading ? '#7ba45f' : '#5c913b',
            cursor: isLoading ? 'default' : 'pointer'
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        
        {isLoading && (
          <div style={spinnerContainerStyle}>
            <div style={{
              ...spinnerStyle,
              animation: 'spin 1s linear infinite',
            }}></div>
          </div>
        )}
      </form>
      
      <div style={registerContainerStyle}>
        <p>
          Don't have an account?{' '}
          <span 
            style={linkStyle}
            onClick={() => navigate('/register')}
          >
            Register now
          </span>
        </p>
      </div>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoginForm;