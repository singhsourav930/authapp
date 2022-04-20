import React, { useEffect } from "react";
import { removeUser } from "utils";
import cx from "classnames";
import { Link } from "react-router-dom";
import styles from "./_logout.module.scss";

const Logout = () => {
  useEffect(() => {
    removeUser();
  }, []);
  return (
    <div className={styles["logout"]}>
      <div className="mobile-container">
        <div className={cx("pb-3 mb-3 pt-4", styles["logo-container"])}>
          <div className={styles["your-logo"]}>User Logout Successfully</div>
        </div>
        <div>
          <h4 className={styles["logo-merchant"]}>Hope we meet again soon</h4>
          <br />
          <h5 className={cx("pb-5 pt-3", styles["login-fill"])}>
            <Link to="/login">Login again</Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Logout;
