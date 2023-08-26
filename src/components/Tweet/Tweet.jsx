import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";

import { likePost } from "../../app/features/posts/asyncActions";
import { dislikePost } from "../../app/features/posts/asyncActions";

import styles from "./Tweet.module.scss";

const Tweet = ({ post, index }) => {
  const [showInput, toggleInput] = useState(false);
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const [tempLike, setTempLike] = useState(0);
  const signedIn = useSelector((state) => state.users.signedIn);
  useEffect(() => {
    if (signedIn) {
      toggleInput(true);
      console.log(post);
      const liked = post.likes.filter(
        (like) => like.username == signedIn.username
      );
      console.log(liked);
      if (liked.length == 1) {
        setLike(true);
      } else {
        setLike(false);
      }
    }
  }, []);

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
        <div className={styles.date}>{post.createdAt}</div>
        <div>{post.text}</div>
      </div>
      <div className={styles.icons}>
        {showInput ? (
          <div className={styles.icon}>
            <FontAwesomeIcon
              icon={like ? faSolidHeart : faHeart}
              onClick={handleClick}
            />
            <div styles={styles.likeCount}>{post.likes.length + tempLike}</div>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faComment} />
        </div>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faRetweet} />
        </div>
      </div>
    </div>
  );
};

export default Tweet;
