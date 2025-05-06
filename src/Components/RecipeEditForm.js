import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import "../Components/RecipeStyle.css";
import axios from "axios";
import api from '../api/api';


function RecipeEditForm ()  {
 
     const {id} = useParams();
     const [formData, setFormData] = useState({
          recipeName: "",
          recipeDescription: "",
          tips: "",
          mediaFiles: "",

          });
        
        const [recipeNameError, setrecipeNameError] = useState("");
        const [recipeDescriptionError, setrecipeDescriptionError] = useState("");
        const [tipsError, settipsError] = useState("");
        const [mediaFilesError, setmediaFilesError] = useState("");



useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/recipe/get/${id}`)
            .then((response) => {
              console.log("id:", id);
              // Debugging the response
                setFormData({
                    recipeName: response.data.recipeName || "",
                    recipeDescription: response.data.recipeDescription || "",
                    tips: response.data.tips || "",
                    mediaFiles: response.data.mediaFiles || "",

                });
            })
            .catch((error) => {
                console.error("Error fetching item details:", error);
            }); 
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
    
      // Validation
      if (!formData.recipeName) {
        setrecipeNameError("Recipe Name is Required");
        return;
      } else {
        setrecipeNameError("");
      }
    
      if (!formData.recipeDescription.trim()) {
        setrecipeDescriptionError("Recipe Description is Required");
        return;
      } else {
        setrecipeDescriptionError("");
      }
    
      if (!formData.tips) {
        settipsError("Recipe Tip is Required");
        return;
      } else {
        settipsError("");
      }
    
      if (!formData.mediaFiles || formData.mediaFiles.length === 0) {
        setmediaFilesError("Recipe photo is Required");
        return;
      } else {
        setmediaFilesError("");
      }
    
      // FormData to send files
      const updatedForm = new FormData();
      updatedForm.append("recipeName", formData.recipeName);
      updatedForm.append("recipeDescription", formData.recipeDescription);
      updatedForm.append("tips", formData.tips);
    
      for (let i = 0; i < formData.mediaFiles.length; i++) {
        updatedForm.append("mediaFiles", formData.mediaFiles[i]);
      }
    
      axios
        .put(`http://localhost:8080/api/v1/recipe/update/${id}`, updatedForm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert("Recipe updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating recipe:", error);
          alert("Update failed");
        });
    };
    

        return (
          <div className="recipe-form-container">
            <div className="form-header-r">
            <h1><b>Update Recipes</b></h1>
            </div>
            
            <br/><br/>
          <div className="form-container-r"> 
          <form onSubmit={handleSubmit} className="form" >
                <div className="form-row-r">

                        <div className="form-column1-r">
                            <label htmlFor="recipeName" className="form-label-r">
                               Recipe Name
                            </label>
                            <input
                                type="text"
                                className="form-input-r recipe name"
                                id="recipeName"
                                value={formData.recipeName}
                                onChange={handleChange}
                            />
                            <div className="error-message-r">{recipeNameError}</div>
                        </div>
                        
                    </div>
                    <div className="form-row-r">
                    <div className="form-column-r">
                        <label htmlFor="recipeDescription" className="form-label-r">
                            Recipe Description
                        </label>
                        <textarea  style={{width:"100%",height:"65%"}}
                            className="form-input-r description"
                            id="recipeDescription"
                            value={formData.recipeDescription}
                            onChange={handleChange}
                        />
                        <div className="error-message-r">{recipeDescriptionError}</div>
                    </div>
                    </div>
                    <div className="form-row-r">
                    <div className="form-column-r">
                        <label htmlFor="tips" className="form-label-r">
                            Recipe Tips
                        </label>

                            <input
                                type="text"
                                className="form-input-r tips"
                                id="tips"
                                value={formData.tips}
                                onChange={handleChange}
                            />
                         <div className="error-message-r">{tipsError}</div>
                    </div>
                    </div>
                    
                    <div className="form-row-r">
                    <div className="form-column-r">
                        <label htmlFor="mediaFiles" className="form-label-r">
                           Photo Upload
                        </label>

                        <input style={{width:"100%",height:"52%"}}
                           type="file"
                           className="form-input-r file"
                           id="mediaFiles"
                           multiple accept="image/*,video/*"
                           onChange={handleChange}
                        />

                      <div className="error-message-r">{mediaFilesError}</div>
                    </div>
                    </div>
                 

                    <div className="form-column-r">
                        <button type="submit" className="form-button-r">
                            Update
                        </button>
                    </div>
          </form>
          </div> 
          </div>

        );
      };
      
      export default RecipeEditForm;
