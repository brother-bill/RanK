const mongoose = require("mongoose");
const Listing = mongoose.model("listings");
const Rank = mongoose.model("rankings");

module.exports = {
  getListings,
  getListing,
  editListing,
  deleteListing,
  addListing,
};

async function getListings(userID) {
  return await Listing.find({ _user: userID });
}

async function getListing(userID, queryID) {
  // Check that the user requesting the url is also the user who made the list
  return await Listing.findOne({
    _user: userID,
    shortid: queryID,
  });
}

async function deleteListing(userID, listingID) {
  return await Listing.deleteOne({ shortid: listingID, _user: userID });
}

async function editListing(userID, body, listingID) {
  const { title, role, champions } = body;

  // Creating a projection and setting each value to 1 so we only get those values from query
  const entries = champions.map((p) => [`rank.${p}`, 1]);
  const projection = Object.fromEntries(entries);
  let found = await Rank.find({}, projection);
  let championsDB = found[0].rank;
  let final = {};

  // If a champion in the listing does not have a value in the DB, then we add default 0 values
  champions.forEach((champion) => {
    if (championsDB[champion]) {
      final[champion] = championsDB[champion];
    } else {
      final[champion] = {
        Mid: 0,
        Support: 0,
        Jungle: 0,
        Top: 0,
        Bot: 0,
      };
    }
  });

  // Update the listing with given ID to new values
  // We make sure that the user requesting the edit is the one who created the listing
  await Listing.updateOne(
    { shortid: listingID, _user: userID },
    { $set: { title: title, role: role, champions: final } }
  );

  return await Listing.findOne({ shortid: listingID, _user: userID });
}

async function addListing(userID, body) {
  const { title, role, champions } = body;

  // Creating a projection and setting each value to 1 so we only get those values from query
  const entries = champions.map((p) => [`rank.${p}`, 1]);
  const projection = Object.fromEntries(entries);

  let found = await Rank.find({}, projection);
  let championsDB = found[0].rank;
  let final = {};

  // If a champion in the listing does not have a value in the DB, then we add default 0 values
  champions.forEach((champion) => {
    if (championsDB[champion]) {
      final[champion] = championsDB[champion];
    } else {
      final[champion] = {
        Mid: 0,
        Support: 0,
        Jungle: 0,
        Top: 0,
        Bot: 0,
      };
    }
  });

  const listing = new Listing({
    title: title,
    role: role,
    champions: final,
    _user: userID,
    dateCreated: Date.now(),
  });

  await listing.save();

  return listing;
}
