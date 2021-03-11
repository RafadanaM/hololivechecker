const getChannelData = (parsed, id, onlyLive = false) => {
  let isLive = false;
  let liveThumbnailUrl = null;
  let liveTitle = null;
  let liveLink = null;
  let channelThumbnail = "";
  let channelSubscribers = "";
  let channelName = "";
  let channelUrl = "";
  let channelAvatar = "";

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
};

module.exports = {
  getChannelData,
};
