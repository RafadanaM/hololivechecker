import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import classes from "./ProfileCard.module.css";
import { Box } from "@material-ui/core";
const ProfileCard = (props) => {
  const { data } = props;
  const openLink = (link) => {
    window.open(link);
  };

  // const openLivestream = (link) => {
  //   window.open(link);
  // };
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={data.thumbnail}>
        <Box className={classes.brightness}>
          <img
            src={data.avatar}
            alt="avatar"
            className={classes.imageDecoration}
            onClick={() => openLink(data.link)}
          />
          {data.live && (
            <Box className={classes.live}>
              <div className={classes.circle} />
              LIVE
            </Box>
          )}
        </Box>
      </CardMedia>
      <CardContent className={classes.cardContent}>
        <Box className={`${classes.cardDetail} ${classes.grow2}`}>
          <Typography
            gutterBottom
            component="p"
            className={classes.channelName}
          >
            {data.name}
          </Typography>
          <Box className={classes.subs}>
            <p onClick={() => openLink(data.subscribeLink)}>
              {data.subscribers}
            </p>
          </Box>
        </Box>
        <Box className={`${classes.cardDetail} ${classes.grow3}`}>
          <Box
            className={`${classes.imgContainer} ${
              data.live && classes.imgContainerActive
            }`}
          >
            {data.live && (
              <img
                src={data.liveVideoThumbnail}
                alt="live thumbnail"
                className={classes.liveThumbnail}
                onClick={() => openLink(data.liveVideoUrl)}
              />
            )}
          </Box>
          <p className={classes.liveTitle}>
            {data.live
              ? data.liveVideoTitle
              : `${data.name} is not streaming Σ(ＴωＴ)`}
          </p>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
