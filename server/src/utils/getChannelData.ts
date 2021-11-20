export const getChannelData = (parsed: any, id: string) => {
  let live = false;
  let live_video_thumbnail = undefined;
  let live_video_title = undefined;
  let live_video_url = undefined;
  let thumbnail = undefined;
  let subscribers = undefined;
  let channel_name = undefined;
  let channelUrl = undefined;
  let avatar = undefined;
  let watching = undefined;

  /* GET LIVESTREAM DATA */

  const channelLive =
    parsed?.contents?.twoColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents[0]
      ?.itemSectionRenderer?.contents[0]?.channelFeaturedContentRenderer;

  /* CHECK IF CHANNEL IS LIVE*/
  if (channelLive !== undefined) {
    live = true;
    const liveVideoContent = channelLive?.items[0]?.videoRenderer;
    live_video_thumbnail = liveVideoContent?.thumbnail?.thumbnails[3]?.url;
    live_video_title = liveVideoContent?.title?.runs[0].text;
    const liveUrl = liveVideoContent?.navigationEndpoint?.commandMetadata?.webCommandMetadata?.url;
    live_video_url = liveUrl ? `https://www.youtube.com/${liveUrl}` : undefined;
    watching = liveVideoContent?.viewCountText?.runs[0]?.text;
  }

  /* GET CHANNEL CONTENT(might need error handling) */
  const channelContent = parsed?.header?.c4TabbedHeaderRenderer;
  channel_name = channelContent?.title;
  channelUrl = `https://www.youtube.com/${id}`;
  avatar = channelContent?.avatar?.thumbnails[2]?.url;
  thumbnail = channelContent?.banner?.thumbnails[1]?.url;
  subscribers = channelContent?.subscriberCountText?.simpleText.split(" ")[0];

  const all = {
    channel_name,
    avatar,
    thumbnail,
    subscribers: subscribers.split(" ")[0],
    live,
    live_video_thumbnail,
    live_video_title,
    live_video_url,
    watching,
  };
  return all;
};
