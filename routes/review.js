const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middlewares/middlewares.js");
const {createReview,deleteReview} = require("../controllers/review.js")
// Reviews
// Post Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(createReview),
);

// Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(deleteReview),
);

module.exports = router;
