const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  ingredients: { type: [String], required: true },
  cuisine: { type: String, required: true },
  image: { type: String, required: true },
  instructions: { type: String, required: true }, // ✅ Yeh field required hai
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
