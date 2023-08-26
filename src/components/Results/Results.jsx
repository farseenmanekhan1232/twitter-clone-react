import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import Noprofile from "../../assets/noprofile.png";
import styles from "./Results.module.scss";

const Results = ({ userList }) => {
  return (
    <div className={styles.container}>
      {userList.length ? (
        userList.map((user, index) => {
          if (user) {
            return (
              <div key={index} className={styles.user}>
                <Link to={`/profile/${user.username}`}>
                  {user.profilePicture ? (
                    <img src={user.profilePicture} />
                  ) : (
                    <img src={Noprofile} alt="" />
                  )}
                  <div className={styles.info}>{user.username}</div>
                </Link>
              </div>
            );
          } else {
            return <div className={styles.user}>no user found</div>;
          }
        })
      ) : (
        <></>
      )}
    </div>
  );
};
export default Results;
