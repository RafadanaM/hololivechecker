const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const ORIGIN = process.env.ORIGIN || "http://localhost:3000";
const PORT = process.env.PORT || 5000;
console.log(ORIGIN);
const {
  enFirstGen,
  jpZeroGen,
  jpFirstGen,
  jpSecondGen,
  jpGamers,
  jpThirdGen,
  jpFourthGen,
  jpFifthGen,
  idFirstGen,
  idSecondGen,
  allGen,
} = require("./allVtubers");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [ORIGIN, SELF], //change if you want to deploy
    methods: ["GET"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

const url = "https://youtube.com/channel/UCyl1z3jo3XHR1riLFKG5UAg/";
const config = {
  headers: {
    "x-youtube-client-name": "1",
    "x-youtube-client-version": "2.20180222",
    "accept-language": "en-US,en;q=0.5",
  },
};

app.get("/", (req, res) => {
  res.send("connected");
});

app.get("/api/hololive", async (req, res) => {
  try {
    let vtuberResult = [];
    const { page, gen } = req.query;
    const limit = 5;

    /* NEED TO REFACTOR TO EXTERNAL FUNCTION */
    switch (gen) {
      case "enfirst":
        vtuberResult.push(...enFirstGen);
        break;

      case "jpzero":
        vtuberResult.push(...jpZeroGen);
        break;

      case "jpfirst":
        vtuberResult.push(...jpFirstGen);
        break;

      case "jpsecond":
        vtuberResult.push(...jpSecondGen);
        break;

      case "jpthird":
        vtuberResult.push(...jpThirdGen);
        break;

      case "jpfourth":
        vtuberResult.push(...jpFourthGen);
        break;

      case "jpfifth":
        vtuberResult.push(...jpFifthGen);
        break;

      case "jpgamers":
        vtuberResult.push(...jpGamers);
        break;

      case "idfirst":
        vtuberResult.push(...idFirstGen);
        break;

      case "idsecond":
        vtuberResult.push(...idSecondGen);
        break;

      case "all":
        if (isNaN(page)) {
          return res.status(400).send({ message: "Bad Request" });
        }
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        //const vtuberResult = vtubersList.slice(startIndex, endIndex);
        vtuberResult.push(...allGen.slice(startIndex, endIndex));
        break;

      default:
        return res.status(400).send({ message: "Bad Request" });
    }
    //console.log(vtuberResult);

    const result = await Promise.all(
      vtuberResult.map(async (id) => {
        //console.log(id);
        let isLive = false;
        let liveThumbnailUrl = null;
        let liveTitle = null;
        let liveLink = null;
        let channelThumbnail = "";
        let channelSubscribers = "";
        let channelName = "";
        let channelUrl = "";
        let channelAvatar = "";

        const { data } = await axios.get(
          `https://youtube.com/channel/${id}/`,
          config
        );

        /* PARSING DATA */
        const initialdata = data.match(/ytInitialData = (.*}]}}});/gm);
        const str = String(initialdata);
        const finaldata = str.match(/{(.*}]}}})/gm);
        const parsed = JSON.parse(finaldata);

        /* GET CHANNEL CONTENT(might need error handling) */
        const channelContent = parsed.header.c4TabbedHeaderRenderer;
        channelName = channelContent.title;
        channelUrl = `https://www.youtube.com/${channelContent.navigationEndpoint.commandMetadata.webCommandMetadata.url}`;
        channelAvatar = channelContent.avatar.thumbnails[2].url;
        if (channelContent.banner != undefined) {
          channelThumbnail = channelContent.banner.thumbnails[1].url;
        }
        channelSubscribers = channelContent.subscriberCountText.simpleText;

        /* GET LIVESTREAM DATA */
        const channelLive =
          parsed.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer
            .content.sectionListRenderer.contents[0].itemSectionRenderer
            .contents[0].channelFeaturedContentRenderer;

        /* CHECK IF CHANNEL IS LIVE*/
        if (channelLive !== undefined) {
          isLive = true;
          const liveVideoContent = channelLive.items[0].videoRenderer;
          liveThumbnailUrl = liveVideoContent.thumbnail.thumbnails[3].url;
          liveTitle = liveVideoContent.title.runs[0].text;
          liveLink = `https://www.youtube.com/${liveVideoContent.navigationEndpoint.commandMetadata.webCommandMetadata.url}`;
        }
        const all = {
          name: channelName,
          link: channelUrl,
          avatar: channelAvatar,
          thumbnail: channelThumbnail,
          subscribers: channelSubscribers.split(" ")[0],
          live: isLive,
          liveVideoThumbnail: liveThumbnailUrl,
          liveVideoTitle: liveTitle,
          liveVideoUrl: liveLink,
          subscribeLink: `https://www.youtube.com/channel/${id}?sub_confirmation=1`,
        };
        // console.log({
        //   name: channelName,
        //   link: channelUrl,
        //   avatar: channelAvatar,
        //   thumbnail: channelThumbnail,
        //   subscibers: channelSubscribers,
        //   live: isLive,
        //   liveVideoUrl: liveThumbnailUrl,
        //   liveVideoTitle: liveTitle,
        //   liveVideoLink: liveLink,
        // });
        return all;
        //console.log(result);
      })
    );

    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "something went wrong" });
  }
});

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server has started on port ${PORT}`);
  }
});

//fs.writeFileSync("kek2.json", finaldata);
// console.log(data[1].response.metadata.channelMetadataRenderer);
// fs.writeFileSync(
//   "test.txt",
//   parsed.responseContext.serviceTrackingParams[0].service
// );
// fs.writeFileSync("test.html", data);
