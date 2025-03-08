import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Explore.css";

// Import images directly
import firstImg from "../assets/images/first.png";
import secondImg from "../assets/images/fifth.png";
import thirdImg from "../assets/images/soup.jpg";
import fourthImg from "../assets/images/fourth.png";
import fifthImg from "../assets/images/grilled.jpg";
import sixthImg from "../assets/images/tenth.png";
import seventhImg from "../assets/images/eighth.png";
import eighthImg from "../assets/images/spicy.png"; 
import tenthImg from "../assets/images/pasta.jpg";

const foodItems = [
  { id: 1, image: eighthImg, title: "Spicy Chicken", desc: "A fiery delight with bold spices." },
  { id: 2, image: fifthImg, title: "Grilled Fish", desc: "Perfectly grilled with lemon zest." },
  { id: 3, image: firstImg, title: "Vegetable Stir Fry", desc: "A healthy mix of fresh veggies." },
  { id: 4, image: fourthImg, title: "Cheesy Pizza", desc: "Loaded with cheese and toppings." },
  { id: 5, image: secondImg, title: "Healthy Salad", desc: "Fresh greens with a light dressing." },
  { id: 6, image: seventhImg, title: "Juicy Burger", desc: "A classic burger with extra flavors." },
  { id: 7, image: sixthImg, title: "Sweet Dessert", desc: "A delightful treat for sweet lovers." },
  { id: 8, image: tenthImg, title: "Pasta Delight", desc: "Italian pasta with rich sauce." },
  { id: 9, image: thirdImg, title: "Hot Soup", desc: "A warm and comforting soup bowl." }
];

export const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([...foodItems]); // Static + API recipes
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/recipes");
        console.log("Fetched Explore Recipes:", res.data);

        setRecipes([
          ...foodItems, // Static recipes
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
        console.error("Error fetching explore recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const filteredItems = recipes.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExplore = (recipe) => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe } }); // ✅ Pass recipe data
  };

  return (
    <div className="container mt-4">
      {/* Search Bar */}
      <div className="mb-4 text-center">
        <input
          type="text"
          className="form-control search-bar"
          placeholder="Search for food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Display Filtered Items */}
      <div className="row">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="card h-100 shadow">
                <img src={item.image} className="card-img-top" alt={item.title} />
                <div className="card-body text-center">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.desc}</p>
                  <button className="btn btn-primary" onClick={() => handleExplore(item)}>
                    Explore More
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted">No results found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
