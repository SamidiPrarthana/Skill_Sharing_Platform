import React, {useState} from "react";
import "../Components/RecipeStyle.css";
import axios from "axios";
import api from '../api/api';


    const RecipePostForm = () => {
        const [recipeName,setRecipeName] = useState("");
        const [recipeDescription, setRecipeDescription] = useState("");
        const [tips, setTips] = useState("");
        const [mediaFiles, setMediaFiles] = useState([]);

//validation
        const [recipeNameError, setrecipeNameError] = useState("");
        const [recipeDescriptionError, setrecipeDescriptionError] = useState("");
        const [tipsError, settipsError] = useState("");
        const [mediaFilesError, setmediaFilesError] = useState("");

        const clearForm = () => {
          setRecipeName("");
          setRecipeDescription("");
          setTips("");
          setMediaFiles("");
      };

      const formData = new FormData();


      const sendData = (e) =>{
        e.preventDefault();

        mediaFiles.forEach((file) => formData.append("mediaFiles", file));
     
      
      //validation ckecks
      if (!recipeName){
        setrecipeNameError("Recipe Name is Required");
        return;
      } else {
        setrecipeNameError("");
      }

      if (!recipeDescription.trim()){
        setrecipeDescriptionError("Recipe Description is Required");
        return;
      } else {
        setrecipeDescriptionError("");
      }
      if (!tips){
        settipsError("Recipe Tip is Required");
        return;
      } else {
        settipsError("");
      }

      if (!mediaFiles){
        setmediaFilesError("Recipe photo is Required");
        return;
      } else {
        setmediaFilesError("");
      }

     const newRecipe = {
          recipeName,
          recipeDescription,
          tips,
          mediaFiles,
      };

       axios 
          .post("http://localhost:8080/api/v1/recipe/save",newRecipe)
          .then(() => {
           alert("Recipe sharing");
           clearForm();
       })
         .catch((err) => {
          alert(err);
      });

  };
        return (
          <div className="recipe-form-container">
            <div className="form-header-r">
            <h1><b>Recipe Sharing Platform</b></h1>
            </div>
            
            <br/><br/>
          <div className="form-container-r"> 
          <form onSubmit={sendData} className="form" >
                <div className="form-row-r">
                        <div className="form-column1-r">
                            <label htmlFor="recipeName" className="form-label-r">
                               Recipe Name
                            </label>
                            <input
                                type="text"
                                className="form-input-r recipe name"
                                id="recipeName"
                                value={recipeName}
                                onChange={(e) => setRecipeName(e.target.value)}
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
                            value={recipeDescription}
                            onChange={(e) => setRecipeDescription(e.target.value)}
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
                                value={tips}
                                onChange={(e) => setTips(e.target.value)}
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
                           onChange={(e) => setMediaFiles(Array.from(e.target.files))}
                        />

                      <div className="error-message-r">{mediaFilesError}</div>
                    </div>
                    </div>
                 

                    <div className="form-column-r">
                        <button type="submit" className="form-button-r">
                            Submit
                        </button>
                    </div>
          </form>
          </div> 
          </div>

        );
      };
      
      export default RecipePostForm;
