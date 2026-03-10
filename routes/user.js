const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares/middlewares.js");
const {
  signUp,
  login,
  logout,
  renderLoginForm,
  renderSignUpForm,
} = require("../controllers/user.js");

router
  .route("/signup")
  .get(renderSignUpForm)
  .post(saveRedirectUrl, wrapAsync(signUp));

router
  .route("/login")
  .get(renderLoginForm)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    login,
  );

router.get("/logout", logout);

module.exports = router;
