import React from "react";
import styles from "./Error.module.css";
import InfoRoundIcon from "@rsuite/icons/InfoRound";
const Error = () => {
  return (
    <div className={styles.mainContainer}>
      <div>
        <InfoRoundIcon />
      </div>
      <p>Oops...</p>
      <p className={styles.errorMsg}>Something Went Wrong !</p>
    </div>
  );
};

export default Error;
