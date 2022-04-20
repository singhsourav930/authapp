import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Form as FormikForm } from "formik";
import cx from "classnames";
import { Link, useNavigate } from "react-router-dom";
import {
  URLS,
  httpPost,
  showSuccessMsg,
  showErrorMsg,
} from "utils";
import { TextInput, Button } from "components/form";
import styles from "./_register.module.scss";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Please enter email"),
    password: yup
      .string()
      .min(6, "Password shall be atleast 6 characters long.")
      .max(20, "Password shall be max 20 characters long.")
      .required("Please enter password"),
    confirmPassword: yup
      .string()
      .required("Please enter confirm password")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Both password should be same"),
      }),
  });

  const handleOnSubmit = (values) => {
    setIsLoading(true);
    const url = URLS.AUTH.REGISTER;
    const params = {
      email: values?.email || "",
      password: values?.password || "",
    };
    httpPost(url, params)
      .then((res) => {
        if (res?.status === 200) {
          showSuccessMsg("User Created successfully, Please login");
          navigate("/login");
        } else {
          showErrorMsg(res.error);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        showErrorMsg(err);
        setIsLoading(false);
      });
  };

  return (
    <div className={styles["register"]}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleOnSubmit(values);
        }}
      >
        <FormikForm>
          <div className="mobile-container">
            <div className={cx("pb-3 mb-3 pt-4", styles["logo-container"])}>
              <div className={styles["your-logo"]}>Your logo</div>
              {/* <img
                className={styles["logo-img"]}
                src="static/images/logo.png"
                alt="brud logo"
              /> */}
              <div className={styles["logo-merchant"]}>Your Slogan</div>
            </div>
            <div>
              <h4 className={styles["title"]}> Sign up</h4>
              <h5 className={cx("pb-5 pt-3", styles["login-fill"])}>
                Create dummy account for testing /{" "}
                <Link to="/login">Login</Link>
              </h5>
            </div>
            <div className={cx("pb-5")}>
              <TextInput
                label="Enter Your Email"
                name="email"
                type="email"
                disabled={isLoading}
                id="email"
                autocomplete="off"
              />
            </div>
            <div className={cx("pb-5")}>
              <TextInput
                label="Enter New Password"
                name="password"
                type="password"
                disabled={isLoading}
                id="password"
                autocomplete="off"
              />
            </div>

            <div className={cx("pb-5")}>
              <TextInput
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                disabled={isLoading}
                id="confirmPassword"
                autocomplete="off"
              />
            </div>

            <Button disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign Up"}
            </Button>
          </div>
        </FormikForm>
      </Formik>
    </div>
  );
}

export default Register;
