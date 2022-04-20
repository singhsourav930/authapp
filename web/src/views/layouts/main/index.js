import React from "react";
import { oneOfType, array, object } from "prop-types";

const Main = (props) => {
  const { children } = props;

  return <div>{children}</div>;
};

Main.propTypes = {
  children: oneOfType([array, object]),
};

export default Main;
