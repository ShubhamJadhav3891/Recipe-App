import React, { useState } from "react";

const RecipeCard = ({ recipe }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="card p-3 mb-3 shadow">
      <h3>{recipe.title}</h3>
      <p>{recipe.desc}</p>
      
      <button className="btn btn-primary" onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "Explore More"}
      </button>

      {showDetails && (
        <div className="mt-3">
          <h5>🍽 Ingredients:</h5>
          <p>{recipe.ingredients}</p>
          <h5>🔥 Instructions:</h5>
          <p>{recipe.instructions}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
