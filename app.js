const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const port = 6500;


const ExpressError = require("./utils/ExpressError.js");

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

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Routes
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

app.get("/", (req, res) => {
  res.send("Hi,I am Root");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

// 404 handler
app.use((req, res, next) => {
  const pageNotFound = new ExpressError(404, "Page Not Found!");
  next(pageNotFound);
});

// Global error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("listings/error.ejs", { err });
});

app.listen(port, () => {
  console.log(`Server Started at Port : ${port}`);
});
