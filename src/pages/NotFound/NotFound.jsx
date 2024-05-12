import React from "react";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.mainContainer}>
      <p className={styles.warning1}>404</p>
      <p className={styles.warning2}>Page Was Not Found</p>
    </div>
  );
};

export default NotFound;
