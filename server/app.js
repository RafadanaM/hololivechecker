const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const dotenv = require("dotenv");
const cron = require("node-cron");
const fs = require("fs");

dotenv.config();
const ORIGIN = process.env.ORIGIN || "http://localhost:3000";
const PORT = process.env.PORT || 5000;
const ORIGIN2 = process.env.ORIGIN2 || "http://localhost:3001";
console.log(ORIGIN);
const { allGen } = require("./allVtubers");

const { getChannelData } = require("./functions");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [ORIGIN, ORIGIN2], //change if you want to deploy
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

// CRON
cron.schedule("*/1 * * * *", async () => {
  console.log("running cron job...");
  const result = await Promise.all(
    Object.keys(allGen).map(async (gen, idx) => {
      try {
        await Promise.all(
          allGen[gen].map(async (id) => {
            try {
              const { data } = await axios.get(
                `https://youtube.com/channel/${id}/`,
                config
              );

              /* PARSING DATA V2*/
              const regex = /ytInitialData = ({.*}]}}});/gm;
              const finaldata = regex.exec(data)[1];
              const parsed = JSON.parse(finaldata);

              getChannelData(parsed, id, idx + 1);
            } catch (error) {
              console.log(error);
            }
          })
        );
      } catch (error) {
        console.log(error);
      }
    })
  );
});

app.get("/", (req, res) => {
  return res.send("connected");
});

// app.get("/api/v1/hololive", async (req, res) => {
//   try {
//     let vtuberResult = [];
//     const { page, gen } = req.query;
//     //const limit = 5;
//     let liveOnly = false;

//     /* NEED TO REFACTOR TO EXTERNAL FUNCTION */
//     switch (gen) {
//       case "enfirst":
//         vtuberResult.push(...enFirstGen);
//         break;

//       case "jpzero":
//         vtuberResult.push(...jpZeroGen);
//         break;

//       case "jpfirst":
//         vtuberResult.push(...jpFirstGen);
//         break;

//       case "jpsecond":
//         vtuberResult.push(...jpSecondGen);
//         break;

//       case "jpthird":
//         vtuberResult.push(...jpThirdGen);
//         break;

//       case "jpfourth":
//         vtuberResult.push(...jpFourthGen);
//         break;

//       case "jpfifth":
//         vtuberResult.push(...jpFifthGen);
//         break;

//       case "jpgamers":
//         vtuberResult.push(...jpGamers);
//         break;

//       case "idfirst":
//         vtuberResult.push(...idFirstGen);
//         break;

//       case "idsecond":
//         vtuberResult.push(...idSecondGen);
//         break;

//       case "all":
//         //I'm saving this in case I wanna go back
//         // if (isNaN(page)) {
//         //   return res.status(400).send({ message: "Bad Request" });
//         // }
//         // const startIndex = (page - 1) * limit;
//         // const endIndex = page * limit;
//         // const vtuberResult = vtubersList.slice(startIndex, endIndex);
//         // vtuberResult.push(...allGen.slice(startIndex, endIndex));
//         liveOnly = true;
//         vtuberResult.push(...allGenOld);
//         break;

//       default:
//         return res.status(400).send({ message: "Bad Request" });
//     }
//     const result = await Promise.all(
//       vtuberResult.map(async (id) => {
//         try {
//           const { data } = await axios.get(
//             `https://youtube.com/channel/${id}/`,
//             config
//           );

//           /* PARSING DATA V2*/
//           const regex = /ytInitialData = ({.*}]}}});/gm;
//           const finaldata = regex.exec(data)[1];
//           const parsed = JSON.parse(finaldata);

//           return getChannelData(parsed, id, liveOnly);
//         } catch (error) {
//           console.log(error);
//         }
//       })
//     );
//     return res.send(liveOnly ? result.filter((x) => x) : result);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send({ message: "something went wrong" });
//   }
// });

app.get("/api/v2/hololive", async (req, res) => {
  try {
    console.time("test");
    const result = await Promise.all(
      Object.keys(allGen).map(async (gen) => {
        try {
          return {
            gen: gen,
            data: await Promise.all(
              allGen[gen].map(async (id) => {
                const { data } = await axios.get(
                  `https://youtube.com/channel/${id}/`,
                  config
                );

                /* PARSING DATA */
                // const initialdata = data.match(/ytInitialData = (.*}]}}});/gm);
                // const str = String(initialdata);
                // const finaldata = str.match(/{(.*}]}}})/gm);
                // const parsed = JSON.parse(finaldata);

                /* PARSING DATA V2*/
                const regex = /ytInitialData = ({.*}]}}});/gm;
                const finaldata = regex.exec(data)[1];
                const parsed = JSON.parse(finaldata);

                return getChannelData(parsed, id);
              })
            ),
          };
        } catch (error) {
          console.log(error);
        }
      })
    );
    console.timeEnd("test");
    return res.send(result);
  } catch (error) {
    console.log(errzz);
    return res.status(500).send({ message: "something went wrong" });
  }
});

// app.get("/api/v2/test", async (req, res) => {
//   try {
//     const { id } = req.query;
//     const { data } = await axios.get(
//       `https://youtube.com/channel/${id}/`,
//       config
//     );

//     /* PARSING DATA V2*/
//     const regex = /ytInitialData = ({.*}]}}});/gm;
//     const finaldata = regex.exec(data)[1];
//     const parsed = JSON.parse(finaldata);

//     result = getChannelData(parsed, id);

//     return res.send(result);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ message: "something went wrong" });
//   }
// });

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
