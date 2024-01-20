import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeNav from "../../components/HomeNav/HomeNav";
import WritePost from "../../components/WritePost/WritePost";
import Tweets from "../../components/Tweets/Tweets";

import { fetchAllPosts } from "../../app/features/posts/asyncActions";
import { removeRegisteredTag } from "../../app/features/users/usersSlice";

import styles from "./Home.module.scss";

// Assuming RootState is the type of your entire Redux state
import { AppDispatch, RootState } from "../../app/store";

// Define interface for props
interface HomeProps {
  signedIn: boolean;
}

const Home: React.FC<HomeProps> = ({ signedIn }) => {
  const dispatch = useDispatch<AppDispatch>();

  const posts = useSelector((state: RootState) => state.posts.posts);

  const [homenav, changeHomenav] = useState<string>("explore");

  useEffect(() => {
    dispatch(removeRegisteredTag());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [homenav, dispatch]);

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
