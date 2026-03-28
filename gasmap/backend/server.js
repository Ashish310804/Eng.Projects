const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Dummy Data (you can replace with MongoDB later)
let data = {
  pressure: 50,
  usage: []
};

// GET API (fetch data)
app.get("/api/data", (req, res) => {
  res.json(data);
});

// POST API (update pressure)
app.post("/api/update", (req, res) => {
  const { pressure } = req.body;

  data.pressure = pressure;
  data.usage.push({
    value: pressure,
    time: new Date()
  });

  res.json({ message: "Data updated successfully" });
});

// Start server
app.listen(5000, () => {
  console.log("🚀 GasMap Server running on http://localhost:5000");
});