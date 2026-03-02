const mongoose = require("mongoose");

const initData = require("./data");

const Listing = require("../models/listing.js");

const DB_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(DB_URL);
}

main()
  .then(() => {
    console.log("Connected To DataBase");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  await Listing.deleteMany();
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
