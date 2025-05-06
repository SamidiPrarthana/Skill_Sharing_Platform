import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../Style/PlanList.css';

const PlansList = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // ➡️ Add current page
  const plansPerPage = 6; // ➡️ 6 plans per page

  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/plan/all');
      setPlans(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch plans');
      setLoading(false);
    }
  };

  const handleAddPlan = () => {
    navigate('/Planform');
  };

  const handleEditPlan = (planId) => {
    navigate(`/EditPlan/${planId}`);
  };

  const handleDeletePlan = async (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/plan/delete/${planId}`);
        fetchPlans();
      } catch (err) {
        setError('Failed to delete plan');
      }
    }
  };

  // ➡️ Calculate pagination
  const indexOfLastPlan = currentPage * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = plans.slice(indexOfFirstPlan, indexOfLastPlan);

  const totalPages = Math.ceil(plans.length / plansPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return <div className="loading-message">Loading plans...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="plans-list-container">
      <div className="plans-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span className="back-arrow"></span>
          Back
        </button>
        <button className="add-plan-button" onClick={handleAddPlan}>
          Add Learning Plan
        </button>
      </div>

      <h2 className="plans-list-heading">Traditional Recipes Learning Plans</h2>

      {plans.length === 0 ? (
        <div className="no-plans-message">
          No meal plans available. Create one to get started!
          <button className="add-plan-button" onClick={handleAddPlan}>
            Add Learning Plan
          </button>
        </div>
      ) : (
        <>
          <ul className="plans-list">
            {currentPlans.map((plan) => (
              <li key={plan.planId} className="plan-card">
                <div className="plan-actions">
                  <button 
                    className="icon-button edit-button"
                    onClick={() => handleEditPlan(plan.planId)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="icon-button delete-button"
                    onClick={() => handleDeletePlan(plan.planId)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
                <h3 className="plan-title">{plan.planTitle}</h3>
                <p className="plan-detail"><strong>Main Ingredients:</strong> {plan.planMainIngredients}</p>
                <p className="plan-detail"><strong>Description:</strong> {plan.planDescription}</p>
                <p className="plan-detail"><strong>Dates:</strong> {plan.planStartDate} to {plan.planEndDate}</p>
                <p className="plan-detail"><strong>Difficulty:</strong> {plan.planDifficulty}</p>
                <p className="plan-detail"><strong>Category:</strong> {plan.planCategory}</p>
              </li>
            ))}
          </ul>

          {/* ➡️ Pagination controls */}
          <div className="pagination">
            <button onClick={goToPrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PlansList;
