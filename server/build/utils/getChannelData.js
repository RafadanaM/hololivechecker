"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannelData = void 0;
const getChannelData = (parsed, id) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
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
    const channelLive = (_j = (_h = (_g = (_f = (_e = (_d = (_c = (_b = (_a = parsed === null || parsed === void 0 ? void 0 : parsed.contents) === null || _a === void 0 ? void 0 : _a.twoColumnBrowseResultsRenderer) === null || _b === void 0 ? void 0 : _b.tabs[0]) === null || _c === void 0 ? void 0 : _c.tabRenderer) === null || _d === void 0 ? void 0 : _d.content) === null || _e === void 0 ? void 0 : _e.sectionListRenderer) === null || _f === void 0 ? void 0 : _f.contents[0]) === null || _g === void 0 ? void 0 : _g.itemSectionRenderer) === null || _h === void 0 ? void 0 : _h.contents[0]) === null || _j === void 0 ? void 0 : _j.channelFeaturedContentRenderer;
    if (channelLive !== undefined) {
        live = true;
        const liveVideoContent = (_k = channelLive === null || channelLive === void 0 ? void 0 : channelLive.items[0]) === null || _k === void 0 ? void 0 : _k.videoRenderer;
        live_video_thumbnail = (_m = (_l = liveVideoContent === null || liveVideoContent === void 0 ? void 0 : liveVideoContent.thumbnail) === null || _l === void 0 ? void 0 : _l.thumbnails[3]) === null || _m === void 0 ? void 0 : _m.url;
        live_video_title = (_o = liveVideoContent === null || liveVideoContent === void 0 ? void 0 : liveVideoContent.title) === null || _o === void 0 ? void 0 : _o.runs[0].text;
        const liveUrl = (_r = (_q = (_p = liveVideoContent === null || liveVideoContent === void 0 ? void 0 : liveVideoContent.navigationEndpoint) === null || _p === void 0 ? void 0 : _p.commandMetadata) === null || _q === void 0 ? void 0 : _q.webCommandMetadata) === null || _r === void 0 ? void 0 : _r.url;
        live_video_url = liveUrl ? `https://www.youtube.com/${liveUrl}` : undefined;
        watching = (_t = (_s = liveVideoContent === null || liveVideoContent === void 0 ? void 0 : liveVideoContent.viewCountText) === null || _s === void 0 ? void 0 : _s.runs[0]) === null || _t === void 0 ? void 0 : _t.text;
    }
    const channelContent = (_u = parsed === null || parsed === void 0 ? void 0 : parsed.header) === null || _u === void 0 ? void 0 : _u.c4TabbedHeaderRenderer;
    channel_name = channelContent === null || channelContent === void 0 ? void 0 : channelContent.title;
    channelUrl = `https://www.youtube.com/${id}`;
    avatar = (_w = (_v = channelContent === null || channelContent === void 0 ? void 0 : channelContent.avatar) === null || _v === void 0 ? void 0 : _v.thumbnails[2]) === null || _w === void 0 ? void 0 : _w.url;
    thumbnail = (_y = (_x = channelContent === null || channelContent === void 0 ? void 0 : channelContent.banner) === null || _x === void 0 ? void 0 : _x.thumbnails[1]) === null || _y === void 0 ? void 0 : _y.url;
    subscribers = (_z = channelContent === null || channelContent === void 0 ? void 0 : channelContent.subscriberCountText) === null || _z === void 0 ? void 0 : _z.simpleText.split(" ")[0];
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
exports.getChannelData = getChannelData;
//# sourceMappingURL=getChannelData.js.map