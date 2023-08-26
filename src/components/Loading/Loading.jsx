import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.lineProgressBar}></div>
    </div>
  );
};

export default Loading;
