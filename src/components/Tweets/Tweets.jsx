import Tweet from "../Tweet/Tweet";
import Loading from "../Loading/Loading";

import styles from "./Tweets.module.scss";

const Tweets = ({ tweets }) => {
  return tweets ? (
    tweets != "pending" ? (
      tweets.map((post, index) => <Tweet key={index} post={post} />)
    ) : (
      <Loading />
    )
  ) : (
    <div className={styles.empty}>
      <div className={styles.emptyText}>No tweets</div>
    </div>
  );
};

export default Tweets;
