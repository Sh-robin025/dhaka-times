import React from "react";
import NavBar from "./NavBar";
import logo from "../../../assets/logo (1).png";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { set_open_popup } from "../../../redux/slices/popupSlice";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import { FiLogIn } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

const Header = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  return (
    <header>
      <div className="container mx-auto flex justify-between items-center">
        {user?.role === "admin" ? (
          <Link
            to="/dashboard"
            className="flex items-center gap-1 font-medium hover:text-primary text-xl"
          >
            <MdDashboard />
            Dashboard
          </Link>
        ) : (
          <FaSearch className="text-2xl cursor-pointer hover:text-primary" />
        )}

        <Link to="/">
          <img src={logo} alt="" className="h-20 mx-auto cursor-pointer" />
        </Link>
        {user ? (
          <Dropdown />
        ) : (
          <button
            type="button"
            className="flex items-center gap-1 bg-primary px-3 text-light py-2 font-bold text-sm rounded shadow hover:shadow-lg focus:outline-none ease-linear transition-all duration-150"
            onClick={() => dispatch(set_open_popup("auth"))}
          >
            Login <FiLogIn />
          </button>
        )}
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
