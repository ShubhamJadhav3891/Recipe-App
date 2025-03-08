const express = require("express");
const multer = require("multer");
const Recipe = require("../models/Recipe");
const auth = require("../middleware/auth");
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Add a new recipe
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    console.log("✅ Request Body:", req.body);
    console.log("✅ Uploaded Image:", req.file);

    const { title, desc, ingredients, cuisine, instructions } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    if (!title || !desc || !ingredients || !cuisine || !instructions) {
      console.log("❌ Missing Fields", { title, desc, ingredients, cuisine, instructions });
      return res.status(400).json({ error: "All fields are required" });
    }

    const newRecipe = new Recipe({
      title,
      desc,
      ingredients: ingredients.split(","),  
      cuisine,
      image,
      instructions,
      user: req.user.id,
    });

    await newRecipe.save();
    console.log("✅ Recipe saved successfully:", newRecipe);
    res.status(201).json(newRecipe);
  } catch (err) {
    console.error("❌ Recipe Add Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    console.log("✅ Fetching Recipes:", recipes);
    res.status(200).json(recipes);
  } catch (err) {
    console.error("❌ Fetch Recipes Error:", err);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

module.exports = router;
