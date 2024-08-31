// const mongoose = require('mongoose');
// const initData = require('./data.js');
// const Listing = require('../models/listing.js');


// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
// .then(() => {
//     console.log("connected to db");
// })
// .catch((err)  => {
//     console.log(err);
// })

// async function main() {
//     await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//     await Listing.deleteMany({});
//     await Listing.insertMany(initData.data);
//     console.log("data was initialised");
// }

// initDB();

const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to MongoDB");
    initDB()
      .then(() => {
        console.log("Database initialized successfully");
        mongoose.connection.close();
      })
      .catch((err) => {
        console.error("Failed to initialize database:", err);
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

async function main() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Remove deprecated options
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
}

async function initDB() {
  try {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj , owner: '66ad2082974deee4f6058cb8' }))
    const inserted = await Listing.insertMany(initData.data);
    console.log(`Inserted ${inserted.length} listings into the database`);
  } catch (error) {
    throw new Error(`Failed to initialize database: ${error.message}`);
  }
}




