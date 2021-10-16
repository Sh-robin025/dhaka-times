import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { authenticate } from "../../redux/slices/userSlice";
import { handleAuthentication } from "../../services/AuthService";
import AuthPopUp from "../auth/AuthPopUp";
import Footer from "../common/footer/Footer";
import Header from "../common/header/Header";
import Edit from "../news/admin/Edit";

const AppLayout = ({ children }) => {
  const popUp = useSelector(state => state.popup.open_popup);
  const dispatch = useDispatch();

  const handleAuth = async () => {
    const res = await handleAuthentication();

    console.log("hitting at handleAuth", res);
    const { status, user } = res;
    if (status === 200) {
      dispatch(authenticate(user));
    }
  };

  useEffect(() => {
    handleAuth();
  });

  return (
    <>
      <Header />
      <ToastContainer hideProgressBar={true} theme={"colored"} />
      {popUp === "auth" && <AuthPopUp />}
      {popUp === "custom_headline" ||
      popUp === "custom_news" ||
      popUp === "custom_image" ||
      popUp === "custom_meta_desc" ? (
        <Edit />
      ) : (
        ""
      )}
      <main className="container mx-auto">{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
