import React, {useState} from "react";
import{ useNavigate} from "react-router-dom";
import "../Components/RecipeStyle.css";
import axios from "axios";
import api from '../api/api';


function RecipePostForm() {
     
        const [recipeName,setRecipeName] = useState("");
        const [recipeDescription, setRecipeDescription] = useState("");
        const [tips, setTips] = useState("");
        const [file, setFile] = useState("");

 
        const navigate=useNavigate();

//validation
       
        const [recipeNameError, setrecipeNameError] = useState("");
        const [recipeDescriptionError, setrecipeDescriptionError] = useState("");
        const [tipsError, settipsError] = useState("");
        const [fileError,setfileError] = useState("");
 

        const clearForm = () => {
          
          setRecipeName("");
          setRecipeDescription("");
          setTips("");
          setFile("");

      };

 
      const sendData = (e) =>{
        e.preventDefault();

      
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
      if (!file) {
        setfileError("Recipe Photo is Required");
        return;
      } else {
        setfileError("");
      }


      
     const newRecipe = {
          
          recipeName,
          recipeDescription,
          tips,
          file,
         
          
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
            <button className="back-button" 
              onClick={() => navigate(`/`)}>
          <span className="back-arrow"></span>
          Back
        </button>

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
                   <label htmlFor="tips" className="form-label-r">
                         Recipe Photo
                        </label>
                            <input
                              type="file"
                              className="file-input file"
                              accept="image/*"
                              onChange={(e) => setFile(e.target.files[0])}
                            />
                            <div className="error-message-r">{fileError}</div>
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
