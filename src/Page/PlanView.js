import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import '../Style/PlanView.css'; // Create this CSS file for styling

const PlanView = () => {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const planRef = useRef();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        // Log the planId to check if it's being retrieved correctly
        console.log('Fetching plan for ID:', planId);
        const response = await axios.get(`http://localhost:8080/api/v1/plan/get/${planId}`);
        setPlan(response.data);
      } catch (err) {
        // Log the full error for better debugging
        console.error('Error fetching plan:', err.response || err.message);
        setError('Failed to load plan details');
      }
    };

    // Only fetch the plan if planId is available
    if (planId) {
      fetchPlan();
    } else {
      setError('Plan ID is missing');
    }
  }, [planId]);

 


  if (error) return <div className="error-message">{error}</div>;
  if (!plan) return <div className="loading-message">Loading...</div>;

  return (
    <div className="plan-view-container">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <div ref={planRef} className="plan-details-card">
        <h2>{plan.planTitle}</h2>
        <p><strong>Main Ingredients:</strong> {plan.planMainIngredients}</p>
        <p><strong>Description:</strong> {plan.planDescription}</p>
        
        <p><strong>Difficulty:</strong> {plan.planDifficulty}</p>
        <p><strong>Category:</strong> {plan.planCategory}</p>
      </div>
      
    </div>
  );
};

export default PlanView;
