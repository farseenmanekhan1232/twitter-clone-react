import React from "react";
import styles from "./HomeNav.module.scss";

// Define the props type
interface HomeNavProps {
  change: (tab: string) => void;
}

const HomeNav: React.FC<HomeNavProps> = ({ change }) => {
  return (
    <div className={styles.homenav}>
      <div className={styles.tab} onClick={() => change("explore")}>
        All Posts
      </div>
      <div className={styles.tab} onClick={() => change("following")}>
        Following
      </div>
    </div>
  );
};

export default HomeNav;
