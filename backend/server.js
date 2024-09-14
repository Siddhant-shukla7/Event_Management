const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Event Management Backend");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api", eventRoutes);
app.use('/api/users', userRoutes);