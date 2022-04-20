import React from "react";
import { oneOfType, any } from "prop-types";
import { Routes as Switch, Route, useNavigate } from "react-router-dom";
import MainLayout from "views/layouts/main";
import NotFound from "views/not-found";
import Login from "views/identity/login";
import Logout from "views/identity/logout";
import Register from "views/identity/register";
import Dashboard from "views/dashboard";
import { getUserLocalStorage } from "utils";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userData = getUserLocalStorage();
  console.log("userData--->>>", userData);
  const navigate = useNavigate();
  return userData?.token ? (
    <MainLayout>
      <Component {...rest} />
    </MainLayout>
  ) : (
    navigate("/login")
  );
};

ProtectedRoute.propTypes = {
  element: oneOfType([any]),
};

export default function Routes() {
  return (
    <Switch>
      <Route path="/" element={<ProtectedRoute component={Dashboard} />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/logout" element={<Logout />} />
      <Route exact path="/signup" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Switch>
  );
}
