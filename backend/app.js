const express = require("express");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

//setting up static folder to set up images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// ✅ Add fileFilter function here
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const isExtValid = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const isMimeValid = fileTypes.test(file.mimetype);
  
  if (isExtValid && isMimeValid) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (png, jpg, jpeg, gif) are allowed!'));
  }
};


const upload = multer({ storage, fileFilter });

// Route to handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  // You can save req.file.filename or req.file.path in your database
  res.json({
    message: 'Image uploaded successfully!',
    imageUrl: `http://localhost:5000/uploads/${req.file.filename}`
  });
});

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});

