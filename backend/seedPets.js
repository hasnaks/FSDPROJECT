const mongoose = require('mongoose');
const Pet = require('./model/pet');
require('dotenv').config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://user:user@cluster0.gwcd3ct.mongodb.net/petadoption?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// Sample pets data with phone numbers and working cat images
const pets = [
  { name: 'Buddy', type: 'Dog', breed: 'Labrador', age: 3, address: 'Kochi', image: 'https://placedog.net/400/300?id=1', phone: '9876543210' },
  { name: 'Rocky', type: 'Dog', breed: 'Beagle', age: 2, address: 'Thrissur', image: 'https://placedog.net/400/300?id=2', phone: '9876543211' },
  { name: 'Bruno', type: 'Dog', breed: 'Golden Retriever', age: 4, address: 'Ernakulam', image: 'https://placedog.net/400/300?id=3', phone: '9876543212' },
  { name: 'Max', type: 'Dog', breed: 'Pug', age: 1, address: 'Palakkad', image: 'https://placedog.net/400/300?id=4', phone: '9876543213' },
  { name: 'Charlie', type: 'Dog', breed: 'Bulldog', age: 5, address: 'Kollam', image: 'https://placedog.net/400/300?id=5', phone: '9876543214' },
  { name: 'Daisy', type: 'Dog', breed: 'Dalmatian', age: 3, address: 'Alappuzha', image: 'https://placedog.net/400/300?id=6', phone: '9876543215' },
  { name: 'Shadow', type: 'Dog', breed: 'Doberman', age: 4, address: 'Kannur', image: 'https://placedog.net/400/300?id=7', phone: '9876543216' },
  { name: 'Milo', type: 'Dog', breed: 'Husky', age: 2, address: 'Trivandrum', image: 'https://placedog.net/400/300?id=8', phone: '9876543217' },
  { name: 'Leo', type: 'Dog', breed: 'Chow Chow', age: 4, address: 'Kottarakara', image: 'https://placedog.net/400/300?id=9', phone: '9876543218' },
  { name: 'Toby', type: 'Dog', breed: 'Boxer', age: 2, address: 'Cherthala', image: 'https://placedog.net/400/300?id=10', phone: '9876543219' },
  { name: 'Bella', type: 'Cat', breed: 'Persian', age: 2, address: 'Kozhikode', image: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg', phone: '9876543220' },
  { name: 'Luna', type: 'Cat', breed: 'Siamese', age: 1, address: 'Malappuram', image: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg', phone: '9876543221' },
  { name: 'Simba', type: 'Cat', breed: 'Maine Coon', age: 3, address: 'Kottayam', image: 'https://cdn2.thecatapi.com/images/c2a.jpg', phone: '9876543222' },
  { name: 'Kitty', type: 'Cat', breed: 'British Shorthair', age: 4, address: 'Idukki', image: 'https://cdn2.thecatapi.com/images/bpc.jpg', phone: '9876543223' },
  { name: 'Whiskers', type: 'Cat', breed: 'Ragdoll', age: 5, address: 'Pathanamthitta', image: 'https://cdn2.thecatapi.com/images/9oo.jpg', phone: '9876543224' },
  { name: 'Oliver', type: 'Cat', breed: 'Abyssinian', age: 2, address: 'Wayanad', image: 'https://cdn2.thecatapi.com/images/6qi.jpg', phone: '9876543225' },
  { name: 'Nala', type: 'Cat', breed: 'Bengal', age: 3, address: 'Kasargod', image: 'https://cdn2.thecatapi.com/images/b1.jpg', phone: '9876543226' },
  { name: 'Coco', type: 'Cat', breed: 'Russian Blue', age: 1, address: 'Calicut', image: 'https://cdn2.thecatapi.com/images/a5d.jpg', phone: '9876543227' },
  { name: 'Peaches', type: 'Cat', breed: 'Himalayan', age: 4, address: 'Neyyattinkara', image: 'https://cdn2.thecatapi.com/images/ai6.jpg', phone: '9876543228' },
  { name: 'Snowball', type: 'Cat', breed: 'Scottish Fold', age: 2, address: 'Varkala', image: 'https://cdn2.thecatapi.com/images/db4.jpg', phone: '9876543229' },
];

// Remove previous data and insert new data
Pet.deleteMany({})
  .then(() => Pet.insertMany(pets))
  .then(() => {
    console.log('✅ Pets inserted successfully!');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ Insertion failed:', err);
    mongoose.disconnect();
  });
