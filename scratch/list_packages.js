import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const DB_URL = "mongodb://127.0.0.1:27017/clearpath";

async function run() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to MongoDB");
    
    // Get all experiences
    const db = mongoose.connection.db;
    const experiences = await db.collection("experiences").find({}).toArray();
    
    // Read seedData
    const seedPath = path.resolve("Backend/src/db/seedData.json");
    let seedIds = new Set();
    if (fs.existsSync(seedPath)) {
      const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
      if (seedData.experiences) {
        seedData.experiences.forEach(e => {
          if (e._id) seedIds.add(e._id.toString());
        });
      }
    }
    
    console.log("TOTAL_PACKAGES_COUNT:" + experiences.length);
    experiences.forEach(e => {
      const isSeed = seedIds.has(e._id.toString());
      console.log(`- ID: ${e._id}, Name: ${e.name}, Source: ${isSeed ? 'Seed (Old)' : 'User (New)'}`);
    });
    
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
