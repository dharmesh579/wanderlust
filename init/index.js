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
  initData.data = initData.data.map((obj) => ({ ...obj, owner: "69af24acd3b6d3b454a330ae" }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
