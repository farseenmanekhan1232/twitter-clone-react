import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Tweets from "../../components/Tweets/Tweets";
import Loading from "../../components/Loading/Loading";

import { getUserPosts } from "../../app/features/posts/asyncActions";
import { getUserDetails } from "../../app/features/interactions/asyncActions";

import noprofile from "../../assets/noprofile.png";
import styles from "./Profile.module.scss";

const Profile = () => {
  const userDetails = useSelector((state) => state.interaction.userDetails);
  console.log(userDetails);
  const posts = useSelector((state) => state.posts.userPosts);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails({ username: id }));
    dispatch(getUserPosts({ username: id }));
  }, [id]);
  return (
    <div className={styles.profile}>
      {userDetails != "pending" && userDetails ? (
        <div className={styles.container}>
          <div className={styles.aboutcard}>
            {userDetails.profilePicture ? (
              <img src={userDetails.profilePicture} />
            ) : (
              <img src={noprofile} alt="" />
            )}
            <div>
              <h3>{userDetails.profilename || "no username"}</h3>
              <h5 style={{ color: "grey" }}>@{userDetails.username}</h5>

              <p>{userDetails.bio}</p>
            </div>
          </div>
          <div>
            {posts.length ? (
              <div className={styles.tweets}>
                <h3>tweets</h3>
                {posts == "pending" ? <Loading /> : <Tweets tweets={posts} />}
              </div>
            ) : (
              <div className={[styles.tweets, styles.error].join(" ")}>
                no tweets
              </div>
            )}
          </div>
        </div>
      ) : userDetails == "pending" ? (
        <Loading />
      ) : (
        <div
          style={{
            fontSize: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          User does not exist
        </div>
      )}
    </div>
  );
};

export default Profile;
