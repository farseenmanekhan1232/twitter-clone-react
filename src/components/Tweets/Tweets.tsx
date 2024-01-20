import React from "react";
import Tweet from "../Tweet/Tweet";
import Loading from "../Loading/Loading";
import styles from "./Tweets.module.scss";

// Define the type for the tweets prop
interface TweetType {
  _id: string;
  username: string;
  profilename?: string;
  createdAt: string;
  text: string;
  likes: Array<{ username: string }>;
  // Add other tweet properties as needed
}

interface TweetsProps {
  tweets: TweetType[] | "pending";
}

const Tweets: React.FC<TweetsProps> = ({ tweets }) => {
  return (
    <div>
      {tweets === "pending" ? (
        <Loading />
      ) : (
        tweets.map((post, index) => (
          <Tweet key={index} post={post} index={index} />
        ))
      )}
    </div>
  );
};

export default Tweets;
