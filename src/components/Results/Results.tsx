import React from "react";
import { Link } from "react-router-dom";
import Noprofile from "../../assets/noprofile.png";
import styles from "./Results.module.scss";

// Define the props type
interface ResultsProps {
  userList: {
    username: string;
    profilePicture?: string;
  }[];
}

const Results: React.FC<ResultsProps> = ({ userList }) => {
  return (
    <div className={styles.container}>
      {userList.length
        ? userList.map((user, index) => (
            <div key={index} className={styles.user}>
              <Link to={`/profile/${user.username}`}>
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt={user.username} />
                ) : (
                  <img src={Noprofile} alt="No profile" />
                )}
                <div className={styles.info}>{user.username}</div>
              </Link>
            </div>
          ))
        : null}
    </div>
  );
};

export default Results;
