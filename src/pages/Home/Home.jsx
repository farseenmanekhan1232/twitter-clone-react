import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import HomeNav from "../../components/HomeNav/HomeNav.jsx";
import WritePost from "../../components/WritePost/WritePost";
import Tweets from "../../components/Tweets/Tweets.jsx";

import { fetchAllPosts } from "../../app/features/posts/asyncActions.js";

import { removeRegisteredTag } from "../../app/features/users/usersSlice.js";

import styles from "./Home.module.scss";

const Home = ({ signedIn }) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);

  const [homenav, changeHomenav] = useState("explore");

  useEffect(() => {
    dispatch(removeRegisteredTag());
  }, []);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [homenav]);

  return (
    <div className={styles.home}>
      <HomeNav change={changeHomenav} />
      <div className={styles.content}>
        <WritePost signedIn={signedIn} />
        <div className={styles.tweetsContainer}>
          <div className={styles.tweets}>
            <Tweets tweets={posts} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
