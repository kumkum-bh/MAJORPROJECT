const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));
  

  
// new route
router.get("/new", isLoggedIn, listingController.renderNewForm);
// console.log(req.user);
// if(!req.isAuthenticated()){
//     req.flash("error", "you must be logged in to create listing!");
//     return res.redirect("/login");
// }


router
   .route("/:id")
   .get(wrapAsync(listingController.showListing))
   .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
   .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));





// // index route
// router.get("/", wrapAsync(listingController.index));
  
  
// // new route
// router.get("/new", isLoggedIn, listingController.renderNewForm);
    // console.log(req.user);
    // if(!req.isAuthenticated()){
    //     req.flash("error", "you must be logged in to create listing!");
    //     return res.redirect("/login");
    // }
   
  
// // show route
// router.get("/:id", wrapAsync(listingController.showListing));
  
// // create route
// router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));
  
// edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));
  
// // update route
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));
    // let listing = await Listing.findById(id);
    // if(!currUser && listing.owner._id.euals(res.locals.currUser._id)){
    //     req.flash("error", "you don't have permission to edit");
    //     return res.redirect(`/listings/${id}`);
    // }
    

  
// // delete route
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;