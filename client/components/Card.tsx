import styles from "../styles/Card.module.css";

interface CardProps {
  data: {
    avatar: string;
    id_channel: string;
    thumbnail: string;
    live: boolean;
    channel_name: string;
    subscribers: string;
    live_video_thumbnail: string;
    live_video_title: string;
    live_video_url: string;
  };
}

function Card({ data }: CardProps) {
  return (
    <div className={styles.card}>
      <div
        className={styles.cardImg}
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)",
        }}
      >
        <div className={styles.grayscale}>
          <div className={styles.liveBox}>
            <div className={styles.circle} />
            LIVE
          </div>
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardContentLeft}>
          <div className={styles.avatarContainer}>
            <img
              className={styles.avatar}
              src="https://yt3.ggpht.com/ytc/AKedOLRyfdFqU_yyrj27r9NdALxYO413WdDAN4DCUxBd=s48-c-k-c0x00ffffff-no-rj"
              alt="youtube avatar"
            />
          </div>
          <div className={styles.subscribersBox}>
            <p>11M</p>
          </div>
          <span className={styles.channelName}>Youtube channel name here</span>
        </div>
        <div className={styles.cardContentRight}>
          <div className={styles.videoBox}>
            <img
              className={styles.liveThumbnail}
              src="https://i.ytimg.com/vi/fwhaYcJgXyk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBUHZ5DeCXcp3_haWdlxF4AWtHYqg"
              alt="live thumbnail"
            />
          </div>
          <span className={styles.videoTitle}>Youtube video title here</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
