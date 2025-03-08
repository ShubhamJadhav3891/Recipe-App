import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const foodItems = [
  { id: 1, image: require("../assets/images/spicy.png"), title: "Spicy Chicken", desc: "A fiery delight with bold spices.", ingredients: "Chicken, Spices, Oil", instructions: "Marinate, Cook, Serve" },
  { id: 2, image: require("../assets/images/grilled.jpg"), title: "Grilled Fish", desc: "Perfectly grilled with lemon zest.", ingredients: "Fish, Lemon, Herbs", instructions: "Grill, Season, Serve" },
  { id: 3, image: require("../assets/images/first.png"), title: "Vegetable Stir Fry", desc: "A healthy mix of fresh veggies.", ingredients: "Veggies, Soy Sauce", instructions: "Stir-fry, Serve hot" },
  { id: 4, image: require("../assets/images/fourth.png"), title: "Cheesy Pizza", desc: "Loaded with cheese and toppings.", ingredients: "Dough, Cheese, Tomato Sauce", instructions: "Bake at 400°F for 20 min" }
];

export const Feed = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([...foodItems]); // ✅ Static + Dynamic recipes
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/recipes");
        console.log("Fetched Recipes:", res.data);

        setRecipes([
          ...foodItems,
          ...res.data.map(recipe => ({
            id: recipe._id,  
            image: `http://localhost:5000${recipe.image}`,
            title: recipe.title,
            desc: recipe.desc,
            ingredients: recipe.ingredients || "Not Available",
            instructions: recipe.instructions || "Not Available"
          }))
        ]);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleExplore = (recipe) => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe } }); // ✅ Pass Recipe Data
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center">Recipe Feed</h2>

      <div className="input-group my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-secondary">Search</button>
      </div>

      <div className="row">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100 shadow">
              <img src={recipe.image} className="card-img-top" alt={recipe.title} />
              <div className="card-body text-center">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.desc}</p>
                <button className="btn btn-primary" onClick={() => handleExplore(recipe)}>
                  Explore More
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Recipe Button */}
        <div className="col-md-4 col-sm-6 mb-4">
          <div className="card h-100 d-flex align-items-center justify-content-center text-center bg-light border" 
               style={{ cursor: "pointer" }} 
               onClick={() => navigate("/add-recipe")}>
            <h3 className="text-success">+</h3>
            <p>Add New Recipe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
