import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Components/RecipeStyle.css";
import { FaEdit, FaTrash, FaHeart } from "react-icons/fa";

function Allpost() {
  const [dataList, setDataList] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [commentData, setCommentData] = useState({});
  const navigate = useNavigate();

  // Fetch all recipes
  const getFetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/recipe/getAll");
      if (response.data.success) {
        setDataList(response.data.recipe);
      } else {
        alert("Failed to fetch recipes");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Fetch comments for a specific recipe
  const fetchComments = async (Id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/comment/recipe/${Id}`);
      if (response.data.success) {
        setCommentData((prev) => ({
          ...prev,
          [Id]: response.data.comments,
        }));
      }
    } catch (error) {
      console.error(`Error fetching comments for recipe ${Id}:`, error);
    }
  };

  // Add a comment to a recipe
  const handleAddComment = async (recipeId) => {
    const newComment = {
      recipeId: recipeId,
      userName: "Guest User", // Replace with logged-in user name if available
      text: commentInputs[recipeId] || "",
    };

    try {
      const response = await axios.post("http://localhost:8080/api/v1/comment/add", newComment);
      if (response.data.success) {
        setCommentInputs((prev) => ({ ...prev, [recipeId]: "" }));
        fetchComments(recipeId);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Like a comment
  const handleLike = async (commentId) => {
    try {
      await axios.post(`http://localhost:8080/api/v1/comment/like/${commentId}`);
      // Optionally re-fetch updated comment likes
      dataList.forEach((recipe) => fetchComments(recipe.id));
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  // Delete a recipe
  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/recipe/delete/${id}`);
      alert("Recipe deleted successfully");
      getFetchData();
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    getFetchData();
  }, []);

<<<<<<< Updated upstream
  <button className="back-button" 
              onClick={() => navigate(`/home`)}>
          <span className="back-arrow"></span>
          Back
        </button>
          <div className="gallery-r">
            {dataList.map((recipe) => (
=======
  // Fetch comments for each recipe
  useEffect(() => {
    dataList.forEach((recipe) => {
      if (recipe?.id) fetchComments(recipe.id);
    });
  }, [dataList]);
>>>>>>> Stashed changes

  return (
    <div className="recipe-form-container">
      <div className="form-header-r">
        <h1><b>All Shared Posts</b></h1>
      </div>

      <button className="back-button" onClick={() => navigate("/")}>
        <span className="back-arrow"></span> Back
      </button>

      <div className="gallery-r">
        {dataList.map((recipe) => (
          <div key={recipe.id} className="content-r">
            <div className="button-container-icons">
              <button className="icon-button edit" title="Edit" onClick={() => navigate(`/update/${recipe.id}`)}>
                <FaEdit />
              </button>
              <button className="icon-button delete" title="Delete" onClick={() => deleteRecipe(recipe.id)}>
                <FaTrash />
              </button>
            </div>

            <img src={recipe.file} alt="Recipe" className="recipe-img" />
            <div className="recipe-text">
              <h3>{recipe.recipeName}</h3>
              <p><strong>Description:</strong> {recipe.recipeDescription}</p>
              <p><strong>Tips:</strong> {recipe.tips}</p>
            </div>

            {/* Comment Section */}
            <div className="comment-section">
              <h4>Comments:</h4>
              <div className="comment-list">
                {commentData[recipe.id] && commentData[recipe.id].length > 0 ? (
                  commentData[recipe.id].map((comment) => (
                    <div key={comment.id} className="comment-item">
                      <div className="comment-bubble">
                        <p><strong>{comment.userName}</strong></p>
                        <p>{comment.text}</p>
                      </div>
                      <button
                        className="like-button"
                        onClick={() => handleLike(comment.id)}
                        title="Like Comment"
                      >
                        <FaHeart /> <span>{comment.likes?.length || 0}</span>
                      </button>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#777", fontSize: "14px" }}>No comments yet.</p>
                )}
              </div>

              {/* Add Comment */}
              <div className="add-comment">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInputs[recipe.id] || ""}
                  onChange={(e) =>
                    setCommentInputs({ ...commentInputs, [recipe.id]: e.target.value })
                  }
                />
                <button onClick={() => handleAddComment(recipe.id)}>Post</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Allpost;
