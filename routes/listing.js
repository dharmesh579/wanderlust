const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {
  isLoggedIn,
  isOwner,
  validateListing,
} = require("../middlewares/middlewares.js");
const {
  index,
  renderNewForm,
  createListing,
  showListing,
  renderEdit,
  updateListing,
  deleteListing,
} = require("../controllers/listing.js");

const multer = require("multer");
const { storage } = require("../utils/cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(createListing),
  );

router.get("/new", isLoggedIn, renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(showListing))
  .put(isLoggedIn, isOwner, validateListing, wrapAsync(updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

router.get("/:id/edit", isLoggedIn, isOwner, renderEdit);

module.exports = router;
