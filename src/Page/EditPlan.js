import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../Style/EditPlan.css';

const EditPlan = () => {
    const { planId } = useParams();
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPlan = async () => {
            try {
              const response = await axios.get(`http://localhost:8080/api/v1/plan/get/${planId}`);
              setPlan(response.data);
              setLoading(false);
            } catch (err) {
              setError('Failed to fetch plan');
              setLoading(false);
            }
          };

        fetchPlan();
    }, [planId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlan(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/v1/plan/update/${planId}`, plan);
            navigate('/plans'); // Redirect to plans list after successful update
        } catch (err) {
            setError('Failed to update plan');
        }
    };

    if (loading) {
        return <div className="loading-message">Loading plan details...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="edit-plan-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                <span className="back-arrow"></span>
                Back
            </button>

            <h2>Edit Learning Plan</h2>
            
            <form onSubmit={handleSubmit} className="edit-plan-form">
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="planTitle"
                        value={plan.planTitle}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Main Ingredients:</label>
                    <input
                        type="text"
                        name="planMainIngredients"
                        value={plan.planMainIngredients}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        name="planDescription"
                        value={plan.planDescription}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            name="planStartDate"
                            value={plan.planStartDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>End Date:</label>
                        <input
                            type="date"
                            name="planEndDate"
                            value={plan.planEndDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Difficulty:</label>
                        <select
                            name="planDifficulty"
                            value={plan.planDifficulty}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Difficulty</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Category:</label>
                        <input
                            type="text"
                            name="planCategory"
                            value={plan.planCategory}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="save-button">Save Changes</button>
            </form>
        </div>
    );
};

export default EditPlan;