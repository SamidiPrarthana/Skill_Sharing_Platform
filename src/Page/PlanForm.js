import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Style/PlanForm.css';

const PlanForm = ({ fetchPlans = () => {}, clearSelection = () => {} }) => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState({
    planTitle: '',
    planMainIngredients: '',
    planDescription: '',
    planStartDate: '',
    planEndDate: '',
    planDifficulty: '',
    planCategory: ''
  });

  const difficultyOptions = [
    { value: '', label: 'Select difficulty' },
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
    { value: 'Expert', label: 'Expert' }
  ];

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/v1/plan/save', plan);
      fetchPlans();
      setPlan({
        planTitle: '',
        planMainIngredients: '',
        planDescription: '',
        planStartDate: '',
        planEndDate: '',
        planDifficulty: '',
        planCategory: ''
      });
      clearSelection();
      setSuccessMessage('Plan added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setSuccessMessage('An error occurred while adding the plan.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleReset = () => {
    setPlan({
      planTitle: '',
      planMainIngredients: '',
      planDescription: '',
      planStartDate: '',
      planEndDate: '',
      planDifficulty: '',
      planCategory: ''
    });
    clearSelection();
  };

  return (
    <div className="plan-form-container">
      <button 
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      
      <form onSubmit={handleSubmit} className="plan-form">
        <h2 className="plan-form-heading">Add New Learning Plan</h2>
        
        <div className="form-group">
          <label className="form-label">Title:</label>
          <input 
            className="form-input"
            name="planTitle" 
            value={plan.planTitle} 
            onChange={handleChange} 
            placeholder="Enter plan title" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Main Ingredients:</label>
          <input 
            className="form-input"
            name="planMainIngredients" 
            value={plan.planMainIngredients} 
            onChange={handleChange} 
            placeholder="Enter main ingredients" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea 
            className="form-input form-textarea"
            name="planDescription" 
            value={plan.planDescription} 
            onChange={handleChange} 
            placeholder="Enter description" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Start Date:</label>
          <input 
            className="form-input"
            type="date" 
            name="planStartDate" 
            value={plan.planStartDate} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">End Date:</label>
          <input 
            className="form-input"
            type="date" 
            name="planEndDate" 
            value={plan.planEndDate} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Difficulty:</label>
          <select
            className="form-input form-select"
            name="planDifficulty" 
            value={plan.planDifficulty} 
            onChange={handleChange}
            required
          >
            {difficultyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Category:</label>
          <input 
            className="form-input"
            name="planCategory" 
            value={plan.planCategory} 
            onChange={handleChange} 
            placeholder="Enter category" 
          />
        </div>
        
        <div className="form-buttons">
          
          <button type="submit" className="form-button">
            Submit Plan
          </button>
        </div>

        {successMessage && <div className="success-message">{successMessage}</div>}
      </form>
    </div>
  );
};

export default PlanForm;