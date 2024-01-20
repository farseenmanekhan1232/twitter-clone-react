import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import {
  faRetweet,
  faHeart as faSolidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { likePost, dislikePost } from "../../app/features/posts/asyncActions";
import { AppDispatch, RootState } from "../../app/store";
import styles from "./Tweet.module.scss";
import dayjs from "dayjs";

// Define the type for the post prop
interface PostType {
  _id: string;
  username: string;
  profilename?: string;
  createdAt: string;
  text: string;
  likes: Array<{ username: string }>;
  // Add other post properties as needed
}

interface TweetProps {
  post: PostType;
  index: number;
}

const Tweet: React.FC<TweetProps> = ({ post, index }) => {
  const [showInput, toggleInput] = useState(false);
  const [like, setLike] = useState(false);
  const [tempLike, setTempLike] = useState(0);
  const signedIn = useSelector((state: RootState) => state.users.signedIn);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (signedIn) {
      toggleInput(true);
      const liked = post.likes.some(
        (like) => like.username === signedIn.username
      );
      setLike(liked);
    }
  }, [signedIn, post.likes]);

  const handleClick = () => {
    if (like) {
      dispatch(dislikePost({ username: signedIn.username, postId: post._id }));
      setTempLike((prev) => prev - 1);
      setLike(false);
    } else {
      dispatch(likePost({ username: signedIn.username, postId: post._id }));
      setTempLike((prev) => prev + 1);
      setLike(true);
    }
  };

  return (
    <div className={styles.tweet} key={index}>
      <div>
        <div className={styles.profile}>
          <Link to={`/profile/${post.username}`}>
            {" "}
            {post.profilename ? `${post.profilename} |` : ""}@{post.username}
          </Link>
        </div>
        <div className={styles.date}>
          {dayjs(post.createdAt).format("HH:mm DD/MM/YY")}
        </div>
        <div>{post.text}</div>
      </div>
      <div className={styles.icons}>
        {showInput ? (
          <div className={styles.icon}>
            <FontAwesomeIcon
              icon={like ? faSolidHeart : faHeart}
              onClick={handleClick}
            />
            <div className={styles.likeCount}>
              {post.likes.length + tempLike}
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* <div className={styles.icon}>
          <FontAwesomeIcon icon={faComment} />
        </div>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faRetweet} />
        </div> */}
      </div>
    </div>
  );
};

export default Tweet;
