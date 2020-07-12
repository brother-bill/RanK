const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Listing = mongoose.model("listings");
const Rank = mongoose.model("rankings");

module.exports = (app) => {
  app.patch("/api/listing/edit/:id", requireLogin, async (req, res) => {
    const { title, role, champions } = req.body;

    const entries = req.body.champions.map((p) => [`rank.${p}`, 1]);
    const projection = Object.fromEntries(entries);
    let found = null;
    let championsDB = {};
    let final = {};

    found = await Rank.find({}, projection);
    championsDB = found[0].rank;
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

    await Listing.updateOne(
      { shortid: req.params.id },
      { $set: { title: title, role: role, champions: final } }
    );

    let listing = await Listing.find({ shortid: req.params.id });
    console.log("LISTING", listing);
    res.send(listing[0]);
  });

  app.delete("/api/listing/delete/:id", requireLogin, async (req, res) => {
    await Listing.deleteOne({ shortid: req.params.id });
    res.send({});
  });
  app.get("/api/listing", requireLogin, async (req, res) => {
    // Check that the user requesting the url is also the user who made the list
    const listing = await Listing.find({
      _user: req.user.id,
      shortid: req.query.id,
    });

    // let objListing = {};

    // objListing[listing[0]["shortid"]] = listing[0];
    res.send(listing[0]);
  });
  app.get("/api/listings", requireLogin, async (req, res) => {
    const listings = await Listing.find({ _user: req.user.id });
    // const objListings = {};
    // listings.forEach((listing) => {
    //   objListings[listing["shortid"]] = listing;
    // });
    res.send(listings);
  });

  app.post("/api/listings", requireLogin, async (req, res) => {
    const { title, role, champions } = req.body;
    const entries = champions.map((p) => [`rank.${p}`, 1]);
    const projection = Object.fromEntries(entries);

    let found = null;
    let championsDB = {};
    let final = {};
    try {
      found = await Rank.find({}, projection);
      championsDB = found[0].rank;
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
    } catch (err) {
      // 422: Unprocessable entity
      res.status(422).send(err);
    }

    const listing = new Listing({
      title: title,
      role: role,
      champions: final,
      _user: req.user.id,
      dateCreated: Date.now(),
    });

    try {
      await listing.save(); // Probably increment counter so we have max number of listings
      //req.user.credits -= 1;
      //const user = await req.user.save();
      res.send(listing);
    } catch (err) {
      // 422: Unprocessable entity
      res.status(422).send(err);
    }
  });
};
