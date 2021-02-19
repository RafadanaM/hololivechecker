const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", //change if you want to deploy
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

//TODO
//Refactor, add pagination, store all hololive yt channels
const url = "https://youtube.com/channel/UCyl1z3jo3XHR1riLFKG5UAg/";
const config = {
  headers: {
    "x-youtube-client-name": "1",
    "x-youtube-client-version": "2.20180222",
    "accept-language": "en-US,en;q=0.5",
  },
};

app.get("/hololive", async (req, res) => {
  try {
    let isLive = false;
    let liveThumbnailUrl = null;
    let liveTitle = null;
    let liveLink = null;
    let channelThumbnail = "";
    let channelSubscribers = "";
    let channelName = "";
    let channelUrl = "";
    let channelAvatar = "";

    const { data } = await axios.get(url, config);

    /* PARSING DATA */
    const initialdata = data.match(/ytInitialData = (.*}]}}});/gm);
    const str = String(initialdata);
    const finaldata = str.match(/{(.*}]}}})/gm);
    const parsed = JSON.parse(finaldata);

    //fs.writeFileSync("kek2.json", finaldata);
    // console.log(data[1].response.metadata.channelMetadataRenderer);
    // fs.writeFileSync(
    //   "test.txt",
    //   parsed.responseContext.serviceTrackingParams[0].service
    // );
    // fs.writeFileSync("test.html", data);

    /* GET CHANNEL CONTENT(might need error handling) */
    const channelContent = parsed.header.c4TabbedHeaderRenderer;
    channelName = channelContent.title;
    channelUrl = `https://www.youtube.com/${channelContent.navigationEndpoint.commandMetadata.webCommandMetadata.url}`;
    channelAvatar = channelContent.avatar.thumbnails[2].url;
    channelThumbnail = channelContent.banner.thumbnails[1].url;
    channelSubscribers = channelContent.subscriberCountText.simpleText;

    /* GET LIVESTREAM DATA */
    const channelLive =
      parsed.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
        .sectionListRenderer.contents[0].itemSectionRenderer.contents[0]
        .channelFeaturedContentRenderer;
    if (channelLive !== undefined) {
      //channel is live
      isLive = true;
      const liveVideoContent = channelLive.items[0].videoRenderer;
      liveThumbnailUrl = liveVideoContent.thumbnail.thumbnails[3].url;
      liveTitle = liveVideoContent.title.runs[0].text;
      liveLink = `https://www.youtube.com/${liveVideoContent.navigationEndpoint.commandMetadata.webCommandMetadata.url}`;
    }
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
    return res.send({
      name: channelName,
      link: channelUrl,
      avatar: channelAvatar,
      thumbnail: channelThumbnail,
      subscibers: channelSubscribers,
      live: isLive,
      liveVideoUrl: liveThumbnailUrl,
      liveVideoTitle: liveTitle,
      liveVideoLink: liveLink,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "something went wrong" });
  }
});

//scrape();

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   // await page.setViewport({ width: 1280, height: 800 });
//   await page.goto(url, { waitUntil: "networkidle2" }).then(async () => {
//     const data = await page.content();
//     $.load(data);
//     console.log($("#text-container"));
//     //console.log($("img[id=img]").html());
//     // if (data.search(`{"text":" watching"}`) > -1) {
//     //   console.log("LIVE!");
//     // } else {
//     //   console.log("Not Live");
//     // }
//   });

//   // page
//   //   .waitForSelector("span[text=LIVE]")
//   //   .then(() => {
//   //     console.log("found");
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //   });
//   await browser.close();
// })();

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
