import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Components/RecipeStyle.css";
import axios from "axios";

function RecipePostForm() {
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [tips, setTips] = useState("");
  const [file, setFile] = useState("");

  const navigate = useNavigate();

  // Validation
  const [recipeNameError, setrecipeNameError] = useState("");
  const [recipeDescriptionError, setrecipeDescriptionError] = useState("");
  const [tipsError, settipsError] = useState("");
  const [fileError, setfileError] = useState("");

  const clearForm = () => {
    setRecipeName("");
    setRecipeDescription("");
    setTips("");
    setFile("");
  };

  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "First_time_using_cloudinary"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dqltteryc/image/upload", // Replace with your Cloudinary URL
        formData
      );
      return response.data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw new Error("Image upload failed");
    }
  };

  const sendData = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!recipeName) {
      setrecipeNameError("Recipe Name is Required");
      return;
    } else {
      setrecipeNameError("");
    }

    if (!recipeDescription.trim()) {
      setrecipeDescriptionError("Recipe Description is Required");
      return;
    } else {
      setrecipeDescriptionError("");
    }

    if (!tips) {
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

    try {
      // Upload image to Cloudinary
      const file = await uploadImageToCloudinary();

      // Prepare the data to send to the backend
      const newRecipe = {
        recipeName,
        recipeDescription,
        tips,
        file, // Use the Cloudinary image URL
      };

      // Send data to the backend
      await axios.post("http://localhost:8080/api/v1/recipe/save", newRecipe);
      alert("Recipe shared successfully!");
      clearForm();
    } catch (error) {
      alert("Error sharing recipe: " + error.message);
    }
  };

  return (
    <div className="recipe-form-container">
      <div className="form-header-r">
        <h1>
          <b>Recipe Sharing Platform</b>
        </h1>
      </div>
      <button className="back-button" onClick={() => navigate(`/home`)}>
        <span className="back-arrow"></span>
        Back
      </button>

      <br />
      <br />
      <div className="form-container-r">
        <form onSubmit={sendData} className="form">
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
              <textarea
                style={{ width: "100%", height: "65%" }}
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
}

export default RecipePostForm;