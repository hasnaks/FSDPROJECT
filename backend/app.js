const express = require("express");
const cors = require("cors");
require("./db"); // this connects to MongoDB
const userRoutes = require("./routes/userRoutes");
const petRoutes = require("./routes/petRoutes");
const otherPetRoutes = require('./routes/otherPetRoutes');
const shelterRoutes = require('./routes/shelterRoutes'); 
const adminPetRoutes = require('./routes/adminPetRoutes');
const adoptionRoutes = require("./routes/adoptionRoutes");
const adminOtherPetRoutes = require('./routes/adminOtherPetRoutes');
const adminShelterRoutes = require('./routes/adminShelterRoutes');
const replyMessageRoutes = require('./routes/replyMessageRoutes');
const app = express();
const port = 3005;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/otherpets", otherPetRoutes);
app.use("/api/shelters", shelterRoutes); 
app.use('/api/admin/pets', adminPetRoutes);
app.use("/api/adoption", adoptionRoutes);
app.use('/api/admin/otherpets', adminOtherPetRoutes);
app.use('/api/admin/shelters', adminShelterRoutes);
app.use('/api/replies', replyMessageRoutes);
app.get("/", (req, res) => {
  res.send("Pet Adoption API is running...");
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
