import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RecipeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe;

  if (!recipe) {
    return <div className="container mt-4"><h3>Recipe Not Found</h3></div>;
  }

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>⬅ Go Back</button>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} className="img-fluid mb-3" alt={recipe.title} />
      <p><strong>Description:</strong> {recipe.desc}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetails;
