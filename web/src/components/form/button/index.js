import React from "react";
import cx from "classnames";
import styles from "./_button.module.scss";

function Button(props) {
  const {
    loadingText = "",
    text = "",
    children,
    className = "",
    ...restOfProps
  } = props;

  return (
    <div>
      <button {...restOfProps} className={cx(styles["button"], className)}>
        {loadingText ? loadingText : text || children}
      </button>
    </div>
  );
}

export default Button;
