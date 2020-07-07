const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Listing = mongoose.model("listings");

module.exports = (app) => {
  app.get("/api/listings", requireLogin, async (req, res) => {
    const listings = await Listing.find({ _user: req.user.id });
    console.log(listings);
    res.send(listings);
  });

  app.post("/api/listings", requireLogin, async (req, res) => {
    let { title, role, ...champions } = req.body;

    const listing = new Listing({
      title: title,
      role: role,
      champions: champions,
      _user: req.user.id,
      dateCreated: Date.now(),
    });

    try {
      await listing.save(); // Probably increment counter so we have max number of listings
      //req.user.credits -= 1;
      //const user = await req.user.save();
      res.send(req.user);
    } catch (err) {
      // 422: Unprocessable entity
      res.status(422).send(err);
    }
  });
};
