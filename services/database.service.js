let schedule = require("node-schedule");
const mongoose = require("mongoose");
const fs = require("fs");
const rp = require("request-promise");
const tar = require("tar");
const champions = require("lol-champions");

require("../models/Listing");
require("../models/Rank");
const keys = require("../config/keys");
mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const Rank = mongoose.model("rankings");
const Listing = mongoose.model("listings");

// Every 24 hours, this function will retreive the updated information and update the DB and all listings
const updateDB = async () => {
  try {
    const url = "https://statics.koreanbuilds.net/bulk/latest.tar.gz";
    const arcName = "latest.tar.gz";
    const response = await rp.get({ uri: url, encoding: null });
    fs.writeFileSync(arcName, response, { encoding: null });
    tar.x({ file: arcName, cwd: ".", sync: true });
    let text = fs.readFileSync("latest.json");
    let fullText = JSON.parse(text);
    let championsObj = {};

    // Loop through entire list of champions and append only the info we need
    for (let i = 0; i < fullText.length; i++) {
      // Remove all white spaces, &, and ' characters in name
      let name = fullText[i].champion.name.replace(/\s|&|'|\./g, "");

      // If champion is not in object, initialize their values
      if (!championsObj.hasOwnProperty(name)) {
        championsObj[name] = {
          Mid: 0,
          Support: 0,
          Jungle: 0,
          Top: 0,
          Bot: 0,
        };
      }

      // Increment a champions position for every player
      switch (fullText[i].position) {
        case "Mid":
          championsObj[name].Mid += 1;
          break;
        case "Support":
          championsObj[name].Support += 1;
          break;
        case "Jungle":
          championsObj[name].Jungle += 1;
          break;
        case "Top":
          championsObj[name].Top += 1;
          break;
        case "Bot":
          championsObj[name].Bot += 1;
          break;
        default:
          break;
      }
    }

    // Some champions are not included in the tar file if they are never played
    // So we loop through a list of updated champions and set default 0 values for them
    champions.forEach((champ) => {
      let newChamp = champ.name.replace(/\s|&|'|\./g, "");
      if (!championsObj[newChamp]) {
        championsObj[newChamp] = {
          Mid: 0,
          Support: 0,
          Jungle: 0,
          Top: 0,
          Bot: 0,
        };
      }
    });

    // Delete current rankings
    await Rank.deleteMany({});

    // Create and save the new rankings
    let ranking = new Rank({
      rank: championsObj,
      lastUpdated: Date.now(),
    });
    await ranking.save();

    // Update all listings according to new rankings
    await updateAllListings();
  } catch (err) {
    process.exit(1);
  }
};

// Update all listings according to new rankings
updateAllListings = async () => {
  let rankings = await Rank.find({}); // Find all rankings
  let rankingDB = rankings[0]["rank"]; // We only care about rank parameter in rankings

  await Listing.find({}, (err, listings) => {
    if (err) {
      console.log(err);
    }
    // Loop through all listings
    const loopListings = async () => {
      console.log("start");
      for (let i = 0; i < listings.length; i++) {
        let championsUpdate = {};
        // Loop through all champions in each listing
        for (let key in listings[i]["champions"]) {
          championsUpdate[key] = rankingDB[key];
        }

        // Update each listing with new rankings of all champions that were already in the listing
        await Listing.updateOne(
          { _id: listings[i]._id },
          { $set: { champions: championsUpdate } }
        );
      }
    };
    loopListings();
  });
};

updateDB();
