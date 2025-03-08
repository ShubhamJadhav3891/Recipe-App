import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/addRecipe.css";

export const AddRecipe = ({ addNewRecipe }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Image Upload Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ✅ Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❌ Check for empty fields
    if (!title || !desc || !ingredients || !cuisine || !instructions || !image) {
      alert("❌ Please fill all fields.");
      return;
    }

    // ✅ Token Handling
    const token = localStorage.getItem("token");
    console.log("🔑 Token:", token);

    if (!token) {
      alert("❌ Please login first!");
      return;
    }

    setLoading(true); // Start Loading

    // ✅ FormData Setup
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("ingredients", JSON.stringify(ingredients.split(","))); // ✅ Ensure array format
    formData.append("cuisine", cuisine);
    formData.append("instructions", instructions);
    formData.append("image", image);

    try {
      console.log("📤 Sending Recipe Data:", {
        title,
        desc,
        ingredients,
        cuisine,
        instructions,
        image,
      });

      const res = await axios.post(
        "http://localhost:5000/api/recipes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Recipe Added:", res.data);
      addNewRecipe(res.data);
      alert("🎉 Recipe added successfully!");

      // ✅ Reset Form Fields
      setTitle("");
      setDesc("");
      setIngredients("");
      setCuisine("");
      setInstructions("");
      setImage(null);
      setImagePreview(null);

      navigate("/feed"); // ✅ Navigate after success
    } catch (error) {
      console.error("❌ Error Adding Recipe:", error.response?.data || error.message);
      alert("❌ Error: " + (error.response?.data?.message || "Something went wrong"));
    } finally {
      setLoading(false); // Stop Loading
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-light">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Ingredients (comma-separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Cuisine Type"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Cooking Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        {imagePreview && <img src={imagePreview} alt="Recipe Preview" className="img-thumbnail d-block mx-auto mb-3" />}
        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? "Adding Recipe..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
};
