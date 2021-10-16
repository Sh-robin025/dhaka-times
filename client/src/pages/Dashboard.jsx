import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import SideBar from "../components/dashboard/SideBar";
import NewsForm from "../components/dashboard/NewsForm";
import AddAdmin from "../components/dashboard/AddAdmin";

const Dashboard = () => {
  const [option, setOption] = useState("addNews");

  return (
    <>
      <ToastContainer hideProgressBar={true} theme={"colored"} />
      <div className="h-screen overflow-auto fixed top-0 left-0 w-screen bg-light text-gray-600 flex">
        <SideBar setOption={setOption} option={option} />
        <div className="w-10/12">
          {option === "addNews" && <NewsForm />}
          {option === "addAdmin" && <AddAdmin />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
