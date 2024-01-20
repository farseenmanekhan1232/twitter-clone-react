import React from "react";
import styles from "./Loading.module.scss";

const Loading: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.lineProgressBar}></div>
    </div>
  );
};

export default Loading;
