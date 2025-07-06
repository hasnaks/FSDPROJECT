const express = require("express");
const cors = require("cors");
require("./db"); // this connects to MongoDB
const userRoutes = require("./routes/userRoutes");
const petRoutes = require("./routes/petRoutes");
const otherPetRoutes = require('./routes/otherPetRoutes');
const shelterRoutes = require('./routes/shelterRoutes'); // ✅ New

const app = express();
const port = 3005;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/otherpets", otherPetRoutes);
app.use("/api/shelters", shelterRoutes); // ✅ New

app.get("/", (req, res) => {
  res.send("Pet Adoption API is running...");
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
