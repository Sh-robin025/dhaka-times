import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RiFacebookCircleFill } from "react-icons/ri";
import logo from "../../assets/logo (1).png";
import { useForm } from "react-hook-form";
import { userAuth } from "../../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { set_open_popup } from "../../redux/slices/popupSlice";
import { authenticate } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { set_loader } from "../../redux/slices/loadingSlice";
import PopupLayout from "../layout/PopupLayout";
import { useHistory } from "react-router";
import { FaWindowClose } from "react-icons/fa";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../../services/firebase/config";
import { handleGoogleLogin } from "../../services/firebase/socialLogin";

const AuthPopUp = () => {
  initializeApp(firebaseConfig);
  const loader = useSelector(state => state.loader.isLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [userAction, setUserAction] = useState("login");
  const [isAdmin, setIsAdmin] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const history = useHistory();

  const popupClose = () => {
    dispatch(set_open_popup(""));
    if (window.location.pathname === "/Sports" || window.location.pathname === "/International") {
      history.goBack();
    }
  };

  const finalResponse = data => {
    const { status, message, user } = data;
    if (status === 200 || status === 201) {
      dispatch(set_loader(false));
      dispatch(set_open_popup(false));
      dispatch(authenticate(user));
    } else {
      dispatch(set_loader(false));
      status === 403 && toast.error(message);
      status === 404 && toast.info(message);
      status === 405 && toast.warn(message);
      status === 409 && toast.info(message);
    }
  };

  const onSubmit = async data => {
    dispatch(set_loader(true));
    switch (userAction) {
      case "login":
        if (isAdmin) {
          const res = await userAuth("/admin-login", data);
          finalResponse(res);
        } else {
          const res = await userAuth("/user-login", data);
          finalResponse(res);
        }
        break;

      case "register":
        if (isAdmin) {
          const res = await userAuth("/admin-register", data);
          finalResponse(res);
        } else {
          const res = await userAuth("/user-register", data);
          finalResponse(res);
        }
        break;

      default:
        toast.info("something went wrong.Try again");
    }
  };

  return (
    <PopupLayout>
      <div className="relative my-6 mx-auto w-2/6">
        <div className="w-full border-0 rounded-lg shadow-lg relative flex flex-col bg-light outline-none focus:outline-none">
          <div className="p-3 border-b">
            <button className="ml-auto float-right" onClick={popupClose}>
              <span className="text-danger h-6 w-6 text-2xl">
                <FaWindowClose />
              </span>
            </button>
          </div>

          {/* body */}
          <div className="w-10/12 mx-auto">
            <img src={logo} alt="" className="h-16 mx-auto" />
            <h1 className="text-center text-primary text-2xl font-bold">
              {userAction === "register" ? "Create an account" : "Login"}
            </h1>

            {/* facebook and google authentication */}
            <button className="bg-blue mt-5 uppercase w-full flex items-center text-xl font-semibold justify-between text-light py-1 rounded px-4">
              <RiFacebookCircleFill />
              <span className="text-base">With Facebook</span>
              <span className="invisible">*</span>
            </button>
            <button
              onClick={handleGoogleLogin}
              className="mt-2 uppercase flex w-full items-center text-xl font-semibold justify-between border py-1 rounded px-4"
            >
              <FcGoogle />
              <span className="text-base">With Google</span>
              <span className="invisible">*</span>
            </button>
            <p className="text-center my-3">or</p>

            {/* custom authentication */}
            <form
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-2 grid-cols-1"
            >
              {userAction === "register" && (
                <input
                  type="text"
                  name=""
                  id=""
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="border px-3 py-1 rounded focus:outline-none"
                />
              )}
              {errors?.name && <span className="text-danger text-xs">* Name must be required</span>}
              <input
                type="email"
                name=""
                id=""
                {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
                placeholder="Email"
                className="border px-3 py-1 rounded focus:outline-none"
              />
              {errors?.email && (
                <span className="text-danger text-xs">
                  * Email must required as ( example@email.com )
                </span>
              )}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name=""
                  id=""
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                  })}
                  placeholder="Password"
                  className="border px-3 py-1 rounded focus:outline-none w-full"
                />
                <span
                  className="absolute text-2xl flex items-center top-0 right-0 h-full border-l text-red-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              {errors?.password && (
                <span className="text-danger text-xs">
                  * Password at least 6 characters and must contain numeric digit, uppercase and
                  lowercase letter{" "}
                </span>
              )}
              {userAction === "register" && (
                <input
                  type={showPassword ? "text" : "password"}
                  name=""
                  id=""
                  {...register("con_password", {
                    required: true,
                    validate: value => value === watch("password"),
                  })}
                  placeholder="Confirm password"
                  className="border px-3 py-1 rounded focus:outline-none w-full"
                />
              )}
              {errors?.con_password && (
                <span className="text-danger text-xs">* Password did not match.</span>
              )}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="admin_role"
                  id=""
                  onChange={() => setIsAdmin(!isAdmin)}
                  className="cursor-pointer"
                />
                <label htmlFor="admin_role">As Admin</label>
              </div>
              <button
                disable={loader ? true : false}
                type="submit"
                className="bg-primary py-1.5 text-light font-semibold rounded"
              >
                {loader ? "Please wait..." : `${userAction === "register" ? "Register" : "Login"}`}
              </button>
            </form>
          </div>

          {/*footer*/}
          <div className="flex items-center gap-2 justify-center py-5">
            <p>{userAction === "register" ? "Already a member ?" : "New to Dhaka Times ?"}</p>

            {userAction === "login" && (
              <span
                onClick={() => setUserAction("register")}
                className="text-base cursor-pointer text-primary font-semibold"
              >
                Create an account
              </span>
            )}
            {userAction === "register" && (
              <span
                onClick={() => setUserAction("login")}
                className="text-base cursor-pointer text-primary font-semibold"
              >
                Login
              </span>
            )}
          </div>
        </div>
      </div>
    </PopupLayout>
  );
};

export default AuthPopUp;
