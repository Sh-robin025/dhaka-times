import React from "react";
import { MdCreate } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";

const SideBar = ({ option, setOption }) => {
  const styles =
    "cursor-pointer py-2 flex justify-center gap-5 uppercase items-center ease-linear transition-all duration-150 shadow hover:shadow-lg";

  return (
    <div className="w-2/12 bg-primary text-light py-3">
      <Link to="/">
        <IoArrowBackCircleSharp className="font-bold text-3xl cursor-pointer ml-3" />
      </Link>
      <div className="mt-5 flex flex-col gap-5">
        <div
          className={`${styles} ${option === "addNews" ? "bg-secondary" : ""}`}
          onClick={() => setOption("addNews")}
        >
          <MdCreate className="text-2xl" />
          <span>Create News</span>
        </div>
        <div
          className={`${styles} ${option === "addAdmin" ? "bg-secondary" : ""}`}
          onClick={() => setOption("addAdmin")}
        >
          <FaUsers className="text-2xl" />
          <span>Admin's</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
