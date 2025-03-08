const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const fs = require("fs");

dotenv.config();
connectDB();

const app = express();

// Ensure "uploads" folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors());
app.use(express.json());

// Serve static files from uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/recipes", require("./routes/recipeRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
