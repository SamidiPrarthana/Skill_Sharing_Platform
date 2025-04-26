import React, { useEffect, useState } from "react";
import{ useNavigate} from "react-router-dom";
import axios from "axios";
import api from "../api/api";

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

    return(
    
        <div className="recipe-form-container">
            <div className="form-header-r">
            <h1><b>All Shared Post</b></h1>
            </div>
        <br />
        <div className="gallery-r">
        {dataList.map((recipe) =>(
                <div key={recipe._id} className="content-r">
                    <h3>{recipe.recipeName}</h3>
                    <img src={recipe.mediaFiles} alt="recipe image" />
                    <p>{recipe.recipeDescription}</p>
                    <p>{recipe.tips}</p>
                    <button type="button" onClick={() => navigate(`/update/${recipe._id}`)} className="btn1"> Update</button>
                </div>
            ))}
        </div>
    </div>
    )
  
};
export default Allpost;