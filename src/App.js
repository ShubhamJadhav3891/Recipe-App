import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles.css";
import { Explore } from "./components/Explore";
import { Feed } from "./components/Feed";
import { AddRecipe } from "./components/AddRecipe";
import RecipeDetails from "./components/RecipeDetails";  // ✅ Import RecipeDetails
import Login from "./components/Login";
import Register from "./components/Register";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";

function App() {
    const [recipes, setRecipes] = useState([
        { 
            id: 1, 
            image: "https://via.placeholder.com/150", 
            title: "Sample Recipe", 
            desc: "Description here", 
            ingredients: "Sample ingredients", 
            instructions: "Sample instructions"
        }
    ]);

    const addNewRecipe = (recipe) => {
        setRecipes([...recipes, recipe]);
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        setIsLoggedIn(!!token);
        if (username) setUser(username);
    }, []);

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} />
            <div className="content">
                <Routes>
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/signin" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/account" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/chatbot" element={<Chatbot />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/add-recipe" element={<AddRecipe addNewRecipe={addNewRecipe} />} />
                    <Route path="/recipe/:id" element={<RecipeDetails />} />  {/* ✅ Recipe Details Route */}
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;