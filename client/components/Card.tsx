import { HoloMember } from "../interface";
import styles from "../styles/Card.module.css";
import Image from "next/image";

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
    <div className={styles.card}>
      <div
        className={styles.cardImg}
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
          >
            <Image
              src={data.avatar}
              alt="youtube avatar"
              layout="fill"
              className={styles.avatar}
            />
          </div>
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
          <span className={styles.channelName}>{data.channel_name}</span>
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
          >
            {/* {data.live && data.live_video_thumbnail && data.live_video_url && (
              <Image
                src={data.live_video_thumbnail}
                alt="live thumbnail"
                layout="fill"
                onClick={() => openLink(data.live_video_url)}
              />
            )} */}
          </div>
          <span className={styles.videoTitle}>
            {data.live
              ? data.live_video_title
              : `${data.channel_name} is not streaming Σ(ＴωＴ)`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
