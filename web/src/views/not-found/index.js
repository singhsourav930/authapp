import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1> Page Not Found</h1>
      <br />
      <Link to="/">Go to home page</Link>
    </div>
  );
}

export default NotFound;
