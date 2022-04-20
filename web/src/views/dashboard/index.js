import React from "react";
import cx from "classnames";
import { Button } from "components/form";
import { Link } from "react-router-dom";
import styles from "./_dashboard.module.scss";

const Dashboard = () => {
  return (
    <div className={styles["dashboard"]}>
      <div className={cx("pb-3 mb-3 pt-4", styles["logo-container"])}>
        <div className={styles["your-logo"]}>Welcome to the Home Page</div>
      </div>
      <div>
        <h4 className={styles["logo-merchant"]}>
          You are logged in successfully
        </h4>
        <br />
        <h5 className={cx("pb-5 pt-3", styles["login-fill"])}>
          <Link to="/logout">
            <Button className={styles["logout-btn"]}>Logout</Button>
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Dashboard;
