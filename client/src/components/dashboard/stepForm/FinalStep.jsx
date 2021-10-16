import React from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { Link } from "react-router-dom";

const FinalStep = () => {
  return (
    <div className="w-full">
      <AiOutlineFileDone className="text-9xl text-secondary mx-auto" />
      <p className="text-3xl">News Published Successfully</p>
      <Link to="/">
        <a href className="text-primary mt-5 text-xl hover:underline">
          Back to Home
        </a>
      </Link>
    </div>
  );
};

export default FinalStep;
