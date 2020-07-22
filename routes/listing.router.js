const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listing.controller");
const requireLogin = require("../middlewares/requireLogin");

router.get("/listings", requireLogin, listingController.getListings);
router.get("/listing", requireLogin, listingController.getListing);
router.patch("/listing/edit/:id", requireLogin, listingController.editListing);
router.delete(
  "/listing/delete/:id",
  requireLogin,
  listingController.deleteListing
);
router.post("/listings", requireLogin, listingController.addListing);
module.exports = router;
