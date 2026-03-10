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

router
  .route("/")
  .get(wrapAsync(index))
  .post(isLoggedIn, validateListing, wrapAsync(createListing));

router.get("/new", isLoggedIn, renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(showListing))
  .put(isLoggedIn, isOwner, validateListing, wrapAsync(updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

router.get("/:id/edit", isLoggedIn, isOwner, renderEdit);

module.exports = router;
