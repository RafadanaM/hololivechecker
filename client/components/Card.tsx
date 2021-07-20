import { HoloMember } from "../interface";
import styles from "../styles/Card.module.css";
import Image from "next/image";
import React from "react";
import { Box, Typography } from "@material-ui/core";

interface CardProps {
  data: HoloMember;
}

function Card({ data }: CardProps) {
  const openLink = (link: string | null) => {
    if (link) {
      window.open(link);
    }
  };
  return (
    <div className={`${styles.card} ${!data.live && styles.filter}`}>
      <div
        className={styles.cardImg}
        //I can't get next built in Image tag to work in production
        style={
          data.thumbnail
            ? {
                backgroundImage: `url(${data.thumbnail})`,
              }
            : {}
        }
      >
        <div className={styles.grayscale}>
          {data.live && (
            <div className={styles.liveBox}>
              <div className={styles.circle} />
              LIVE
            </div>
          )}
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardContentLeft}>
          <div
            className={styles.avatarContainer}
            onClick={() =>
              openLink(`https://www.youtube.com/channel/${data.id_channel}`)
            }
            //I can't get next built in Image tag to work in production
            style={
              data.avatar
                ? {
                    backgroundImage: `url(${data.avatar})`,
                  }
                : {}
            }
          ></div>
          <div
            className={styles.subscribersBox}
            onClick={() =>
              openLink(
                `https://www.youtube.com/channel/${data.id_channel}?sub_confirmation=1`
              )
            }
          >
            <p>{data.subscribers}</p>
          </div>
          <p className={styles.channelName}>{data.channel_name}</p>
        </div>
        <div className={styles.cardContentRight}>
          <div
            className={styles.videoBox}
            onClick={() =>
              data.live && data.live_video_url && openLink(data.live_video_url)
            }
            style={
              data.live && data.live_video_thumbnail
                ? {
                    backgroundImage: `url(${data.live_video_thumbnail})`,
                  }
                : {}
            }
          />
          <Box className={styles.videoTitleContainer} textOverflow="ellipsis">
            <Typography className={styles.videoTitle}>
              {data.live
                ? data.live_video_title
                : `${data.channel_name} is not streaming Σ(ＴωＴ)`}
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Card;
