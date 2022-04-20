import React, { useState, useContext } from "react";
import * as yup from "yup";
import { Formik, Form as FormikForm } from "formik";
import cx from "classnames";
import { TextInput, Button } from "components/form";
import styles from "./_login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  URLS,
  httpPost,
  showSuccessMsg,
  showErrorMsg,
  setUserLocalStorage,
} from "utils";
import { setAuth, Context } from "hooks";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatchAuth } = useContext(Context);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Please enter email"),
    password: yup.string().required("Please enter password"),
  });

  const handleOnSubmit = (values) => {
    setIsLoading(true);
    const url = URLS.AUTH.SIGN_IN;
    const params = {
      email: values?.email || "",
      password: values?.password || "",
    };
    httpPost(url, params)
      .then((res) => {
        if (res?.status === 200) {
          showSuccessMsg("User login successfully");
          if (res?.data?.user_detail) {
            const { id, email } = res?.data?.user_detail || {};
            dispatchAuth(setAuth({ id, email }));
            setUserLocalStorage(res?.data || "");
          }
          navigate("/");
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
    <div className={styles["login"]}>
      <Formik
        initialValues={{
          email: "",
          password: "",
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
              <h4 className={styles["title"]}>Login</h4>
              <h5 className={cx("pb-5 pt-3", styles["login-fill"])}>
                Enter your login credentials /{" "}
                <Link to="/signup">Register new account</Link>
              </h5>
            </div>
            <div className={cx("pb-5")}>
              <TextInput
                label="Enter Your Email"
                name="email"
                type="email"
                id="email"
                disabled={isLoading}
                autocomplete="off"
              />
            </div>
            <div className={cx("pb-5")}>
              <TextInput
                label="Enter New Password"
                name="password"
                type="password"
                id="password"
                disabled={isLoading}
                autocomplete="off"
              />
            </div>

            <Button disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </div>
        </FormikForm>
      </Formik>
    </div>
  );
};

export default Login;
