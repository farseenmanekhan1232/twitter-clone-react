import noprofile from "../../assets/noprofile.png";
import styles from "./Profile.module.scss";

// Assuming RootState is the type of your entire Redux state
import { AppDispatch, RootState } from "../../app/store";
import { getUserDetails } from "../../app/features/interactions/asyncActions";
import { getUserPosts } from "../../app/features/posts/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import Tweets from "../../components/Tweets/Tweets";

interface ProfileParams {
  [key: string]: string | undefined;
  id?: string;
}

const Profile: React.FC = () => {
  const userDetails = useSelector(
    (state: RootState) => state.interaction.userDetails
  );
  const posts = useSelector((state: RootState) => state.posts.userPosts);
  const { id } = useParams<ProfileParams>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails({ username: id }));
      dispatch(getUserPosts(id));
    }
  }, [id, dispatch]);

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
