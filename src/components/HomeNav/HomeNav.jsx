import styles from "./HomeNav.module.scss";

const HomeNav = ({ change }) => {
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
