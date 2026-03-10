const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

const index = async (req, res) => {
  const allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
};

const renderNewForm = (req, res) => {
  return res.render("listings/new.ejs");
};

const createListing = async (req, res, next) => {
  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

const showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing Not Found");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

const renderEdit = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing Not Found");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

const updateListing = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Send Valid Data For Listing");
  }
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

const deleteListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findByIdAndDelete(id);
  if (!listing) {
    req.flash("error", "Listing Not Found");
    return res.redirect("/listings");
  }
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};

module.exports = {
  index,
  renderNewForm,
  createListing,
  showListing,
  renderEdit,
  updateListing,
  deleteListing,
};
