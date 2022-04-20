import React, { useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { setAuth, Context } from "hooks";
import { getUserLocalStorage } from "utils";
import { useNavigate } from "react-router-dom";
import Routes from "./routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();
  const { dispatchAuth } = useContext(Context);
  const handleTostify = (e) => {
    const { detail } = e || {};
    if (!detail?.variant) return;
    toast[detail?.variant](detail?.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    const userData = getUserLocalStorage() || {};
    console.log("userData", userData);
    if (userData) {
      const { id, email } = userData?.user_detail || {};
      dispatchAuth(setAuth({ id, email }));
    } else {
      navigate("/login");
    }
    document.addEventListener("setReactTostify", handleTostify);
    return () => {
      document.removeEventListener("setReactTostify", handleTostify);
    };
  }, []);

  return (
    <div>
      <ToastContainer />
      <Routes />
    </div>
  );
}

export default App;
