const { MongoClient } = require('mongodb');

// Replace this with your actual encoded URI if not using env
const uri = process.env.MONGODB_URI || "mongodb+srv://yourUserName:yourPassword@cluster0.mongodb.net/yourDBName?retryWrites=true&w=majority";

async function connect() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  } finally {
    await client.close();
  }
}

connect();
