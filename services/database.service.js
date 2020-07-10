let schedule = require("node-schedule");
const mongoose = require("mongoose");
const fs = require("fs");
const rp = require("request-promise");
const tar = require("tar");
const champions = require("lol-champions");

const Rank = mongoose.model("rankings");
const Listing = mongoose.model("listings");

schedule.scheduleJob("17 * * * *", async function () {
  //await updateFileSystem();
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

    await Rank.deleteMany({});

    //await updateDatabase();
    let ranking = new Rank({
      rank: championsObj,
      lastUpdated: Date.now(),
    });

    await ranking.save();

    //await updateAllListings();
  } catch (err) {
    console.error(err);
  }
});

updateAllListings = async () => {
  let rankings = await Rank.find({});
  //console.log(rankings);
  await Listing.updateMany({}, { $set: { champions: { hi: "bye" } } });
  let listings = await Listing.find({});
  console.log(listings);
};
