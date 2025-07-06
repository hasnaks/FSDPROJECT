const mongoose = require('mongoose');
const OtherPet = require('./model/otherpet');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://user:user@cluster0.gwcd3ct.mongodb.net/petadoption")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => {
    console.error("❌ Connection Error:", err);
    process.exit(1);
  });

const otherPets = [
  {
    name: 'Ruby',
    type: 'Parrot',
    breed: 'Macaw',
    age: 2,
    address: 'Palakkad',
    image: 'https://images.unsplash.com/photo-1585155777349-1c04ef8fc1da?auto=format&fit=crop&w=400&q=60',
    phone: '9876543300'
  },
  {
    name: 'Bunny',
    type: 'Rabbit',
    breed: 'Lop',
    age: 1,
    address: 'Alappuzha',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=60',
    phone: '9876543301'
  },
  {
    name: 'Whistle',
    type: 'Bird',
    breed: 'Canary',
    age: 2,
    address: 'Trivandrum',
    image: 'https://images.unsplash.com/photo-1562687789-f152d3a7bd30?auto=format&fit=crop&w=400&q=60',
    phone: '9876543302'
  },
  {
    name: 'Ginger',
    type: 'Rabbit',
    breed: 'Angora',
    age: 3,
    address: 'Kottayam',
    image: 'https://images.unsplash.com/photo-1602866465640-f021f866b081?auto=format&fit=crop&w=400&q=60',
    phone: '9876543303'
  },
  {
    name: 'Sunny',
    type: 'Bird',
    breed: 'Lovebird',
    age: 2,
    address: 'Ernakulam',
    image: 'https://images.unsplash.com/photo-1622119261448-63abde103f3d?auto=format&fit=crop&w=400&q=60',
    phone: '9876543304'
  },
  {
    name: 'Pebbles',
    type: 'Turtle',
    breed: 'Box Turtle',
    age: 5,
    address: 'Thrissur',
    image: 'https://images.unsplash.com/photo-1622119324343-308e0e3c9421?auto=format&fit=crop&w=400&q=60',
    phone: '9876543305'
  },
  {
    name: 'Marble',
    type: 'Guinea Pig',
    breed: 'Silkie',
    age: 2,
    address: 'Wayanad',
    image: 'https://images.unsplash.com/photo-1589187155472-2d72c75f9020?auto=format&fit=crop&w=400&q=60',
    phone: '9876543306'
  },
  {
    name: 'Flare',
    type: 'Fish',
    breed: 'Betta',
    age: 1,
    address: 'Kollam',
    image: 'https://images.unsplash.com/photo-1583081444068-763a6c634b39?auto=format&fit=crop&w=400&q=60',
    phone: '9876543307'
  },
  {
    name: 'Snowy',
    type: 'Rabbit',
    breed: 'Dwarf Hotot',
    age: 1,
    address: 'Malappuram',
    image: 'https://images.unsplash.com/photo-1548767797-dc1a1b4ed0c5?auto=format&fit=crop&w=400&q=60',
    phone: '9876543308'
  },
  {
    name: 'Chirpy',
    type: 'Bird',
    breed: 'Cockatiel',
    age: 3,
    address: 'Kasargod',
    image: 'https://images.unsplash.com/photo-1576179635662-9d03b97f4f16?auto=format&fit=crop&w=400&q=60',
    phone: '9876543309'
  },
  {
    name: 'Spike',
    type: 'Hedgehog',
    breed: 'African Pygmy',
    age: 2,
    address: 'Pathanamthitta',
    image: 'https://images.unsplash.com/photo-1602866465640-b0a9c4d16cb3?auto=format&fit=crop&w=400&q=60',
    phone: '9876543310'
  },
  {
    name: 'Bubble',
    type: 'Fish',
    breed: 'Koi',
    age: 2,
    address: 'Idukki',
    image: 'https://images.unsplash.com/photo-1592232414441-5ab29c6a91ce?auto=format&fit=crop&w=400&q=60',
    phone: '9876543311'
  }
];

// Insert only if not duplicate
async function seed() {
  for (let pet of otherPets) {
    const exists = await OtherPet.findOne({ name: pet.name, type: pet.type });
    if (!exists) {
      await OtherPet.create(pet);
      console.log(`✅ Inserted: ${pet.name} (${pet.type})`);
    } else {
      console.log(`⏩ Skipped duplicate: ${pet.name} (${pet.type})`);
    }
  }
  mongoose.disconnect();
}

seed().catch(err => {
  console.error('❌ Error inserting:', err);
  mongoose.disconnect();
});

 