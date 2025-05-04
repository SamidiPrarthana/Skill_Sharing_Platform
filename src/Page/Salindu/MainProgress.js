import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgressTracker = () => {
  // State variables
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    progressId: '',
    progressName: '',
    progressCategory: '',
    progressQty: '',
    progressDetails: '',
    progressImage: null
  });
  
  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  // Templates
  const templates = [
    { 
      id: 'tutorial', 
      name: 'Completed Tutorial',
      fields: {
        progressCategory: 'Education',
        progressDetails: 'I completed a tutorial on:'
      }
    },
    { 
      id: 'skill', 
      name: 'New Skill Learned',
      fields: {
        progressCategory: 'Skill',
        progressDetails: 'I learned a new skill:'
      }
    },
    { 
      id: 'project', 
      name: 'Project Milestone',
      fields: {
        progressCategory: 'Project',
        progressDetails: 'I reached a milestone in my project:'
      }
    },
    { 
      id: 'certification', 
      name: 'New Certification',
      fields: {
        progressCategory: 'Certification',
        progressDetails: 'I received a new certification in:'
      }
    }
  ];

  // Fetch all progress entries when component mounts
  useEffect(() => {
    fetchProgress();
  }, []);

  // Fetch all progress entries from the API
  const fetchProgress = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/progress');
      setProgress(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch progress data. Please try again later.');
      console.error('Error fetching progress:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        progressImage: file
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Apply template to form data
  const applyTemplate = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setFormData({
        ...formData,
        ...template.fields
      });
      setSelectedTemplate(templateId);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create FormData object for file upload
      const formDataObj = new FormData();
      
      // Prepare progress details as JSON
      const progressDetails = {
        progressId: formData.progressId,
        progressName: formData.progressName,
        progressCategory: formData.progressCategory,
        progressQty: formData.progressQty,
        progressDetails: formData.progressDetails
      };
      
      formDataObj.append('progressDetails', JSON.stringify(progressDetails));
      
      if (formData.progressImage) {
        formDataObj.append('file', formData.progressImage);
      }
      
      let response;
      
      if (isEditing && editId) {
        // Update existing progress
        response = await axios.put(`http://localhost:8080/api/progress/${editId}`, formDataObj);
      } else {
        // Create new progress
        if (formData.progressImage) {
          // First upload image
          const uploadResponse = await axios.post('http://localhost:8080/api/progress/upload', formDataObj);
          
          // Then create progress with the image filename
          progressDetails.progressImage = uploadResponse.data;
          response = await axios.post('http://localhost:8080/api/progress', progressDetails);
        } else {
          // Create progress without image
          response = await axios.post('http://localhost:8080/api/progress', progressDetails);
        }
      }
      
      // Refresh progress list
      fetchProgress();
      
      // Reset form
      resetForm();
      setOpenDialog(false);
      
    } catch (err) {
      setError('Failed to save progress. Please try again.');
      console.error('Error saving progress:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a progress entry
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this progress entry?')) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:8080/api/progress/${id}`);
        fetchProgress();
      } catch (err) {
        setError('Failed to delete progress. Please try again.');
        console.error('Error deleting progress:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Edit a progress entry
  const handleEdit = (progressItem) => {
    setIsEditing(true);
    setEditId(progressItem.id);
    
    setFormData({
      progressId: progressItem.progressId || '',
      progressName: progressItem.progressName || '',
      progressCategory: progressItem.progressCategory || '',
      progressQty: progressItem.progressQty || '',
      progressDetails: progressItem.progressDetails || '',
      progressImage: null
    });
    
    if (progressItem.progressImage) {
      setImagePreview(`http://localhost:8080/api/progress/media/${progressItem.progressImage}`);
    } else {
      setImagePreview('');
    }
    
    setOpenDialog(true);
  };

  // Reset form state
  const resetForm = () => {
    setFormData({
      progressId: '',
      progressName: '',
      progressCategory: '',
      progressQty: '',
      progressDetails: '',
      progressImage: null
    });
    setImagePreview('');
    setSelectedTemplate('');
    setIsEditing(false);
    setEditId(null);
  };

  // Open dialog for new progress entry
  const handleOpenDialog = () => {
    resetForm();
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  // Get category color for visual distinction
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Education':
        return '#4caf50';
      case 'Skill':
        return '#2196f3';
      case 'Project':
        return '#ff9800';
      case 'Certification':
        return '#9c27b0';
      default:
        return '#757575';
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '30px', color: '#333' }}>
          Progress Tracker
        </h1>
        
        <button 
          onClick={handleOpenDialog}
          style={{
            backgroundColor: '#1976d2', 
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold'
          }}
        >
          <span style={{ marginRight: '8px' }}>+</span> Add New Progress
        </button>
        
        {error && (
          <p style={{ color: '#d32f2f', marginBottom: '15px' }}>
            {error}
          </p>
        )}
        
        {loading ? (
          <div style={{ textAlign: 'center', margin: '40px 0' }}>
            <p>Loading...</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -15px' }}>
            {progress.length > 0 ? (
              progress.map((item) => (
                <div 
                  key={item.id} 
                  style={{ 
                    width: 'calc(33.33% - 30px)', 
                    margin: '0 15px 30px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {item.progressImage && (
                    <div style={{ height: '200px', overflow: 'hidden' }}>
                      <img
                        src={`http://localhost:8080/api/progress/media/${item.progressImage}`}
                        alt={item.progressName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div 
                    style={{ 
                      height: '10px', 
                      backgroundColor: getCategoryColor(item.progressCategory) 
                    }} 
                  />
                  <div style={{ padding: '20px', flexGrow: 1 }}>
                    <h2 style={{ fontSize: '1.5rem', marginTop: '0', marginBottom: '10px', color: '#333' }}>
                      {item.progressName}
                    </h2>
                    <p style={{ marginBottom: '8px', color: '#666', fontSize: '0.9rem' }}>
                      Category: {item.progressCategory}
                    </p>
                    {item.progressQty && (
                      <p style={{ marginBottom: '8px', color: '#666', fontSize: '0.9rem' }}>
                        Quantity: {item.progressQty}
                      </p>
                    )}
                    <p style={{ marginBottom: '15px', color: '#333' }}>
                      {item.progressDetails}
                    </p>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-start', 
                    padding: '10px 20px',
                    borderTop: '1px solid #eee' 
                  }}>
                    <button 
                      onClick={() => handleEdit(item)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#1976d2',
                        cursor: 'pointer',
                        marginRight: '15px',
                        fontSize: '14px',
                        padding: '5px 10px'
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#d32f2f',
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '5px 10px'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ width: '100%', textAlign: 'center', margin: '40px 0' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#666' }}>No progress entries found.</h3>
                <p style={{ color: '#888' }}>Add your first progress by clicking the button above.</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Dialog for adding/editing progress */}
      {openDialog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'auto',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
          }}>
            <h2 style={{ marginTop: '0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              {isEditing ? 'Edit Progress' : 'Add New Progress'}
            </h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              {isEditing 
                ? 'Update your progress information below.'
                : 'Fill in the details of your progress or select a template to get started.'
              }
            </p>
            
            {!isEditing && (
              <div style={{ marginBottom: '25px' }}>
                <label htmlFor="template-select" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Use Template
                </label>
                <select
                  id="template-select"
                  value={selectedTemplate}
                  onChange={(e) => applyTemplate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '16px'
                  }}
                >
                  <option value="">None</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
                <small style={{ color: '#666', display: 'block', marginTop: '4px' }}>
                  Select a template to quickly fill the form
                </small>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -10px' }}>
                <div style={{ width: 'calc(50% - 20px)', padding: '0 10px', marginBottom: '15px' }}>
                  <label htmlFor="progressId" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Progress ID*
                  </label>
                  <input
                    required
                    id="progressId"
                    name="progressId"
                    value={formData.progressId}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div style={{ width: 'calc(50% - 20px)', padding: '0 10px', marginBottom: '15px' }}>
                  <label htmlFor="progressName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Progress Name*
                  </label>
                  <input
                    required
                    id="progressName"
                    name="progressName"
                    value={formData.progressName}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div style={{ width: 'calc(50% - 20px)', padding: '0 10px', marginBottom: '15px' }}>
                  <label htmlFor="progressCategory" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Category*
                  </label>
                  <select
                    required
                    id="progressCategory"
                    name="progressCategory"
                    value={formData.progressCategory}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      fontSize: '16px'
                    }}
                  >
                    <option value="">Select a category</option>
                    <option value="Education">Education</option>
                    <option value="Skill">Skill</option>
                    <option value="Project">Project</option>
                    <option value="Certification">Certification</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div style={{ width: 'calc(50% - 20px)', padding: '0 10px', marginBottom: '15px' }}>
                  <label htmlFor="progressQty" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Quantity (optional)
                  </label>
                  <input
                    id="progressQty"
                    name="progressQty"
                    value={formData.progressQty}
                    onChange={handleInputChange}
                    placeholder="e.g., 3 hours, 5 chapters, 100%"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div style={{ width: 'calc(100% - 20px)', padding: '0 10px', marginBottom: '15px' }}>
                  <label htmlFor="progressDetails" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Details*
                  </label>
                  <textarea
                    required
                    id="progressDetails"
                    name="progressDetails"
                    value={formData.progressDetails}
                    onChange={handleInputChange}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      fontSize: '16px',
                      resize: 'vertical'
                    }}
                  />
                </div>
                <div style={{ width: 'calc(100% - 20px)', padding: '0 10px', marginBottom: '15px' }}>
                  <label htmlFor="progressImage" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="progressImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{
                      width: '100%',
                      padding: '10px 0'
                    }}
                  />
                  {imagePreview && (
                    <div style={{ marginTop: '15px', textAlign: 'center' }}>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{ maxHeight: '200px', maxWidth: '100%' }} 
                      />
                    </div>
                  )}
                </div>
              </div>
            </form>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              marginTop: '20px',
              borderTop: '1px solid #eee',
              paddingTop: '20px'
            }}>
              <button 
                onClick={handleCloseDialog}
                style={{
                  backgroundColor: '#f5f5f5',
                  color: '#333',
                  padding: '10px 20px',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit} 
                disabled={loading}
                style={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  padding: '10px 20px',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? 'Saving...' : (isEditing ? 'Update' : 'Save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;