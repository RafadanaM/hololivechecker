const db = require("./db");

const getChannelData = (parsed, id, onlyLive = false) => {
  try {
    let isLive = false;
    let liveThumbnailUrl = null;
    let liveTitle = null;
    let liveLink = null;
    let channelThumbnail = null;
    let channelSubscribers = null;
    let channelName = null;
    let channelUrl = null;
    let channelAvatar = null;
    let watching = null;

    /* GET LIVESTREAM DATA */

    const channelLive =
      parsed.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
        .sectionListRenderer.contents[0].itemSectionRenderer.contents[0]
        .channelFeaturedContentRenderer;

    /* CHECK IF CHANNEL IS LIVE*/
    if (channelLive !== undefined) {
      isLive = true;
      const liveVideoContent = channelLive.items[0].videoRenderer;
      liveThumbnailUrl = liveVideoContent.thumbnail.thumbnails[3].url;
      liveTitle = liveVideoContent.title.runs[0].text;
      liveLink = `https://www.youtube.com/${liveVideoContent.navigationEndpoint.commandMetadata.webCommandMetadata.url}`;
      watching = liveVideoContent.viewCountText.runs[0].text;
    } else if (onlyLive) {
      return null;
    }

    /* GET CHANNEL CONTENT(might need error handling) */
    const channelContent = parsed.header.c4TabbedHeaderRenderer;
    channelName = channelContent.title;
    channelUrl = `https://www.youtube.com/${channelContent.navigationEndpoint.commandMetadata.webCommandMetadata.url}`;
    channelAvatar = channelContent.avatar.thumbnails[2].url;
    if (channelContent.banner != undefined) {
      channelThumbnail = channelContent.banner.thumbnails[1].url;
    }
    channelSubscribers = channelContent.subscriberCountText.simpleText;

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
      watching: watching,
      subscribeLink: `https://www.youtube.com/channel/${id}?sub_confirmation=1`,
    };

    db.query(
      "UPDATE CHANNEL SET channel_name = $1, avatar = $2, thumbnail = $3, subscribers = $4, live = $5, live_video_thumbnail = $6, live_video_title = $7, live_video_url = $8, watching = $9 WHERE id_channel = $10",
      [
        channelName,
        channelAvatar,
        channelThumbnail,
        channelSubscribers,
        isLive,
        liveThumbnailUrl,
        liveTitle,
        liveLink,
        watching,
        id,
      ]
    );
  } catch (err) {
    console.log(err);
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

  //console.log(result);
};

module.exports = {
  getChannelData,
};
