import React, { useState } from 'react';

// This component is designed to work with the Spring Boot backend controller
// Make sure your Spring Boot application is running before using this form

const RegistrationForm = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;
    
    if (!user.fullName.trim()) {
      tempErrors.fullName = "Full name is required";
      isValid = false;
    }
    
    if (!user.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }
    
    if (!user.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (user.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    
    if (!user.phone.trim()) {
      tempErrors.phone = "Phone number is required";
      isValid = false;
    }
    
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Check if Spring Boot server is running on port 8080, if not use 8081 (common alternative)
        const serverPort = 8080;
        const response = await fetch(`http://localhost:${serverPort}/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
          // Adding a timeout to prevent long waiting if server is down
          signal: AbortSignal.timeout(10000)
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log("User registered successfully:", data);
          setIsSubmitted(true);
          
          // Reset form after successful submission
          setUser({
            fullName: '',
            email: '',
            password: '',
            phone: ''
          });
        } else {
          console.error("Registration failed with status:", response.status);
          alert(`Registration failed with status: ${response.status}. Please check your backend server.`);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("Connection to server failed. Please make sure your Spring Boot application is running on port 8080.");
      }
    }
  };

  const formStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif'
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#333',
    borderBottom: '2px solid #5c913b',
    paddingBottom: '10px',
    marginBottom: '20px'
  };

  const inputGroupStyle = {
    marginBottom: '15px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#444'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box'
  };

  const errorStyle = {
    color: '#d32f2f',
    fontSize: '14px',
    marginTop: '5px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#5c913b',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  const successMessageStyle = {
    backgroundColor: '#dff0d8',
    color: '#3c763d',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px',
    textAlign: 'center'
  };

  return (
    <div style={formStyle}>
      <h2 style={headerStyle}>User Registration</h2>
      
      {isSubmitted && (
        <div style={successMessageStyle}>
          Registration successful! User has been saved to database.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.fullName && <div style={errorStyle}>{errors.fullName}</div>}
        </div>
        
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>
        
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            style={inputStyle}
            autoComplete="new-password"
          />
          {errors.password && <div style={errorStyle}>{errors.password}</div>}
        </div>
        
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
        </div>
        
        <button type="submit" style={buttonStyle}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;