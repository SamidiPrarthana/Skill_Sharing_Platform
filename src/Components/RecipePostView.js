import React, { useEffect, useState } from "react";
import{ useNavigate} from "react-router-dom";
import axios from "axios";
import api from "../api/api";
import "../Components/RecipeStyle.css";
import { FaEdit, FaTrash } from "react-icons/fa";


function Allpost(){


    const [dataList, setDataList] = useState([]);
    const navigate=useNavigate();


    const getFetchData = async () => {
        try{
            const response = await axios.get("http://localhost:8080/api/v1/recipe/getAll");
            console.log(response.data);
            if (response.data.success) {
                setDataList(response.data.recipe);
                alert("Recipe  fetched successfully");
            } else {
                alert("Failed to fetch recipe");
            }
        }catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch recipe");
        }
    };

    useEffect(() => {
        getFetchData();

    }, []);


const deleteRecipe = async (id) => {
  
    try {
      await axios.delete(`http://localhost:8080/api/v1/recipe/delete/${id}`);
      alert("Recipe deleted successfully");
      getFetchData(); // Refresh the post list
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe");
    }
  
};

 
    return (
        <div className="recipe-form-container">
          <div className="form-header-r">
            <h1><b>All Shared Post</b></h1>
          </div>

  <button className="back-button" 
              onClick={() => navigate(`/`)}>
          <span className="back-arrow"></span>
          Back
        </button>
          <div className="gallery-r">
            {dataList.map((recipe) => (

              <div key={recipe.id} className="content-r">

                <div className="button-container-icons">
                  <button
                    className="icon-button edit"
                    title="Edit"
                    onClick={() => navigate(`/update/${recipe.id}`)}
                  >
                   <FaEdit/>
                    </button>
               
                  <button
                    className="icon-button delete"
                    title="Delete"
                    onClick={() => deleteRecipe(recipe.id)}
                  >
                    <FaTrash/>
                    </button>
                </div>
                <img src={recipe.file} alt="recipe" className="recipe-img" />
                <div className="recipe-text">
                  <h3>{recipe.recipeName}</h3>
                  <p><strong>Description:</strong> {recipe.recipeDescription}</p>
                  <p><strong>Tips:</strong> {recipe.tips}</p>
                </div>
               
              </div>
            ))}
          </div>
        </div>
      );
  
      
};
export default Allpost;