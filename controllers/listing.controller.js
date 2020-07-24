const listingService = require("../services/listing.service");

module.exports = {
  getListings,
  getListing,
  editListing,
  deleteListing,
  addListing,
};

async function getListings(req, res, next) {
  try {
    const listings = await listingService.getListings(req.user.id);
    res.send(listings);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function getListing(req, res, next) {
  try {
    const listing = await listingService.getListing(req.user.id, req.query.id);
    res.send(listing);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function editListing(req, res, next) {
  try {
    const editedListing = await listingService.editListing(
      req.user.id,
      req.body,
      req.params.id
    );
    res.send(editedListing);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function deleteListing(req, res, next) {
  try {
    await listingService.deleteListing(req.user.id, req.params.id);
    res.send({});
  } catch (err) {
    console.log("DELTE ERR", err);
    next(err);
  }
}

async function addListing(req, res, next) {
  try {
    const listing = await listingService.addListing(req.user.id, req.body);
    res.send(listing);
  } catch (err) {
    console.log(err);
    //res.status(422).send(err);
    next(err);
  }
}
